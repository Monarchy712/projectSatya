import { useState, useEffect } from 'react';
import './Tenders.css';

function TendersPage() {
    // tenders browsing page logic
    const [tenders, setTenders] = useState([]);
    
    return (
        <div className="tenders">
            <h1 className="tenders__header">Live Tenders</h1>
            <div className="tenders__grid">
                {/* Yahan array maps karinge backend data se */}
                <div className="tender-card">
                    <h3>Bridge Construction</h3>
                    <p>Status: BIDDING</p>
                </div>
            </div>
        </div>
    );
}

export default TendersPage;
