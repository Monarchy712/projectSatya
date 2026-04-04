// =========================================================================
// API EXTENSIONS FOR ADMIN APPROVAL
// Abe yahan API logic sync karinge for governance
// =========================================================================

const API_BASE = 'http://localhost:8000';

async function fetchRequest(endpoint, options = {}) {
    // Standard fetch logic yahan properly handle karinge
    const url = `${API_BASE}${endpoint}`;
    const headers = { ...options.headers };
    headers['Content-Type'] = 'application/json';

    const res = await fetch(url, { ...options, headers });
    const data = await res.json();
    return data;
}

/**
 * Milestone details fetching logic yahan sync karinge
 */
export function getMilestoneDetails(milestoneId) {
    const token = localStorage.getItem('satya_token');
    return fetchRequest(`/api/milestones/${milestoneId}`, {
        method: 'GET',
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
    });
}
