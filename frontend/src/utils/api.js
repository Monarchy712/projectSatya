const API_BASE = 'http://localhost:8000';

async function request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    // FormData ke liye browser handles boundary
    const isFormData = options.body instanceof FormData;
    const headers = { ...options.headers };
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        ...options,
        headers
    };

    const res = await fetch(url, config);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.detail || `Request failed with status ${res.status}`);
    }

    return data;
}

// ── Citizen Auth ──
export function sendAadhaarOTP(aadhaar_number) {
    return request('/api/auth/aadhaar/send-otp', {
        method: 'POST',
        body: JSON.stringify({ aadhaar_number }),
    });
}

export function verifyAadhaarOTP(aadhaar_number, otp) {
    return request('/api/auth/aadhaar/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ aadhaar_number, otp }),
    });
}

// ── Wallet Auth ──
export function walletConnect(wallet_address) {
    return request('/api/auth/wallet/connect', {
        method: 'POST',
        body: JSON.stringify({ wallet_address }),
    });
}

export function walletVerify(wallet_address, signature) {
    return request('/api/auth/wallet/verify', {
        method: 'POST',
        body: JSON.stringify({ wallet_address, signature }),
    });
}

// ── Contractor Management ──
export function listContractors() {
    return request('/api/contractors/list', { method: 'GET' });
}

export function validateReport(files) {
    const token = localStorage.getItem('satya_token');
    const formData = new FormData();
    
    // Up to 3 files allow karinge validation ke liye
    const filesArray = Array.from(files);
    filesArray.slice(0, 3).forEach((file) => {
        formData.append('files', file);
    });

    return request('/api/reports/validate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });
}

export function submitReport(contract_id, cid, confidence) {
    const token = localStorage.getItem('satya_token');
    return request('/api/reports/submit', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ contract_id, cid, confidence }),
    });
}
