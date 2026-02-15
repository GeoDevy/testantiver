import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
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
    if (!active || !payload) return null;
    return (
        <div className="custom-tooltip">
            <div className="label">{label}</div>
            {payload.map((entry) => (
                <div className="item" key={entry.dataKey}>
                    <span className="dot" style={{ background: entry.color }} />
                    <span>{entry.dataKey}</span>
                    <span className="val">{entry.value.toFixed(1)} km²</span>
                </div>
            ))}
        </div>
    );
}

export default function AreaByClassChart({ data, classes }) {
    return (
        <ResponsiveContainer width="100%" height={360}>
            <BarChart
                data={data}
                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis
                    stroke="#64748b"
                    tickFormatter={(v) => `${(v / 1).toFixed(0)}`}
                    label={{
                        value: "Area (km²)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#64748b",
                        fontSize: 12,
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    iconType="circle"
                    iconSize={8}
                />
                {classes.map((cls) => (
                    <Bar
                        key={cls}
                        dataKey={cls}
                        stackId="area"
                        fill={CLASS_COLORS[cls]}
                        radius={cls === classes[classes.length - 1] ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
