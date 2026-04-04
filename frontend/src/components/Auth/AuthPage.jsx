import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { sendAadhaarOTP, verifyAadhaarOTP, walletConnect, walletVerify } from '../../utils/api';
import { isMetaMaskInstalled, connectMetaMask, signMessage } from '../../utils/metamask';
import './AuthPage.css';

const STEPS = { AADHAAR: 'aadhaar', OTP: 'otp', WALLET_SIGNING: 'wallet_signing' };

export default function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    // ── Local State ──
    const [step, setStep] = useState(STEPS.AADHAAR);
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletMessage, setWalletMessage] = useState('');
    const [walletRole, setWalletRole] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        const cleaned = aadhaar.replace(/\s/g, '');
        if (cleaned.length !== 12) {
            setError('Valid 12-digit Aadhaar number chahiye.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            await sendAadhaarOTP(cleaned);
            setStep(STEPS.OTP);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (otp.length !== 4) {
            setError('OTP exact 4 digits ka hona chahiye.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const cleaned = aadhaar.replace(/\s/g, '');
            const res = await verifyAadhaarOTP(cleaned, otp);
            login(res.access_token, { role: res.role, name: res.name });
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWalletConnect = async (role) => {
        if (!isMetaMaskInstalled()) {
            setError('MetaMask missing hai, please install karinge.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const address = await connectMetaMask();
            setWalletAddress(address);
            const res = await walletConnect(address);
            setWalletRole(res.role);
            setWalletMessage(res.message);
            setStep(STEPS.WALLET_SIGNING);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleWalletSign = async () => {
        setError('');
        setLoading(true);
        try {
            const signature = await signMessage(walletMessage);
            const res = await walletVerify(walletAddress, signature);
            login(res.access_token, {
                role: res.role,
                name: res.name,
                wallet: walletAddress
            });
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">सत्य Login</h1>
                
                {step === STEPS.AADHAAR && (
                    <div className="auth-card">
                        <h2>Aadhaar Login</h2>
                        <input 
                            className="auth-input"
                            type="text" 
                            placeholder="XXXX XXXX XXXX" 
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button className="btn" onClick={handleSendOTP} disabled={loading}>
                            {loading ? 'Wait...' : 'Send OTP'}
                        </button>
                        <div className="divider">or</div>
                        <button className="btn btn-alt" onClick={() => handleWalletConnect('contractor')}>
                             Wallet Login (Contractor/Admin)
                        </button>
                    </div>
                )}

                {step === STEPS.OTP && (
                    <div className="auth-card">
                        <h2>Enter OTP</h2>
                        <input 
                            className="auth-input"
                            type="text" 
                            placeholder="• • • •" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button className="btn" onClick={handleVerifyOTP} disabled={loading}>
                            Verify OTP
                        </button>
                    </div>
                )}

                {step === STEPS.WALLET_SIGNING && (
                    <div className="auth-card">
                        <h2>Wallet Verify</h2>
                        <p>Address: {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}</p>
                        <p>Detected Role: {walletRole}</p>
                        {error && <p className="error">{error}</p>}
                        <button className="btn" onClick={handleWalletSign} disabled={loading}>
                            Sign with MetaMask 🦊
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
