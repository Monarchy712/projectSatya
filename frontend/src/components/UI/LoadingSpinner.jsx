import React from 'react';
import './LoadingSpinner.css';

// satya-spinner component theme-aware hai buttons aur inline actions ke liye
export default function LoadingSpinner({ 
    size = '18px', 
    thickness = '2.5px', 
    color = 'var(--pink-600)', 
    label = null 
}) {
    return (
        <div className="satya-spinner-container" style={{ gap: label ? '8px' : '0' }}>
            <div 
                className="satya-spinner" 
                style={{ 
                    width: size, 
                    height: size, 
                    borderWidth: thickness,
                    borderTopColor: color
                }} 
            />
            {label && <span className="satya-spinner-label">{label}</span>}
        </div>
    );
}
