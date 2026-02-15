import { useMemo } from "react";

const CLASS_COLORS = {
    Water: "#1A34B8",
    Trees: "#006B2A",
    Croplands: "#F5F0A0",
    OpenFields: "#E0D090",
    BuiltUp: "#E02020",
    SandySoil: "#C87E3A",
};

/* Tint a hex color towards white by a given amount (0=original, 1=white) */
function tint(hex, amount) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.round(r + (255 - r) * amount)}, ${Math.round(g + (255 - g) * amount)}, ${Math.round(b + (255 - b) * amount)})`;
}

/* Pick black or white text for readability */
function contrastText(hex, amount) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rr = r + (255 - r) * amount;
    const gg = g + (255 - g) * amount;
    const bb = b + (255 - b) * amount;
    const lum = 0.299 * rr + 0.587 * gg + 0.114 * bb;
    return lum > 160 ? "#1e293b" : "#ffffff";
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
                            <th key={cls} style={{ color: CLASS_COLORS[cls], fontWeight: 700 }}>{cls}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {classes.map((from) => (
                        <tr key={from}>
                            <th className="row-header" style={{ color: CLASS_COLORS[from], fontWeight: 700 }}>{from}</th>
                            {classes.map((to) => {
                                const val = period.matrix[from][to];
                                const isDiagonal = from === to;

                                if (isDiagonal) {
                                    // Diagonal: light tint of the class color
                                    const bg = tint(CLASS_COLORS[from], 0.85);
                                    return (
                                        <td
                                            key={to}
                                            className="heatmap-cell"
                                            style={{
                                                background: bg,
                                                color: CLASS_COLORS[from],
                                                fontWeight: 700,
                                            }}
                                            title={`${from} → ${to}: ${val.toFixed(2)} km²`}
                                        >
                                            {val < 0.01 ? "—" : val.toFixed(1)}
                                        </td>
                                    );
                                }

                                // Off-diagonal: intensity-based tint of the target class color
                                const intensity = maxVal > 0 ? Math.pow(val / maxVal, 0.45) : 0;
                                const tintAmount = 1 - intensity * 0.7; // 1 = white, 0.3 = nearly saturated
                                const baseColor = CLASS_COLORS[to];
                                const bg = val < 0.01 ? "#f8fafc" : tint(baseColor, tintAmount);
                                const textColor = val < 0.01 ? "#94a3b8" : contrastText(baseColor, tintAmount);

                                return (
                                    <td
                                        key={to}
                                        className="heatmap-cell"
                                        style={{
                                            background: bg,
                                            color: textColor,
                                            fontWeight: intensity > 0.5 ? 600 : 400,
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
