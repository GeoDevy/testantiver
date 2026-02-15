import { useMemo } from "react";
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

function renderActiveShape(props) {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;

    return (
        <g>
            <text x={cx} y={cy - 8} textAnchor="middle" fill="#f1f5f9" fontSize={14} fontWeight={600}>
                {payload.name}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" fill="#94a3b8" fontSize={12}>
                {value.toFixed(1)} km² ({(percent * 100).toFixed(1)}%)
            </text>
            <Sector
                cx={cx} cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.15))" }}
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
    const activeIndexState = useMemo(() => ({ value: 0 }), [selectedYear]);

    const yearData = yearClassTotals.find((d) => d.year === selectedYear);
    const pieData = classes
        .map((cls) => ({ name: cls, value: yearData ? yearData[cls] : 0 }))
        .filter((d) => d.value > 0);

    const total = pieData.reduce((s, d) => s + d.value, 0);

    return (
        <div>
            <div style={{ marginBottom: "0.5rem", fontSize: "0.8rem", color: "#94a3b8" }}>
                Showing distribution for <strong style={{ color: "#06b6d4" }}>{selectedYear}</strong>
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
                                activeIndex={0}
                                activeShape={renderActiveShape}
                                paddingAngle={2}
                            >
                                {pieData.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={CLASS_COLORS[entry.name]}
                                        stroke="transparent"
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="donut-legend">
                    {pieData.map((d) => (
                        <div className="legend-item" key={d.name}>
                            <span className="legend-dot" style={{ background: CLASS_COLORS[d.name] }} />
                            <span>{d.name}</span>
                            <span className="legend-value">
                                {((d.value / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
