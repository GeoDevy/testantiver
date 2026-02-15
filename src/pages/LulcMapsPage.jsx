import { useState } from "react";

const LULC_MAPS = [
    { year: 1995, src: "/1995lulcpng.png" },
    { year: 2005, src: "/2005lulcpng.png" },
    { year: 2015, src: "/2015lulcpng.png" },
    { year: 2025, src: "/2025lulcpng.png" },
];

export default function LulcMapsPage() {
    const [zoomedImg, setZoomedImg] = useState(null);

    return (
        <>
            {/* Legend */}
            <div className="chart-card full-width">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">🎨 LULC Symbology Legend</div>
                        <div className="chart-subtitle">Color coding used across all maps</div>
                    </div>
                    <span className="chart-badge">Legend</span>
                </div>
                <div className="legend-bar">
                    <div className="legend-chip"><span className="chip-color" style={{ background: "#1A34B8" }} />Water</div>
                    <div className="legend-chip"><span className="chip-color" style={{ background: "#E02020" }} />Built-Up</div>
                    <div className="legend-chip"><span className="chip-color" style={{ background: "#C87E3A" }} />Sandy Soil</div>
                    <div className="legend-chip"><span className="chip-color" style={{ background: "#006B2A" }} />Trees</div>
                    <div className="legend-chip"><span className="chip-color" style={{ background: "#E0D090" }} />Open Fields</div>
                    <div className="legend-chip"><span className="chip-color" style={{ background: "#F5F0A0" }} />Croplands</div>
                </div>
            </div>

            {/* Map Grid */}
            <div className="map-grid">
                {LULC_MAPS.map((map) => (
                    <div className="chart-card map-card" key={map.year}>
                        <div className="chart-header">
                            <div>
                                <div className="chart-title">🗺️ LULC {map.year}</div>
                                <div className="chart-subtitle">Click to zoom</div>
                            </div>
                            <span className="chart-badge">{map.year}</span>
                        </div>
                        <div
                            className="map-image-wrapper"
                            onClick={() => setZoomedImg(map)}
                        >
                            <img
                                src={map.src}
                                alt={`LULC ${map.year}`}
                                className="map-image"
                                loading="lazy"
                            />
                            <div className="map-overlay">
                                <span className="zoom-icon">🔍</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Zoom Modal */}
            {zoomedImg && (
                <div
                    className="zoom-modal-backdrop"
                    onClick={() => setZoomedImg(null)}
                >
                    <div
                        className="zoom-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="zoom-modal-header">
                            <span className="zoom-modal-title">LULC {zoomedImg.year}</span>
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
                                alt={`LULC ${zoomedImg.year}`}
                                className="zoom-modal-img"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
