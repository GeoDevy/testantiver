import { useMemo } from "react";

const CLASS_COLORS = {
    Water: "#1A34B8",
    Trees: "#006B2A",
    Croplands: "#F5F0A0",
    OpenFields: "#E0D090",
    BuiltUp: "#E02020",
    SandySoil: "#C87E3A",
};

function getHeatColor(value, maxVal) {
    if (value === 0) return "rgba(255,255,255,0.02)";
    const intensity = Math.pow(value / maxVal, 0.45); // non-linear for better visibility
    const r = Math.round(59 + (244 - 59) * intensity);
    const g = Math.round(130 + (63 - 130) * intensity);
    const b = Math.round(246 + (94 - 246) * intensity);
    const alpha = 0.15 + intensity * 0.75;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function TransitionHeatmap({ periodTransitions, classes, selectedPeriodIdx }) {
    const period = periodTransitions[selectedPeriodIdx];

    const maxVal = useMemo(() => {
        let mx = 0;
        classes.forEach((from) => {
            classes.forEach((to) => {
                if (from !== to) {
                    mx = Math.max(mx, period.matrix[from][to]);
                }
            });
        });
        return mx;
    }, [period, classes]);

    return (
        <div className="heatmap-container">
            <table className="heatmap-table">
                <thead>
                    <tr>
                        <th className="row-header">{period.fromYear} ↓ / {period.toYear} →</th>
                        {classes.map((cls) => (
                            <th key={cls} style={{ color: CLASS_COLORS[cls] }}>{cls}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {classes.map((from) => (
                        <tr key={from}>
                            <th className="row-header" style={{ color: CLASS_COLORS[from] }}>{from}</th>
                            {classes.map((to) => {
                                const val = period.matrix[from][to];
                                const isDiagonal = from === to;
                                const bg = isDiagonal
                                    ? `rgba(255,255,255,0.06)`
                                    : getHeatColor(val, maxVal);
                                const textColor = isDiagonal
                                    ? "#94a3b8"
                                    : val / maxVal > 0.5
                                        ? "#fff"
                                        : "#cbd5e1";
                                return (
                                    <td
                                        key={to}
                                        className="heatmap-cell"
                                        style={{
                                            background: bg,
                                            color: textColor,
                                            fontWeight: isDiagonal ? 700 : 400,
                                        }}
                                        title={`${from} → ${to}: ${val.toFixed(2)} km²`}
                                    >
                                        {val < 0.01 ? "—" : val.toFixed(1)}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
