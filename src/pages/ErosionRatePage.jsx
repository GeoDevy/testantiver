import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RUSLE_FACTORS = [
    { symbol: "R", name: "Rainfall Erosivity", desc: "Energy from rainfall", color: "#3b82f6", icon: "🌧️" },
    { symbol: "K", name: "Soil Erodibility", desc: "Soil susceptibility", color: "#f59e0b", icon: "🪨" },
    { symbol: "LS", name: "Slope Length & Steepness", desc: "Terrain gradient", color: "#10b981", icon: "⛰️" },
    { symbol: "C", name: "Cover Management", desc: "Vegetation & crop cover", color: "#8b5cf6", icon: "🌿" },
    { symbol: "P", name: "Conservation Practice", desc: "Erosion control measures", color: "#ef4444", icon: "🛡️" },
];

const EROSION_LEGEND = [
    { label: "Very Low", color: "#228B22" },
    { label: "Low", color: "#7CFC00" },
    { label: "Moderate", color: "#FFD700" },
    { label: "High", color: "#DAA520" },
    { label: "Severe", color: "#FF8C00" },
    { label: "Extreme", color: "#DC143C" },
];

const MAPPER_URL =
    "https://my-project-68659-rusle.projects.earthengine.app/view/rusle-soil-erosion-mapper-tool";

export default function ErosionRatePage() {
    const [zoomed, setZoomed] = useState(false);

    return (
        <>
            <div className="erosion-page">
                {/* ─── Hero Banner ─── */}
                <motion.div
                    className="erosion-hero"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="erosion-hero-left">
                        <h2 className="erosion-hero-title">
                            <span>🌊</span> RUSLE Erosion Analysis
                        </h2>
                        <p className="erosion-hero-desc">
                            Predict soil loss intensity across the riverbank study area using
                            the Revised Universal Soil Loss Equation.
                        </p>
                    </div>
                    <a
                        href={MAPPER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="erosion-mapper-btn"
                    >
                        <span className="erosion-mapper-icon">🛰️</span>
                        Open RUSLE Erosion Mapper
                        <span className="erosion-mapper-arrow">→</span>
                    </a>
                </motion.div>

                {/* ─── Equation Card ─── */}
                <motion.div
                    className="erosion-equation-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <div className="erosion-eq-label">RUSLE Model</div>
                    <div className="erosion-eq-formula">
                        <span className="eq-var eq-result">E<sub>p</sub></span>
                        <span className="eq-op">=</span>
                        {RUSLE_FACTORS.map((f, i) => (
                            <span key={f.symbol}>
                                <span className="eq-var" style={{ color: f.color }}>
                                    {f.symbol}
                                </span>
                                {i < RUSLE_FACTORS.length - 1 && (
                                    <span className="eq-op">×</span>
                                )}
                            </span>
                        ))}
                    </div>

                    {/* Inline Factor Pills */}
                    <div className="erosion-factor-pills">
                        {RUSLE_FACTORS.map((f) => (
                            <div className="erosion-pill" key={f.symbol}>
                                <span className="erosion-pill-icon">{f.icon}</span>
                                <span className="erosion-pill-sym" style={{ color: f.color }}>
                                    {f.symbol}
                                </span>
                                <span className="erosion-pill-name">{f.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ─── Map + Legend Row ─── */}
                <div className="erosion-map-row">
                    {/* Map Image */}
                    <motion.div
                        className="erosion-map-card"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.25 }}
                    >
                        <div className="erosion-map-header">
                            <div>
                                <div className="erosion-map-title">🛰️ Erosion Prediction Map</div>
                                <div className="erosion-map-sub">Ganga Study Area · Click to zoom</div>
                            </div>
                            <span className="erosion-map-badge">RUSLE Output</span>
                        </div>
                        <div
                            className="erosion-map-img-wrap"
                            onClick={() => setZoomed(true)}
                        >
                            <img
                                src="/erosion-map.png"
                                alt="RUSLE Erosion Prediction Map – Ganga Study Area"
                                className="erosion-map-img"
                                loading="lazy"
                            />
                            <div className="erosion-map-zoom-overlay">
                                <span>🔍 Click to zoom</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Legend + Factors Sidebar */}
                    <motion.div
                        className="erosion-sidebar"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.35 }}
                    >
                        {/* Legend */}
                        <div className="erosion-legend-card">
                            <div className="erosion-legend-title">🎨 Erosion Severity</div>
                            <div className="erosion-legend-items">
                                {EROSION_LEGEND.map((item) => (
                                    <div className="erosion-legend-row" key={item.label}>
                                        <span
                                            className="erosion-legend-swatch"
                                            style={{ background: item.color }}
                                        />
                                        <span className="erosion-legend-label">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Factor Cards */}
                        <div className="erosion-factors-stack">
                            {RUSLE_FACTORS.map((f, i) => (
                                <motion.div
                                    key={f.symbol}
                                    className="erosion-factor-mini"
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: 0.4 + 0.06 * i }}
                                >
                                    <div
                                        className="erosion-factor-dot"
                                        style={{ background: f.color }}
                                    >
                                        {f.icon}
                                    </div>
                                    <div className="erosion-factor-info">
                                        <span className="erosion-factor-sym" style={{ color: f.color }}>
                                            {f.symbol}
                                        </span>
                                        <span className="erosion-factor-label">{f.name}</span>
                                        <span className="erosion-factor-desc">{f.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Zoom Modal ─── */}
            <AnimatePresence>
                {zoomed && (
                    <motion.div
                        className="zoom-modal-backdrop"
                        onClick={() => setZoomed(false)}
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
                                <span className="zoom-modal-title">
                                    RUSLE Erosion Map – Ganga Study Area
                                </span>
                                <button
                                    className="zoom-modal-close"
                                    onClick={() => setZoomed(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="zoom-modal-body">
                                <img
                                    src="/erosion-map.png"
                                    alt="RUSLE Erosion Prediction Map – Ganga Study Area"
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
