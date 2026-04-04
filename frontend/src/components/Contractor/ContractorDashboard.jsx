import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ContractorDashboard.css';

export default function ContractorDashboard() {
    const { user } = useAuth();
    const [myContracts, setMyContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Backend se contracts load karinge contractor address ke basis par
        async function load() {
            try {
                const res = await fetch('http://localhost:8000/api/tenders/list');
                const data = await res.json();
                const filtered = data.filter(t => t.contractor.toLowerCase() === user.wallet.toLowerCase());
                setMyContracts(filtered);
            } catch (err) {
                console.error("Dashboard load failed:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [user.wallet]);

    const handleApply = (tenderAddr, mIdx) => {
        // blockchain par milestone submit karne ki logic
        setSubmitting(true);
        setTimeout(() => {
             alert(`Milestone ${mIdx+1} for ${tenderAddr} submitted for review!`);
             setSubmitting(false);
        }, 1500);
    };

    return (
        <div className="contractor-dashboard">
            <header className="contractor-header">
                <h1>Infrastructure Ledger</h1>
                <p>Contractor Wallet: {user.wallet.slice(0,12)}...</p>
            </header>

            {loading ? <p>Loading data...</p> : (
                <div className="content">
                    <section className="section">
                        <h2>🏗️ Active Pipeline</h2>
                        {myContracts.map((t, i) => (
                            <div key={i} className="card">
                                <h3>Project: {t.tender_address.slice(0,10)}...</h3>
                                <div className="milestones">
                                    {t.milestones.map((m, idx) => (
                                        <div key={idx} className="milestone-row">
                                            <span>{m.name} ({m.percentage}%)</span>
                                            {idx === t.current_milestone && m.status === 0 && (
                                                <button className="btn" onClick={() => handleApply(t.tender_address, idx)}>
                                                    Apply for Approval
                                                </button>
                                            )}
                                            {m.status === 1 && <span className="status">Under Review</span>}
                                            {m.status === 2 && <span className="status">Approved ✓</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {myContracts.length === 0 && <p>No active contracts assigned yet.</p>}
                    </section>
                </div>
            )}
            
            {submitting && <div className="overlay">Transmitting to Blockchain...</div>}
        </div>
    );
}
