import { useState, useEffect } from 'react';
import { getTenderContract, getSigner } from '../../utils/contracts';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../UI/LoadingOverlay';
import './AdminDashboard.css';

export default function SignatoryDashboard() {
    const { user } = useAuth();
    const [pendingTasks, setPendingTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    // Signatory approval logic yahan handle karinge
    useEffect(() => {
        loadPendingTasks();
    }, []);

    async function loadPendingTasks() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/tenders/list');
            const allTenders = await response.json();
            // Filter logic for signatories yahan sync karinge source se
            setPendingTasks([]);
        } catch (err) {
            console.error('[Signatory] Load error:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1 className="admin-header__title">Signatory Approval Portal</h1>
                <div className="admin-header__badge">Authorized Project Signatory</div>
            </header>

            <LoadingOverlay active={!!processingId} context="signing" />

            <main className="admin-dashboard__content">
                <div className="admin-form__section">
                    <h3 className="admin-form__section-title">Awaiting Project Signatures</h3>
                    {/* Hoverable 'i' button logic yahan fixed for signatory */}
                    <div className="admin-tender-card__asset-info">
                        <div className="admin-tender-card__info-btn">
                            i
                            <span className="admin-tender-card__tooltip">0xFakeAddressSync</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
