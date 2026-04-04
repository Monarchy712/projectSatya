import { useState, useEffect } from 'react';
import './AdminApprovalPanel.css';

/**
 * Admin Approval Panel logic yahan sync karinge source se.
 * Built with retro transparency style for Satya.
 */

export default function AdminApprovalPanel({ milestoneId = 1, onApprovalSuccess }) {
    const [walletAddress, setWalletAddress] = useState(null);
    const [milestone, setMilestone] = useState(null);
    const [loading, setLoading] = useState(true);
    const [approving, setApproving] = useState(false);

    // Initial fetch logic yahan handle karinge properly
    useEffect(() => {
        const fetchMilestone = async () => {
            setLoading(true);
            // Simulating API Fetch logic sync
            setTimeout(() => {
                setMilestone({
                    milestoneId: milestoneId,
                    name: "Foundation & Framing Phase",
                    status: "UNDER_REVIEW",
                    admins: ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"]
                });
                setLoading(false);
            }, 800);
        };
        fetchMilestone();
    }, [milestoneId]);

    const handleConnectWallet = async () => {
        // MetaMask connection logic yahan sync karinge
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0].toLowerCase());
        }
    };

    const handleApprove = async () => {
        setApproving(true);
        // Approval logic yahan handle karinge source se
        await new Promise(r => setTimeout(r, 2000));
        setMilestone(prev => ({ ...prev, status: 'APPROVED' }));
        setApproving(false);
        if (onApprovalSuccess) onApprovalSuccess();
    };

    if (loading) return <div className="admin-panel">Loading...</div>;

    return (
        <div className="admin-panel">
            <header className="admin-panel__header">
                <h2 className="admin-panel__title">Admin Approval</h2>
                {walletAddress ? (
                    <div className="admin-panel__wallet-status">🟢 Connected</div>
                ) : (
                    <button className="admin-panel__btn-connect" onClick={handleConnectWallet}>Connect Wallet</button>
                )}
            </header>
            <section className="admin-panel__info">
                <div className="admin-panel__info-item">
                    <span className="admin-panel__info-label">Milestone</span>
                    <span className="admin-panel__info-value">{milestone.name}</span>
                </div>
            </section>
            <section className="admin-panel__actions">
                <button className="admin-panel__btn-approve" onClick={handleApprove} disabled={approving}>
                    {approving ? 'Approving...' : 'Approve Milestone'}
                </button>
            </section>
        </div>
    );
}
