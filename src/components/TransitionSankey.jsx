import { useMemo } from "react";
import Plot from "react-plotly.js";

const CLASS_COLORS = {
    Water: "#3b82f6",
    Trees: "#10b981",
    Croplands: "#f59e0b",
    OpenFields: "#f97316",
    BuiltUp: "#f43f5e",
    SandySoil: "#a78bfa",
};

const CLASS_COLORS_FADED = {
    Water: "rgba(59,130,246,0.35)",
    Trees: "rgba(16,185,129,0.35)",
    Croplands: "rgba(245,158,11,0.35)",
    OpenFields: "rgba(249,115,22,0.35)",
    BuiltUp: "rgba(244,63,94,0.35)",
    SandySoil: "rgba(167,139,250,0.35)",
};

export default function TransitionSankey({ sankeyData, selectedPeriodIdx }) {
    const data = sankeyData[selectedPeriodIdx];

    const plotData = useMemo(() => {
        if (!data) return null;

        // Filter out very small links for cleaner appearance
        const significantLinks = data.links.filter((l) => l.value > 0.5);

        const nodeLabels = data.nodes.map((n) => n.name);
        const nodeColors = data.nodes.map((n) => {
            const cls = n.name.split(" (")[0];
            return CLASS_COLORS[cls] || "#64748b";
        });

        const linkColors = significantLinks.map((l) => {
            return CLASS_COLORS_FADED[l.fromClass] || "rgba(100,116,139,0.25)";
        });

        return [
            {
                type: "sankey",
                orientation: "h",
                arrangement: "fixed",
                node: {
                    pad: 30,
                    thickness: 20,
                    line: { color: "rgba(255,255,255,0.15)", width: 1 },
                    label: nodeLabels,
                    color: nodeColors,
                    hovertemplate: "%{label}<br>Total: %{value:.1f} km²<extra></extra>",
                },
                link: {
                    source: significantLinks.map((l) => l.source),
                    target: significantLinks.map((l) => l.target),
                    value: significantLinks.map((l) => l.value),
                    color: linkColors,
                    hovertemplate:
                        "%{source.label} → %{target.label}<br>%{value:.2f} km²<extra></extra>",
                },
            },
        ];
    }, [data]);

    if (!plotData) return <div>No data</div>;

    return (
        <div className="sankey-container">
            <Plot
                data={plotData}
                layout={{
                    font: { family: "Inter, sans-serif", size: 12, color: "#cbd5e1" },
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    margin: { l: 20, r: 20, t: 20, b: 20 },
                    height: 450,
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%", height: "450px" }}
                useResizeHandler
            />
        </div>
    );
}
