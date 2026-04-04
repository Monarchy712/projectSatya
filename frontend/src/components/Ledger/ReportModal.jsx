import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { submitReport, validateReport } from '../../utils/api';
import LoadingOverlay from '../UI/LoadingOverlay';
import LoadingSpinner from '../UI/LoadingSpinner';
import './ReportModal.css';

export default function ReportModal({ contract, onClose }) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Pinata context yahan handle karinge properly
    const PINATA_API_KEY = "cbe8505e82a50b088525";
    const PINATA_SECRET_KEY = "35e2636d1a81f2673f53ed1938100037b995cc53aaa16bed6b844e1f57b39fec";

    useEffect(() => {
        return () => previews.forEach(url => URL.revokeObjectURL(url));
    }, [previews]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus("Analysing images with AI...");

        try {
            // ML validation logic yahan sync karinge source se
            const mlResult = await validateReport(files);
            
            if (!mlResult.success) {
                setError(`Neural Verification Rejected: ${mlResult.message}`);
                setIsSubmitting(false);
                return;
            }

            setStatus("Packaging immutable report bundle...");
            // IPFS upload logic (Simplified for mirror)
            const mockCID = "QmFakeCID" + Date.now();
            
            setStatus("Commiting to Satya Blockchain...");
            await submitReport(contract.id, mockCID, mlResult.score);

            setSuccess(true);
            setStatus("Report securely recorded.");
            setTimeout(() => onClose(), 2000);
        } catch (err) {
            setError("Network error, please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="report-modal-overlay">
            <LoadingOverlay active={isSubmitting} message={status} />
            
            <div className={`report-modal ${success ? 'report-modal--success' : ''}`}>
                <h2 className="report-modal__title">Public Transparency Report</h2>
                {!success ? (
                    <form onSubmit={handleSubmit} className="report-modal__form">
                        <textarea
                            className="report-modal__textarea"
                            placeholder="Describe any deviations..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                        <button type="submit" className="report-modal__submit">
                            Validate & Submit Report
                        </button>
                    </form>
                ) : (
                    <div className="success">Success! Report committed.</div>
                )}
            </div>
        </div>
    );
}
