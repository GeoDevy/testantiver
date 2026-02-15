import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import lulcData from "./data/lulcData.json";
import OverviewPage from "./pages/OverviewPage";
import ChangeAnalysisPage from "./pages/ChangeAnalysisPage";
import LulcMapsPage from "./pages/LulcMapsPage";
import SimulationPage from "./pages/SimulationPage";

const PERIOD_LABELS = lulcData.sankeyData.map(
  (s) => `${s.fromYear} → ${s.toYear}`
);

const NAV_ITEMS = [
  { path: "/", label: "Overview", icon: "📊" },
  { path: "/change-analysis", label: "Change Analysis", icon: "📈" },
  { path: "/lulc-maps", label: "LULC Maps", icon: "🗺️" },
  { path: "/simulation", label: "Simulation", icon: "🌊" },
];

export default function App() {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* ─── Sidebar ─── */}
        <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              {!sidebarCollapsed && <span className="logo-text">🌍 LULC Dashboard</span>}
              {sidebarCollapsed && <span className="logo-icon">🌍</span>}
            </div>
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand" : "Collapse"}
            >
              {sidebarCollapsed ? "▶" : "◀"}
            </button>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Period Selector in Sidebar */}
          {!sidebarCollapsed && (
            <div className="sidebar-section">
              <div className="sidebar-section-title">Time Period</div>
              <div className="period-buttons">
                {PERIOD_LABELS.map((label, idx) => (
                  <button
                    key={label}
                    className={`period-btn-side ${idx === selectedPeriodIdx ? "active" : ""}`}
                    onClick={() => setSelectedPeriodIdx(idx)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-footer">
            {!sidebarCollapsed && (
              <span className="footer-text">1995 – 2025 · {lulcData.stats.totalArea.toLocaleString()} km²</span>
            )}
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <div className="main-wrapper">
          <header className="topbar">
            <div className="topbar-title">
              <h1>
                {NAV_ITEMS.find((n) =>
                  window.location.pathname === n.path ||
                  (n.path === "/" && window.location.pathname === "/")
                )?.label || "Dashboard"}
              </h1>
              <span className="topbar-subtitle">
                Change Detection Analysis · {PERIOD_LABELS[selectedPeriodIdx]}
              </span>
            </div>
          </header>

          <main className="dashboard-content">
            <Routes>
              <Route
                path="/"
                element={
                  <OverviewPage
                    lulcData={lulcData}
                    selectedPeriodIdx={selectedPeriodIdx}
                    periodLabels={PERIOD_LABELS}
                  />
                }
              />
              <Route
                path="/change-analysis"
                element={
                  <ChangeAnalysisPage
                    lulcData={lulcData}
                    selectedPeriodIdx={selectedPeriodIdx}
                    periodLabels={PERIOD_LABELS}
                  />
                }
              />
              <Route path="/lulc-maps" element={<LulcMapsPage />} />
              <Route path="/simulation" element={<SimulationPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
