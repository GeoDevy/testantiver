import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./App.css";

import lulcData from "./data/lulcData.json";
import RiversPage from "./pages/RiversPage";
import OverviewPage from "./pages/OverviewPage";
import ChangeAnalysisPage from "./pages/ChangeAnalysisPage";
import LulcMapsPage from "./pages/LulcMapsPage";
import SimulationPage from "./pages/SimulationPage";
import ErosionRatePage from "./pages/ErosionRatePage";
import PredictedErosionPage from "./pages/PredictedErosionPage";

const PERIOD_LABELS = lulcData.sankeyData.map(
  (s) => `${s.fromYear} → ${s.toYear}`
);

/* Bottom ribbon tabs — the analysis/data pages */
const BOTTOM_NAV_ITEMS = [
  { path: "/overview", label: "Overview", icon: "📊" },
  { path: "/change-analysis", label: "Change Analysis", icon: "📈" },
  { path: "/lulc-maps", label: "LULC Maps", icon: "🗺️" },
  { path: "/simulation", label: "Simulation", icon: "🌊" },
  { path: "/erosion-rate", label: "Erosion Rate", icon: "🏜️" },
  { path: "/predicted-erosion", label: "Predicted Risk", icon: "⚠️" },
];

function AppContent() {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  /* Find current page label */
  const allNav = [{ path: "/", label: "Rivers", icon: "🏞️" }, ...BOTTOM_NAV_ITEMS];
  const currentLabel = allNav.find((n) =>
    n.path === "/" ? location.pathname === "/" : location.pathname.startsWith(n.path)
  )?.label || "Dashboard";

  return (
    <div className="app-layout">
      {/* ─── Sidebar ─── */}
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {!sidebarCollapsed && <span className="logo-text">🌍 Indian Riverbanks</span>}
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
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">🏞️</span>
            {!sidebarCollapsed && <span className="nav-label">Rivers</span>}
          </NavLink>
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
            <h1>{currentLabel}</h1>
            <span className="topbar-subtitle">
              Change Detection Analysis · {PERIOD_LABELS[selectedPeriodIdx]}
            </span>
          </div>
        </header>

        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<RiversPage />} />
            <Route
              path="/overview"
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
            <Route path="/erosion-rate" element={<ErosionRatePage />} />
            <Route path="/predicted-erosion" element={<PredictedErosionPage />} />
          </Routes>
        </main>

        {/* ─── Bottom Ribbon ─── */}
        <nav className="bottom-ribbon">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `bottom-ribbon-item ${isActive ? "active" : ""}`
              }
            >
              <span className="bottom-ribbon-icon">{item.icon}</span>
              <span className="bottom-ribbon-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
