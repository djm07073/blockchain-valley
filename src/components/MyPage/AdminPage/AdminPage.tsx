import { BrowserProvider } from "ethers";
import { Signer } from "ethers";
import { useState } from "react";
import { CONFIGS } from "../../../config/address";
import { AdminBV__factory, Attendance3th__factory } from "../../../typechain";
import { rates } from "../../Navbar/Navbar";
import { checkCorrectChainId } from "../../../App";
import { rateToType } from "../Attendance/Attendance";
import { alumnaiPOAP, newBiePOAP, seniorPOAP, welcomePOAP } from "../MyPage";

interface AdminPageProps {
  lock: boolean;
  setlock: (lock: boolean) => void;
}

export default function AdminPage({ lock, setlock }: AdminPageProps) {
  const [inputScore, setInputScore] = useState<number>(1);
  const [type, setType] = useState<string>(rates[0]);
  const [account, setAccount] = useState<string>("");

  const handleInputChange = (e: any) => {
    // 입력한 점수를 업데이트
    const newScore = parseInt(e.target.value, 10);
    setInputScore(newScore);
  };
  const handleInputAccount = (e: any) => {
    const newAccount = e.target.value;
    setAccount(newAccount);
  };
  const setPOAPType = async (account: string) => {
    if ((await alumnaiPOAP.balanceOf(account!)) === 1n) {
      setType(rates[3]);
    } else if ((await seniorPOAP.balanceOf(account!)) === 1n) {
      setType(rates[2]);
    } else if ((await newBiePOAP.balanceOf(account!)) === 1n) {
      setType(rates[1]);
    } else if ((await welcomePOAP.balanceOf(account!)) === 1n) {
      setType(rates[0]);
    }
  };
  const increasePoint = async () => {
    if (await checkCorrectChainId()) {
      await setPOAPType(account);
      console.log(type);
      console.log(rateToType(type));
      const signer: Signer = await new BrowserProvider(
        window.ethereum
      ).getSigner();
      const adminPOAP = AdminBV__factory.connect(CONFIGS[1][137].admin, signer);
      await adminPOAP
        .increasePoint(account, inputScore, rateToType(type)!)
        .then((tx) => tx.wait());
    } else {
      alert("Please connect to the polygon network");
    }
  };
  const decreasePoint = async () => {
    if (await checkCorrectChainId()) {
      await setPOAPType(account);
      const signer: Signer = await new BrowserProvider(
        window.ethereum
      ).getSigner();
      const adminPOAP = AdminBV__factory.connect(CONFIGS[1][137].admin, signer);

      await adminPOAP
        .decreasePoint(account, inputScore, rateToType(type)!)
        .then((tx) => tx.wait());
    } else {
      alert("Plese connect to polygon network");
    }
  };
  const handleLock = async () => {
    const signer: Signer = await new BrowserProvider(
      window.ethereum
    ).getSigner();
    const attend = Attendance3th__factory.connect(
      CONFIGS[1][137].attendance!,
      signer
    );
    await attend.lockCheck().then((tx) => tx.wait());
    setlock(true);
  };
  const handleUnlock = async () => {
    const signer: Signer = await new BrowserProvider(
      window.ethereum
    ).getSigner();
    const attend = Attendance3th__factory.connect(
      CONFIGS[1][137].attendance!,
      signer
    );
    await attend.unlockCheck().then((tx) => tx.wait());
    setlock(false);
  };
  return (
    <div className="bg-white p-6 rounded shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] mb-6">
      <div className="flex px-4 py-4 mb-4 space-x-4">
        <h1 className="text-4xl font-light mb-4">👮‍♀️ Admin</h1>
        <div>
          {lock ? (
            <div className="flex-grow bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none mb-4">
              <button onClick={handleUnlock}>Unlock Attendance</button>
            </div>
          ) : (
            <div className="flex-grow bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 focus:outline-none mb-4">
              <button onClick={handleLock}>Lock Attendance</button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Address:</p>
          <input
            type="text"
            value={account}
            onChange={handleInputAccount}
            placeholder="Address of member"
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Score:</p>
          <input
            type="number"
            value={inputScore}
            onChange={handleInputChange}
            placeholder="PoC to give or seize"
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg ">
        <div className="mt-8 flex space-x-6">
          <button
            onClick={increasePoint}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
          >
            Give PoC
          </button>
          <button
            onClick={decreasePoint}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 focus:outline-none"
          >
            Seize PoC
          </button>
        </div>
      </div>
    </div>
  );
}
