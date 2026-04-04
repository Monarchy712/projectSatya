import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './OversightDashboard.css';

export default function OversightDashboard() {
    const { user, token } = useAuth();
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [signing, setSigning] = useState(false);

    useEffect(() => {
        // Backend/Blockchain se user ke relevant tenders load karinge
        async function load() {
            try {
                const res = await fetch('http://localhost:8000/api/tenders/list');
                const data = await res.json();
                setTenders(data);
            } catch (err) {
                console.error("Oversight data failed:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleSign = (addr, mIdx) => {
        // signature collection logic
        setSigning(true);
        setTimeout(() => {
            alert(`Signature collected for ${addr} Phase ${mIdx+1}`);
            setSigning(false);
        }, 1000);
    };

    return (
        <div className="oversight-view">
            <header className="oversight-header">
                <h1>Oversight Committee Portal</h1>
                <div className="badge">Role: {user.name || 'Committee Member'}</div>
            </header>

            {loading ? <p>Loading oversight tasks...</p> : (
                <div className="container">
                    <section className="list">
                        <h2>Pending Milestone Reviews</h2>
                        {tenders.map((t, i) => (
                            <div key={i} className="card">
                                <h3>Project: {t.tender_address.slice(0,10)}...</h3>
                                <p>Milestone #{t.current_milestone + 1}</p>
                                <div className="actions">
                                    <button className="btn" onClick={() => handleSign(t.tender_address, t.current_milestone)}>
                                        🖋️ Sign & Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            )}

            {signing && <div className="overlay">Cryptographic Signing in progress...</div>}
        </div>
    );
}
