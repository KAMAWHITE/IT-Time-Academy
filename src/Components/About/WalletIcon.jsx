import React from 'react';

const WalletIcon = () => {
    return (
        <div className="relative w-16 h-24">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 64 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="64" height="96" rx="10" fill="#E74C3C" />
                <circle cx="32" cy="48" r="20" fill="white" />
                <circle cx="32" cy="48" r="5" fill="#E74C3C" />
            </svg>
        </div>
    );
};

export default WalletIcon;