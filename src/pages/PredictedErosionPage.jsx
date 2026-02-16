import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YEARS = [2030, 2035, 2040, 2045, 2050];

const SSP_SCENARIOS = [
    {
        id: "ssp1",
        label: "SSP1-2.6",
        tagline: "Strong Mitigation Adopted",
        emissions: "Low emissions",
        warming: "Warming by ~2°C by 2100",
        impact: "Positive or Low Impacts",
        gradient: "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
        glow: "rgba(34,197,94,0.2)",
        border: "rgba(34,197,94,0.35)",
        textAccent: "#bbf7d0",
    },
    {
        id: "ssp2",
        label: "SSP2-4.5",
        tagline: "Middle Pathway",
        emissions: "Moderate emissions",
        warming: "Warming by ~2.8°C by 2100",
        impact: "Business-as-Usual Outcome",
        gradient: "linear-gradient(135deg, #f59e0b, #d97706, #b45309)",
        glow: "rgba(245,158,11,0.2)",
        border: "rgba(245,158,11,0.35)",
        textAccent: "#fef3c7",
    },
    {
        id: "ssp5",
        label: "SSP5-8.5",
        tagline: "Poor Mitigation",
        emissions: "High emissions",
        warming: "Warming by ~4.4°C by 2100",
        impact: "Negative and Extreme Impacts",
        gradient: "linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)",
        glow: "rgba(239,68,68,0.2)",
        border: "rgba(239,68,68,0.35)",
        textAccent: "#fecaca",
    },
];

const PREDICTION_MAPS = [
    { src: "/prediction-map-1.jpg", label: "Predicted Erosion Risk Map – View 1" },
    { src: "/prediction-map-2.jpg", label: "Predicted Erosion Risk Map – View 2" },
];

export default function PredictedErosionPage() {
    const [selectedYear, setSelectedYear] = useState(2030);
    const [zoomedImg, setZoomedImg] = useState(null);

    return (
        <>
            <div className="pred-erosion-page">
                {/* ─── Hero Banner ─── */}
                <motion.div
                    className="pred-hero"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="pred-hero-left">
                        <h2 className="pred-hero-title">
                            <span>⚠️</span> Predicted Erosion Risk
                        </h2>
                        <p className="pred-hero-desc">
                            Future erosion projections under different climate scenarios (SSP pathways)
                            for the Ganga riverbank study area.
                        </p>
                    </div>
                    <div className="pred-hero-year-badge">
                        <div className="pred-hero-year-label">Forecast Year</div>
                        <div className="pred-hero-year-value">{selectedYear}</div>
                    </div>
                </motion.div>

                {/* ─── Year Slider ─── */}
                <motion.div
                    className="pred-slider-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                >
                    <div className="pred-slider-label">Select Forecast Year</div>
                    <div className="pred-slider-wrapper">
                        <input
                            type="range"
                            className="pred-slider"
                            min={0}
                            max={YEARS.length - 1}
                            step={1}
                            value={YEARS.indexOf(selectedYear)}
                            onChange={(e) => setSelectedYear(YEARS[Number(e.target.value)])}
                        />
                        <div className="pred-slider-ticks">
                            {YEARS.map((y) => (
                                <button
                                    key={y}
                                    className={`pred-slider-tick ${selectedYear === y ? "active" : ""}`}
                                    onClick={() => setSelectedYear(y)}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ─── SSP Scenario Cards ─── */}
                <div className="ssp-cards-row">
                    {SSP_SCENARIOS.map((ssp, i) => (
                        <motion.div
                            key={ssp.id}
                            className="ssp-card"
                            style={{
                                background: ssp.gradient,
                                boxShadow: `0 4px 20px ${ssp.glow}`,
                            }}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 + 0.1 * i }}
                        >
                            <div className="ssp-card-badge">{ssp.label}</div>
                            <div className="ssp-card-tagline">{ssp.tagline}</div>
                            <div className="ssp-card-details">
                                <div className="ssp-detail-row">
                                    <span className="ssp-detail-icon">💨</span>
                                    <span>{ssp.emissions}</span>
                                </div>
                                <div className="ssp-detail-row">
                                    <span className="ssp-detail-icon">🌡️</span>
                                    <span>{ssp.warming}</span>
                                </div>
                                <div className="ssp-detail-row">
                                    <span className="ssp-detail-icon">📊</span>
                                    <span>{ssp.impact}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ─── Prediction Map Grid ─── */}
                <div className="pred-map-grid">
                    {PREDICTION_MAPS.map((map, i) => (
                        <motion.div
                            key={map.src}
                            className="pred-map-card"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + 0.1 * i }}
                        >
                            <div className="pred-map-header">
                                <div>
                                    <div className="pred-map-title">🛰️ {map.label}</div>
                                    <div className="pred-map-sub">
                                        Year {selectedYear} · Click to zoom
                                    </div>
                                </div>
                                <span className="pred-map-badge">{selectedYear}</span>
                            </div>
                            <div
                                className="pred-map-img-wrap"
                                onClick={() => setZoomedImg(map)}
                            >
                                <img
                                    src={map.src}
                                    alt={map.label}
                                    className="pred-map-img"
                                    loading="lazy"
                                />
                                <div className="pred-map-zoom-overlay">
                                    <span>🔍 Click to zoom</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Zoom Modal ─── */}
            <AnimatePresence>
                {zoomedImg && (
                    <motion.div
                        className="zoom-modal-backdrop"
                        onClick={() => setZoomedImg(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="zoom-modal-content"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="zoom-modal-header">
                                <span className="zoom-modal-title">{zoomedImg.label}</span>
                                <button
                                    className="zoom-modal-close"
                                    onClick={() => setZoomedImg(null)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="zoom-modal-body">
                                <img
                                    src={zoomedImg.src}
                                    alt={zoomedImg.label}
                                    className="zoom-modal-img"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
