import StatCards from "../components/StatCards";
import AreaByClassChart from "../components/AreaByClassChart";
import ClassDistributionChart from "../components/ClassDistributionChart";

export default function OverviewPage({ lulcData, selectedPeriodIdx, periodLabels }) {
    const donutYear = lulcData.sankeyData[selectedPeriodIdx].toYear;

    return (
        <>
            <StatCards stats={lulcData.stats} yearClassTotals={lulcData.yearClassTotals} />

            <div className="chart-grid">
                <div className="chart-card">
                    <div className="chart-header">
                        <div>
                            <div className="chart-title">📊 Area Composition by Year</div>
                            <div className="chart-subtitle">Stacked area of each land class across all years</div>
                        </div>
                        <span className="chart-badge">Stacked Bar</span>
                    </div>
                    <AreaByClassChart data={lulcData.yearClassTotals} classes={lulcData.classes} />
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <div>
                            <div className="chart-title">🍩 Class Distribution</div>
                            <div className="chart-subtitle">Percentage breakdown for {donutYear}</div>
                        </div>
                        <span className="chart-badge">Donut</span>
                    </div>
                    <ClassDistributionChart
                        yearClassTotals={lulcData.yearClassTotals}
                        classes={lulcData.classes}
                        selectedYear={donutYear}
                    />
                </div>
            </div>
        </>
    );
}
