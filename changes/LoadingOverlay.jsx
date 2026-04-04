import { useState, useEffect } from 'react';
import './LoadingOverlay.css';

/**
 * LoadingOverlay — A premium, theme-aware loading overlay
 * Sync logic: Unified brand animation for folders.
 */

const CONTEXT_MESSAGES = {
    blockchain: ['Syncing with the blockchain…', 'Verifying on-chain data integrity…'],
    admin: ['Scanning governance records…', 'Loading tender vault data…'],
    auth: ['Authenticating identity…', 'Verifying credentials…'],
};

function FolderTransferAnimation() {
    return (
        <div className="lo-folder-container">
            <div className="lo-file-particle lo-file-particle--1"></div>
            <div className="lo-folder">
                <div className="lo-folder__tab"></div>
                <div className="lo-folder__body">
                    <div className="lo-folder__inner-glow"></div>
                </div>
            </div>
        </div>
    );
}

export default function LoadingOverlay({ active, context = 'generic', message, inline = false }) {
    const [progress, setProgress] = useState(0);
    const messages = CONTEXT_MESSAGES[context] || CONTEXT_MESSAGES.generic;

    useEffect(() => {
        if (active) { setProgress(0); }
    }, [active]);

    if (!active) return null;

    return (
        <div className={`lo-overlay lo-overlay--active`}>
            <div className="lo-card">
                <div className="lo-card__accent" />
                <div className="lo-animation-area">
                    <FolderTransferAnimation />
                </div>
                <p className="lo-card__message">{message || messages[0]}</p>
                <div className="lo-card__progress-track">
                    <div className="lo-card__progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p className="lo-card__hint">Satya File Extraction Protocol</p>
            </div>
        </div>
    );
}
