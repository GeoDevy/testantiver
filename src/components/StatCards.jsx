const CLASS_COLORS = {
    Water: "#1A34B8",
    Trees: "#006B2A",
    Croplands: "#F5F0A0",
    OpenFields: "#E0D090",
    BuiltUp: "#E02020",
    SandySoil: "#C87E3A",
};

const CLASS_ICONS = {
    Water: "💧",
    Trees: "🌳",
    Croplands: "🌾",
    OpenFields: "🏜️",
    BuiltUp: "🏗️",
    SandySoil: "🏖️",
};

export default function StatCards({ stats, yearClassTotals }) {
    const latestYear = yearClassTotals[yearClassTotals.length - 1];
    const cards = [
        {
            label: "Total Study Area",
            value: `${stats.totalArea.toLocaleString()} km²`,
            detail: "Across all land classes",
            colorClass: "neutral",
            ribbonColor: null, // multi-color for total
        },
        {
            label: "Biggest Growth",
            value: `${CLASS_ICONS[stats.biggestGrowth.class]} ${stats.biggestGrowth.class}`,
            detail: `+${stats.biggestGrowth.change.toLocaleString()} km²`,
            colorClass: "positive",
            ribbonColor: CLASS_COLORS[stats.biggestGrowth.class],
        },
        {
            label: "Biggest Decline",
            value: `${CLASS_ICONS[stats.biggestDecline.class]} ${stats.biggestDecline.class}`,
            detail: `${stats.biggestDecline.change.toLocaleString()} km²`,
            colorClass: "negative",
            ribbonColor: CLASS_COLORS[stats.biggestDecline.class],
        },
        {
            label: "Dominant Class (2025)",
            value: `${CLASS_ICONS[stats.dominantClass]} ${stats.dominantClass}`,
            detail: `${Math.round(latestYear[stats.dominantClass]).toLocaleString()} km²`,
            colorClass: "neutral",
            ribbonColor: CLASS_COLORS[stats.dominantClass],
        },
    ];

    return (
        <div className="stat-cards">
            {cards.map((card) => (
                <div className="stat-card" key={card.label}
                    style={card.ribbonColor ? { '--ribbon-color': card.ribbonColor } : undefined}
                >
                    <span className="stat-label">{card.label}</span>
                    <span className="stat-value" style={card.ribbonColor ? { color: card.ribbonColor } : undefined}>{card.value}</span>
                    <span className="stat-detail">{card.detail}</span>
                </div>
            ))}
        </div>
    );
}
