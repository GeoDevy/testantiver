import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
} from "recharts";

const CLASS_COLORS = {
    Water: "#1A34B8",
    Trees: "#006B2A",
    Croplands: "#F5F0A0",
    OpenFields: "#E0D090",
    BuiltUp: "#E02020",
    SandySoil: "#C87E3A",
};

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0]?.payload;
    if (!d) return null;

    const changeSign = d.change >= 0 ? "+" : "";
    const changeColor = d.change >= 0 ? "#10b981" : "#f43f5e";

    return (
        <div className="custom-tooltip">
            <div className="label">{label}</div>
            <div className="item">
                <span className="dot" style={{ background: "#64748b" }} />
                <span>Before</span>
                <span className="val">{d.before.toFixed(1)} km²</span>
            </div>
            <div className="item">
                <span className="dot" style={{ background: CLASS_COLORS[label] || "#3b82f6" }} />
                <span>After</span>
                <span className="val">{d.after.toFixed(1)} km²</span>
            </div>
            <div className="item" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.35rem", marginTop: "0.2rem" }}>
                <span>Net Change</span>
                <span className="val" style={{ color: changeColor }}>
                    {changeSign}{d.change.toFixed(1)} km²
                </span>
            </div>
            <div className="item">
                <span>Percent Change</span>
                <span className="val" style={{ color: changeColor }}>
                    {changeSign}{d.pctChange.toFixed(1)}%
                </span>
            </div>
        </div>
    );
}

export default function ChangeDetectionChart({ yearClassTotals, classes, selectedPeriodIdx, periodTransitions }) {
    const period = periodTransitions[selectedPeriodIdx];
    const fromYearData = yearClassTotals.find((d) => d.year === period.fromYear);
    const toYearData = yearClassTotals.find((d) => d.year === period.toYear);

    const data = classes.map((cls) => {
        const before = fromYearData[cls] || 0;
        const after = toYearData[cls] || 0;
        const change = after - before;
        const pctChange = before > 0 ? ((change / before) * 100) : 0;
        return { name: cls, before, after, change, pctChange };
    });

    return (
        <div>
            {/* Net Change Bar Chart */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.75rem", fontWeight: 500 }}>
                    Net Area Change (km²)
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis
                            stroke="#64748b"
                            fontSize={11}
                            tickFormatter={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}`}
                            label={{
                                value: "km²",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#64748b",
                                fontSize: 11,
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                        <Bar dataKey="change" radius={[4, 4, 4, 4]} maxBarSize={50}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={entry.change >= 0 ? "#10b981" : "#f43f5e"}
                                    fillOpacity={0.85}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Before / After Comparison */}
            <div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.75rem", fontWeight: 500 }}>
                    Area Comparison: {period.fromYear} vs {period.toYear}
                </div>
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }} barCategoryGap="25%">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis
                            stroke="#64748b"
                            fontSize={11}
                            label={{
                                value: "Area (km²)",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#64748b",
                                fontSize: 11,
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: "8px" }}
                            iconType="circle"
                            iconSize={8}
                        />
                        <Bar
                            dataKey="before"
                            name={`${period.fromYear}`}
                            fill="rgba(148, 163, 184, 0.5)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar dataKey="after" name={`${period.toYear}`} radius={[4, 4, 0, 0]} maxBarSize={40}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={CLASS_COLORS[entry.name]}
                                    fillOpacity={0.9}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
