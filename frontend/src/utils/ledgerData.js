import { contractors as syntheticContractors } from '../data/contractors';

function formatDate(ts) {
    if (!ts) return '—';
    return new Date(Number(ts) * 1000).toISOString().split('T')[0];
}

export async function getUnifiedLedgerData() {
    try {
        // 1. Backend se real contractors fetch karinge
        const res = await fetch('http://localhost:8000/api/contractors/list');
        if (!res.ok) throw new Error('Backend current status: unavailable');
        const realContractorsRes = await res.json();
        
        // 2. Blockchain mapping (dummy simulation logic for mirroring)
        const realContractors = realContractorsRes.map((rc) => ({
            id: rc.registration_id || rc.id,
            name: rc.company_name,
            specialty: rc.specialty || 'Infrastructure',
            registrationDate: rc.created_at || '2026-01-01',
            rating: rc.trust_score / 20 || 4.5,
            totalContracts: 0,
            activeContracts: 0,
            location: rc.location || 'India',
            licenseNo: rc.license_no || 'P-VERIFIED',
            contracts: [],
            isReal: true
        }));

        // real aur synthetic dono data merge karke return karinge UI ke liye
        return [...realContractors, ...syntheticContractors];
    } catch (err) {
        console.warn('Backend mapping error, fallback karinge synthetic data par:', err);
        return syntheticContractors;
    }
}
