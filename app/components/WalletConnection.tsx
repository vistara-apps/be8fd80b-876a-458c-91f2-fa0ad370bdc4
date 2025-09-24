'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';

export function WalletConnection() {
  return (
    <div className="glass-card p-6 text-center">
      <div className="mb-6">
        <div className="text-4xl mb-4">🌱</div>
        <h2 className="text-xl font-semibold text-fg mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-text-secondary">
          Connect your wallet to start receiving personalized plant care reminders on Celo
        </p>
      </div>

      <Wallet>
        <ConnectWallet>
          <div className="btn-primary w-full">
            Connect Wallet
          </div>
        </ConnectWallet>
      </Wallet>
    </div>
  );
}

export function UserProfile() {
  return (
    <div className="flex items-center gap-3 p-3 glass-card">
      <Wallet>
        <Identity>
          <Avatar className="w-10 h-10" />
          <Name className="text-fg font-medium" />
        </Identity>
      </Wallet>
    </div>
  );
}
