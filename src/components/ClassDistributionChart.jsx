import { useMemo, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Sector,
} from "recharts";

const CLASS_COLORS = {
    Water: "#1A34B8",
    Trees: "#006B2A",
    Croplands: "#F5F0A0",
    OpenFields: "#E0D090",
    BuiltUp: "#E02020",
    SandySoil: "#C87E3A",
};

/* Darker version for text when the LULC color is too light on white */
const CLASS_TEXT_COLORS = {
    Water: "#1A34B8",
    Trees: "#006B2A",
    Croplands: "#8B8520",
    OpenFields: "#7A6D30",
    BuiltUp: "#E02020",
    SandySoil: "#C87E3A",
};

function renderActiveShape(props) {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;

    const textColor = CLASS_TEXT_COLORS[payload.name] || "#1e293b";

    return (
        <g>
            <text x={cx} y={cy - 8} textAnchor="middle" fill={textColor} fontSize={14} fontWeight={700}>
                {payload.name}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" fill="#475569" fontSize={12} fontWeight={500}>
                {value.toFixed(1)} km² ({(percent * 100).toFixed(1)}%)
            </text>
            <Sector
                cx={cx} cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}
            />
            <Sector
                cx={cx} cy={cy}
                innerRadius={innerRadius - 4}
                outerRadius={innerRadius - 1}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
}

export default function ClassDistributionChart({ yearClassTotals, classes, selectedYear }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const yearData = yearClassTotals.find((d) => d.year === selectedYear);
    const pieData = classes
        .map((cls) => ({ name: cls, value: yearData ? yearData[cls] : 0 }))
        .filter((d) => d.value > 0);

    const total = pieData.reduce((s, d) => s + d.value, 0);

    return (
        <div>
            <div style={{ marginBottom: "0.5rem", fontSize: "0.8rem", color: "#475569" }}>
                Showing distribution for <strong style={{ color: "#1e293b" }}>{selectedYear}</strong> · click a slice to inspect
            </div>
            <div className="donut-wrapper">
                <div className="donut-chart-area">
                    <ResponsiveContainer width={240} height={240}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={95}
                                dataKey="value"
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                paddingAngle={2}
                            >
                                {pieData.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={CLASS_COLORS[entry.name]}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="donut-legend">
                    {pieData.map((d, i) => (
                        <div
                            className="legend-item"
                            key={d.name}
                            style={{
                                cursor: "pointer",
                                fontWeight: i === activeIndex ? 700 : 400,
                                background: i === activeIndex ? "rgba(0,0,0,0.03)" : "transparent",
                                borderRadius: "6px",
                                padding: "0.25rem 0.4rem",
                            }}
                            onMouseEnter={() => setActiveIndex(i)}
                        >
                            <span className="legend-dot" style={{ background: CLASS_COLORS[d.name] }} />
                            <span style={{ color: CLASS_TEXT_COLORS[d.name] }}>{d.name}</span>
                            <span className="legend-value" style={{ color: CLASS_TEXT_COLORS[d.name] }}>
                                {((d.value / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
