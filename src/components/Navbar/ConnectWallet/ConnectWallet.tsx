import React from "react";
import { connectMetamask } from "../../../utils/metamask";

interface ConnectWallerProps {
  account: string | null;
  setAccount: (acc: string) => void;
  setChainId: (chainId: number) => void;
}
export default function ConnectWallet({
  account,
  setAccount,
  setChainId,
}: ConnectWallerProps) {
  const onConnect = async () => {
    const result = await connectMetamask();
    setAccount(result!.account);
    setChainId(result!.chainId);
  };

  return (
    <div>
      <button className="btn" onClick={onConnect} disabled={Boolean(account)}>
        Connect Wallet
      </button>
    </div>
  );
}
