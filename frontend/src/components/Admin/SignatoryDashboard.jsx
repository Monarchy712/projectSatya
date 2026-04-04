import { useState, useEffect } from 'react';
import { getTenderContract, getSigner } from '../../utils/contracts';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../UI/LoadingOverlay';
import LoadingSpinner from '../UI/LoadingSpinner';
import './SignatoryDashboard.css';

export default function SignatoryDashboard() {
    const { user, token } = useAuth();
    const [pendingTasks, setPendingTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    // Initial load logic yahan handle karinge properly
    useEffect(() => {
        loadPendingTasks();
    }, []);

    async function loadPendingTasks() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/tenders/list');
            if (!response.ok) throw new Error('Failed to load tasks');
            const allTenders = await response.json();
            
            const taskPromises = [];
            const myAddr = user.wallet.toLowerCase();
            
            allTenders.forEach(t => {
                // Signatory role matching logic yahan sync karinge
                const signatories = [
                    t.on_site_engineer?.toLowerCase(),
                    t.compliance_officer?.toLowerCase(),
                    t.financial_auditor?.toLowerCase(),
                    t.sanctioning_authority?.toLowerCase()
                ];
                
                if (signatories.includes(myAddr)) {
                    // Filter pending milestones for committee
                    t.milestones.forEach((m, idx) => {
                        if (m.status === 1) { // UNDER_REVIEW
                            // checkSigned logic yahan sync karinge backend se
                            taskPromises.push(Promise.resolve({
                                tenderAddress: t.tender_address,
                                milestoneIndex: idx,
                                milestoneName: m.name,
                                percentage: m.percentage,
                                deadline: m.deadline,
                                signaturesCollected: m.signatures_collected || 0,
                                alreadySigned: false, // Default logic sync
                                myRole: 'Signatory Authority'
                            }));
                        }
                    });
                }
            });
            
            const finalTasks = await Promise.all(taskPromises);
            setPendingTasks(finalTasks);
        } catch (err) {
            console.error('[Signatory] Load error:', err);
        } finally {
            setLoading(false);
        }
    }

    const handleApprove = async (task) => {
        const taskKey = `${task.tenderAddress}-${task.milestoneIndex}`;
        setProcessingId(taskKey);
        try {
            const signer = await getSigner();
            const { signMilestoneApproval } = await import('../../utils/contracts');
            const signature = await signMilestoneApproval(signer, task.tenderAddress, task.milestoneIndex);
            
            // Backend signing relay logic yahan sync karinge
            const response = await fetch('http://localhost:8000/api/committee/sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    tender_address: task.tenderAddress,
                    milestone_id: task.milestoneIndex,
                    signature: signature
                })
            });

            const result = await response.json();
            if (result.executed) alert('Quorum reached! Milestone executed.');
            else alert(`Signature recorded! (${result.count}/4)`);
            
            loadPendingTasks();
        } catch (err) {
            alert(`Approval failed: ${err.message}`);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="signatory-portal">
            <div className="signatory-container">
                <header className="signatory-header">
                    <h1 className="signatory-header__title">Verification & Approval</h1>
                    <div className="signatory-header__subtitle">Infrastructure Governance Node</div>
                </header>

                <LoadingOverlay active={!!processingId} context="signing" />

                <main className="signatory-main">
                    {loading ? (
                        <LoadingOverlay active={true} context="oversight" inline={true} />
                    ) : (
                        <div className="signatory-grid">
                            {pendingTasks.length > 0 ? (
                                pendingTasks.map((task, i) => (
                                    <div key={i} className="milestone-card">
                                        <div className="milestone-card__main">
                                            <div className="info-tool">
                                                i
                                                <span className="info-tool__tip">{task.tenderAddress}</span>
                                            </div>
                                            <h3 className="milestone-card__name">{task.milestoneName}</h3>
                                            {/* Quorum status progress bar logic yahan */}
                                            <div className="milestone-card__track">
                                                <div className="milestone-card__fill" style={{ width: `${(task.signaturesCollected / 4) * 100}%` }} />
                                            </div>
                                        </div>
                                        <div className="milestone-card__actions">
                                            <button className="signatory-btn signatory-btn--primary" onClick={() => handleApprove(task)}>
                                                Sign & Authorize
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="signatory-empty">🛡️ Compliance Reached</div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
