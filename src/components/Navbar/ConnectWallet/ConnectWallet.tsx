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
      <button
        className="bg-black text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out"
        onClick={onConnect}
        disabled={Boolean(account)}
      >
        Connect Wallet
      </button>
    </div>
  );
}
