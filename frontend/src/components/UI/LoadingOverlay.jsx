import './LoadingOverlay.css';

function LoadingOverlay({ active, context }) {
    // full screen loader logic
    if (!active) return null;
    
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Wait karinge, checking {context || 'blockchain'} status...</p>
        </div>
    );
}

export default LoadingOverlay;
