import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('ongoing');
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state for creating new tender
    const [formData, setFormData] = useState({
        admins: ['', '', '', ''],
        startTime: '',
        endTime: '',
        biddingEndTime: '',
        retainedPercent: '30',
        milestones: [
            { name: 'Initial Planning', percentage: '20' },
            { name: 'Execution Phase 1', percentage: '50' },
            { name: 'Final Handover', percentage: '30' }
        ]
    });

    useEffect(() => {
        // Backend se tenders list fetch karinge
        async function load() {
            try {
                const res = await fetch('http://localhost:8000/api/tenders/list');
                const data = await res.json();
                setTenders(data);
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        // logic for factory.createTender call yahan link karinge final sync mein
        alert("Tender authorize ho raha hai blockchain par...");
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Infrastructure Governance Portal</h1>
                <div className="badge">Welcome, {user?.name || 'Admin'}</div>
            </header>

            <div className="tabs">
                <button onClick={() => setActiveTab('ongoing')}>Vault View</button>
                <button onClick={() => setActiveTab('create')}>Tender Portal</button>
            </div>

            {activeTab === 'ongoing' && (
                <div className="grid">
                    {tenders.map((t, i) => (
                        <div key={i} className="card">
                            <h3>Asset #{i+1}</h3>
                            <p>Status: {t.status}</p>
                            <p>Bids: {t.bids?.length || 0}</p>
                        </div>
                    ))}
                    {tenders.length === 0 && <p>No active assets found on chain.</p>}
                </div>
            )}

            {activeTab === 'create' && (
                <form className="admin-form" onSubmit={handleCreate}>
                    <h3>Tender Creation Portal</h3>
                    <div className="field">
                        <label>Admin 1 Wallet</label>
                        <input type="text" placeholder="0x..." />
                    </div>
                    {/* Simplified for mirror emulation */}
                    <button type="submit" className="btn">Deploy Contract</button>
                </form>
            )}
        </div>
    );
}
