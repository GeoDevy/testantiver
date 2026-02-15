export default function SimulationPage() {
    return (
        <div className="video-grid">
            {/* Flow Depth */}
            <div className="chart-card">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">🌊 Flow Depth</div>
                        <div className="chart-subtitle">HEC-RAS flood depth simulation</div>
                    </div>
                    <span className="chart-badge">Video</span>
                </div>
                <div className="video-container">
                    <video
                        className="flow-depth-video"
                        controls
                        loop
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src="/Vid1_Depth.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* Flow Velocity */}
            <div className="chart-card">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">💨 Flow Velocity</div>
                        <div className="chart-subtitle">HEC-RAS flood velocity simulation</div>
                    </div>
                    <span className="chart-badge">Video</span>
                </div>
                <div className="video-container">
                    <video
                        className="flow-depth-video"
                        controls
                        loop
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src="/Vid2_velocity.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
