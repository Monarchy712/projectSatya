// ── Satya Transparency Ledger ke liye hardcoded data ──

export const contractors = [
    {
        id: 'CTR-001',
        name: 'Rajesh Kumar & Associates',
        specialty: 'Highway & Road Construction',
        registrationDate: '2019-04-12',
        rating: 4.2,
        totalContracts: 8,
        activeContracts: 3,
        location: 'New Delhi, India',
        licenseNo: 'MoRTH-HW-2019-0412',
        contracts: [
            {
                id: 'CON-1001',
                title: 'NH-48 Expressway Extension — Phase III',
                status: 'ongoing',
                department: 'Ministry of Road Transport & Highways',
                startDate: '2025-06-15',
                expectedEnd: '2027-01-30',
                budget: 4500000000,
                spent: 1875000000,
                description: 'Construction of 42 km four-lane expressway extension.',
                milestones: [
                    { name: 'Land Acquisition', status: 'completed', date: '2025-08-01' },
                    { name: 'Pavement Layer 1', status: 'ongoing', date: '2026-06-30' }
                ],
                location: 'Haryana, India'
            }
        ],
    },
    {
        id: 'CTR-002',
        name: 'Meera Constructions Pvt. Ltd.',
        specialty: 'Public Building & Infrastructure',
        registrationDate: '2017-08-22',
        rating: 4.6,
        totalContracts: 12,
        activeContracts: 2,
        location: 'Mumbai, Maharashtra',
        licenseNo: 'CPWD-BLD-2017-0822',
        contracts: [
            {
                id: 'CON-2001',
                title: 'District Hospital Expansion — Pune',
                status: 'ongoing',
                department: 'Maharashtra Public Health Department',
                startDate: '2025-02-01',
                expectedEnd: '2026-12-31',
                budget: 2200000000,
                spent: 990000000,
                description: 'Construction of 200-bed extension wing.',
                milestones: [
                    { name: 'Foundation & Structure', status: 'completed', date: '2025-09-30' },
                    { name: 'MEP Installation', status: 'ongoing', date: '2026-04-30' }
                ],
                location: 'Pune, Maharashtra'
            }
        ],
    }
];

export const ledgerStats = {
    totalContractors: 6,
    totalContracts: 22,
    totalBudgetAllocated: 30863000000,
    totalSpent: 10141000000,
    ongoingContracts: 8,
    pendingContracts: 5,
    completedContracts: 9,
    lastUpdated: '2026-03-29T11:00:00Z',
};
