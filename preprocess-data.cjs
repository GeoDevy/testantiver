/**
 * Preprocesses the LULC change detection Excel data into a structured JSON
 * suitable for the React dashboard charts.
 */
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const EXCEL_PATH = path.join(__dirname, "..", "changedetectionfinalexcel.xlsx");
const OUTPUT_PATH = path.join(__dirname, "src", "data", "lulcData.json");

const YEARS = [1995, 2005, 2015, 2025];
const CLASSES = ["Water", "Trees", "Croplands", "OpenFields", "BuiltUp", "SandySoil"];

// Read Excel
const wb = XLSX.readFile(EXCEL_PATH);
const ws = wb.Sheets[wb.SheetNames[0]];
const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

// Parse raw transition rows (columns A-C, skip header row 0)
const transitions = [];
for (let i = 1; i < rawData.length; i++) {
  const row = rawData[i];
  const label = row[0]; // e.g., "Water - Trees - BuiltUp - Croplands"
  const area = row[1]; // area in sq km
  if (!label || typeof label !== "string" || !area || typeof area !== "number") continue;

  const parts = label.split(" - ").map((s) => s.trim());
  if (parts.length !== 4) continue;

  transitions.push({ classes: parts, area });
}

console.log(`Parsed ${transitions.length} transitions`);

// 1. Year-class totals: for each year, sum area per class
const yearClassTotals = YEARS.map((year, yi) => {
  const totals = {};
  CLASSES.forEach((c) => (totals[c] = 0));
  transitions.forEach((t) => {
    const cls = t.classes[yi];
    if (totals[cls] !== undefined) {
      totals[cls] += t.area;
    }
  });
  return { year, ...totals };
});

// 2. Period transitions: for each consecutive pair of years, sum from-class -> to-class area
const periodTransitions = [];
for (let p = 0; p < YEARS.length - 1; p++) {
  const fromYear = YEARS[p];
  const toYear = YEARS[p + 1];
  const matrix = {};
  CLASSES.forEach((from) => {
    matrix[from] = {};
    CLASSES.forEach((to) => (matrix[from][to] = 0));
  });

  transitions.forEach((t) => {
    const from = t.classes[p];
    const to = t.classes[p + 1];
    if (matrix[from] && matrix[from][to] !== undefined) {
      matrix[from][to] += t.area;
    }
  });

  periodTransitions.push({ fromYear, toYear, matrix });
}

// 3. Sankey data for each period transition
const sankeyData = periodTransitions.map(({ fromYear, toYear, matrix }) => {
  const nodes = [
    ...CLASSES.map((c) => ({ name: `${c} (${fromYear})` })),
    ...CLASSES.map((c) => ({ name: `${c} (${toYear})` })),
  ];

  const links = [];
  CLASSES.forEach((from, fi) => {
    CLASSES.forEach((to, ti) => {
      const value = Math.round(matrix[from][to] * 1000) / 1000;
      if (value > 0.01) {
        // filter tiny flows for cleaner diagram
        links.push({
          source: fi,
          target: CLASSES.length + ti,
          value,
          fromClass: from,
          toClass: to,
        });
      }
    });
  });

  return { fromYear, toYear, nodes, links };
});

// 4. Summary stats
const totalArea = Math.round(yearClassTotals[0][CLASSES[0]] !== undefined
  ? Object.values(yearClassTotals[0]).reduce((s, v) => (typeof v === "number" ? s + v : s), 0)
  : 0);

// Growth/decline between first and last year
const changes = CLASSES.map((c) => ({
  class: c,
  change: yearClassTotals[3][c] - yearClassTotals[0][c],
  first: yearClassTotals[0][c],
  last: yearClassTotals[3][c],
}));
const biggestGrowth = changes.reduce((a, b) => (b.change > a.change ? b : a));
const biggestDecline = changes.reduce((a, b) => (b.change < a.change ? b : a));
const dominantClass = CLASSES.reduce((a, b) =>
  yearClassTotals[3][b] > yearClassTotals[3][a] ? b : a
);

const output = {
  years: YEARS,
  classes: CLASSES,
  yearClassTotals,
  periodTransitions: periodTransitions.map(({ fromYear, toYear, matrix }) => ({
    fromYear,
    toYear,
    matrix,
  })),
  sankeyData,
  stats: {
    totalArea: Math.round(totalArea * 100) / 100,
    biggestGrowth: { class: biggestGrowth.class, change: Math.round(biggestGrowth.change * 100) / 100 },
    biggestDecline: { class: biggestDecline.class, change: Math.round(biggestDecline.change * 100) / 100 },
    dominantClass,
  },
};

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`Data written to ${OUTPUT_PATH}`);
console.log("Stats:", JSON.stringify(output.stats, null, 2));
