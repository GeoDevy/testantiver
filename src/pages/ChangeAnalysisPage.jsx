import ChangeDetectionChart from "../components/ChangeDetectionChart";
import TransitionHeatmap from "../components/TransitionHeatmap";

export default function ChangeAnalysisPage({ lulcData, selectedPeriodIdx, periodLabels }) {
    return (
        <div className="chart-grid">
            <div className="chart-card full-width">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">📈 Change Detection</div>
                        <div className="chart-subtitle">
                            Land class area changes during {periodLabels[selectedPeriodIdx]}
                        </div>
                    </div>
                    <span className="chart-badge">Bar Chart</span>
                </div>
                <ChangeDetectionChart
                    yearClassTotals={lulcData.yearClassTotals}
                    classes={lulcData.classes}
                    selectedPeriodIdx={selectedPeriodIdx}
                    periodTransitions={lulcData.periodTransitions}
                />
            </div>

            <div className="chart-card full-width">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">🗺️ Transition Matrix</div>
                        <div className="chart-subtitle">
                            Area (km²) transferred from row class to column class · {periodLabels[selectedPeriodIdx]}
                        </div>
                    </div>
                    <span className="chart-badge">Heatmap</span>
                </div>
                <TransitionHeatmap
                    periodTransitions={lulcData.periodTransitions}
                    classes={lulcData.classes}
                    selectedPeriodIdx={selectedPeriodIdx}
                />
            </div>
        </div>
    );
}
