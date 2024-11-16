'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] bg-black hover:bg-slate-800"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
