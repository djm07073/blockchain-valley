import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet/ConnectWallet";

import logo from "../../../image/bvlogo.png";
export const rates = ["WELCOME", "NEWBIE", "SENIOR", "ALUMNAI"];
interface NavbarProps {
  account: string | null;
  setAccount: (acc: string) => void;
  chainId: number;
  setchainId: (chainId: number) => void;
}
export default function Navbar({
  account,
  setAccount,
  chainId,
  setchainId,
}: NavbarProps) {
  return (
    <header className="flex bg-black text-white p-4 items-center justify-between w-full">
      <img className="space-x-4 px-2 py-2" src={logo} width="70" height="70" />
      <ul className="flex space-x-4 list-none">
        <li>
          <Link className="btn-link" to="/">
            <button className="bg-black text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out">
              Home
            </button>
          </Link>
        </li>

        <li>
          <Link className="btn-link" to="history">
            <button className="bg-black text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out">
              History
            </button>
          </Link>
        </li>
        <li>
          <Link className="btn-link" to="community">
            <button className="bg-black text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out">
              Community
            </button>
          </Link>
        </li>
        <li>
          <Link className="btn-link" to="mypage" state={{ account, chainId }}>
            <button className="bg-black text-white hover:bg-red-600 hover:text-black px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out">
              My Page
            </button>
          </Link>
        </li>
      </ul>

      <ConnectWallet
        account={account}
        setAccount={setAccount}
        setChainId={setchainId}
      />
    </header>
  );
}
