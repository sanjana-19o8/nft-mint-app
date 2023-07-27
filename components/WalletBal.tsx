import { useState } from "react";
import { ethers } from "ethers";

export default function WalletBal() {
    const [showBal, setShow] = useState(false);
    const [balance, setBalance] = useState<string>();

    const getBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let account: any;
        // Request user account access
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts: any) => {
                // Handle successful account access
                console.log('Accounts:', accounts);
                account = accounts[0];
            })
            .catch((error: any) => {
                // Handle error
                console.error('Error:', error);
            });

        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <div>
            <button
                onClick={() => {
                    getBalance();
                    setShow(true);
                }}
            >
                Check Balance
            </button>
            {showBal && <div>Your balance: {balance} ETH</div>}
        </div>
    )
}