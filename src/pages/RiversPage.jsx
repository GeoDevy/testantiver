import { useState, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import INDIAN_RIVERS from "../data/rivers-data";

/* Rivers that have actual data — only Ganga for now */
const AVAILABLE_RIVERS = new Set(["ganga"]);

export default function RiversPage() {
    const [selectedRiver, setSelectedRiver] = useState("ganga");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRivers = useMemo(
        () =>
            INDIAN_RIVERS.filter((r) =>
                r.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [searchTerm]
    );

    const handleRiverClick = (id) => {
        if (!AVAILABLE_RIVERS.has(id)) return;
        setSelectedRiver((prev) => (prev === id ? null : id));
    };

    const selectedData = useMemo(
        () => INDIAN_RIVERS.find((r) => r.id === selectedRiver),
        [selectedRiver]
    );

    return (
        <div className="rivers-page-wrapper">
            {/* ─── Hero Banner ─── */}
            <div className="rivers-hero">
                <div className="rivers-hero-content">
                    <h2 className="rivers-hero-title">
                        <span className="rivers-hero-icon">🏞️</span>
                        Indian Riverbanks
                    </h2>
                    {selectedData ? (
                        <p className="rivers-hero-subtitle">
                            {selectedData.studyArea.description}
                        </p>
                    ) : (
                        <p className="rivers-hero-subtitle">
                            Select a river to view its riverbank study area analysis.
                        </p>
                    )}
                </div>
                {selectedData && (
                    <div className="rivers-hero-stat">
                        <div className="rivers-hero-stat-label">Study Area</div>
                        <div className="rivers-hero-stat-value">{selectedData.name}</div>
                        <div className="rivers-hero-stat-detail">
                            {selectedData.length} km · {selectedData.origin}
                        </div>
                        <div className="rivers-hero-coords">
                            📍 {selectedData.studyArea.bounds.north.toFixed(2)}°N,{" "}
                            {selectedData.studyArea.bounds.west.toFixed(2)}°E –{" "}
                            {selectedData.studyArea.bounds.south.toFixed(2)}°N,{" "}
                            {selectedData.studyArea.bounds.east.toFixed(2)}°E
                        </div>
                    </div>
                )}
            </div>

            {/* ─── Main Content ─── */}
            <div className="rivers-content">
                {/* ─── River List Panel ─── */}
                <div className="river-list-panel">
                    <div className="river-list-header">
                        <h3 className="river-list-title">Rivers</h3>
                        <span className="river-count">{INDIAN_RIVERS.length}</span>
                    </div>

                    <div className="river-search-wrapper">
                        <input
                            type="text"
                            className="river-search"
                            placeholder="Search rivers…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="river-list-scroll">
                        {filteredRivers.map((river) => {
                            const isSelected = selectedRiver === river.id;
                            const isAvailable = AVAILABLE_RIVERS.has(river.id);
                            return (
                                <button
                                    key={river.id}
                                    className={`river-card ${isSelected ? "selected" : ""} ${!isAvailable ? "disabled" : ""}`}
                                    onClick={() => handleRiverClick(river.id)}
                                >
                                    <span
                                        className="river-status-dot"
                                        style={{
                                            background: isSelected ? "#10b981" : "#ef4444",
                                        }}
                                    />
                                    <div className="river-card-info">
                                        <span className="river-name">{river.name}</span>
                                        <span className="river-meta">
                                            {river.length} km · {river.origin}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <span className="river-select-indicator">✓</span>
                                    )}
                                </button>
                            );
                        })}
                        {filteredRivers.length === 0 && (
                            <div className="river-empty">No rivers match your search.</div>
                        )}
                    </div>

                    <div className="river-list-footer">
                        <span className="river-selected-count">
                            {selectedRiver ? "1 selected" : "None selected"}
                        </span>
                        {selectedRiver && (
                            <button
                                className="river-clear-btn"
                                onClick={() => setSelectedRiver(null)}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* ─── Map Panel (Leaflet + OpenTopoMap) ─── */}
                <div className="river-map-panel">
                    <div className="river-map-label">
                        <span className="river-map-label-icon">🗺️</span>
                        Topographic Map · India
                    </div>
                    <div className="river-map-inner">
                        <MapContainer
                            center={[22.5, 82]}
                            zoom={5}
                            minZoom={4}
                            maxZoom={12}
                            scrollWheelZoom={true}
                            zoomControl={true}
                            attributionControl={false}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                maxZoom={17}
                            />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
