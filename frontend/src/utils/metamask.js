import { BrowserProvider } from 'ethers';

/**
 * Check karinge ki MetaMask installed hai ya nahi browser mein
 */
export function isMetaMaskInstalled() {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}

/**
 * MetaMask connect karke user ka first account address return karinge
 */
export async function connectMetaMask() {
    if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask install nahi hai, please extension add karinge tabhi chalega.');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
        throw new Error('Account nahi mila, please MetaMask unlock karinge.');
    }

    return accounts[0].toLowerCase();
}

/**
 * Proof of wallet ownership ke liye message sign karinge
 * @param {string} msg - Message containing nonce from backend
 */
export async function signMessage(msg) {
    if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask error: not installed.');
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // browser provider use karke signing logic
    const signature = await signer.signMessage(msg);
    return signature;
}
