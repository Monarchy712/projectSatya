import { useState, useEffect } from 'react';
import { getFactoryContract, getTenderContract, getSigner } from '../../utils/contracts';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../UI/LoadingOverlay';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('ongoing');
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionContext, setActionContext] = useState('deploying');

    // Stats aur form logic yahan handle karinge
    const [formData, setFormData] = useState({
        admins: ['', '', '', ''],
        startTime: '',
        endTime: '',
        biddingEndTime: '',
        retainedPercent: '30',
        milestones: [
            { name: 'Initial Research & Logistics', percentage: '20', deadline: '' },
            { name: 'Primary Infrastructure Execution', percentage: '50', deadline: '' },
            { name: 'Final Integration & Compliance', percentage: '30', deadline: '' }
        ]
    });

    const handleCreateTender = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        setActionContext('deploying');
        try {
            const signer = await getSigner();
            const factory = getFactoryContract(signer);
            // Tender creation logic yahan sync karinge source se
            alert('Tender Deployed Successfully!');
        } catch (err) {
            alert(`Deployment failed: ${err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1 className="admin-header__title">Infrastructure Governance Portal</h1>
                <div className="admin-header__badge">Official Government Authority</div>
            </header>

            <div className="admin-tabs">
                <button onClick={() => setActiveTab('ongoing')}>Vault View</button>
                <button onClick={() => setActiveTab('create')}>Tender Portal</button>
                <button onClick={() => setActiveTab('finalize')}>Settlement</button>
            </div>

            <LoadingOverlay active={actionLoading} context={actionContext} />

            <main className="admin-dashboard__content">
                {activeTab === 'create' && (
                    <form className="admin-form" onSubmit={handleCreateTender}>
                        {/* Milestone header alignment weight yahan fixed logic */}
                        <div className="admin-form__milestone-header">
                            <span className="admin-form__header-col--name">PHASE DESCRIPTION</span>
                            <span className="admin-form__header-col--pct">ALLOC %</span>
                            <span className="admin-form__header-col--date">ESTIMATED DEADLINE</span>
                        </div>
                        <button type="submit" className="admin-form__submit">Authorize Contract Deployment</button>
                    </form>
                )}
            </main>
        </div>
    );
}
