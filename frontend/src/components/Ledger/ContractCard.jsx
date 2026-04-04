import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ReportModal from './ReportModal';
import './ContractCard.css';

export default function ContractCard({ contract }) {
    const [expanded, setExpanded] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const { user } = useAuth();

    // Indian format mein currency dikhane ki utility
    const formatCurrency = (n) => {
        if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`;
        if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
        return `₹${n.toLocaleString('en-IN')}`;
    };

    const progress = Math.min(100, Math.round((contract.spent / contract.budget) * 100)) || 0;

    return (
        <div className={`contract-card ${expanded ? 'contract-card--expanded' : ''} contract-card--${contract.status}`}>
            <div className="contract-card__header" onClick={() => setExpanded(!expanded)}>
                <div className="contract-card__header-main">
                    <div className="contract-card__id">{contract.id}</div>
                    <h3 className="contract-card__title">{contract.title}</h3>
                    <div className="contract-card__department">{contract.department} • {contract.location}</div>
                </div>

                <div className="contract-card__header-side">
                    <div className={`contract-card__status contract-card__status--${contract.status}`}>
                        {contract.status.toUpperCase()}
                    </div>
                    <div className="contract-card__budget">
                        <span className="contract-card__budget-amount">{formatCurrency(contract.budget)}</span>
                        <span className="contract-card__budget-label">Total Budget</span>
                    </div>
                    <button className="contract-card__toggle">{expanded ? '▲' : '▼'}</button>
                </div>
            </div>

            {expanded && (
                <div className="contract-card__details">
                    <p className="contract-card__description">{contract.description}</p>
                    
                    <div className="contract-card__grid">
                        {/* Meta items logic yahan mount karinge */}
                        <div className="contract-card__meta--progress">
                            <span className="contract-card__meta-label">Funds Utilization ({progress}%)</span>
                            <div className="contract-card__progress-bar">
                                <div className="contract-card__progress-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>

                    {user?.role === 'citizen' && contract.status === 'completed' && (
                        <div className="contract-card__report-section">
                            <button className="contract-card__report-btn" onClick={(e) => {
                                e.stopPropagation();
                                setShowReportModal(true);
                            }}>
                                Report Quality Issue 🚩
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showReportModal && (
                <ReportModal contract={contract} onClose={() => setShowReportModal(false)} />
            )}
        </div>
    );
}
