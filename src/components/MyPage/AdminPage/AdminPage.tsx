import { BrowserProvider } from "ethers";
import { Signer } from "ethers";
import { useState } from "react";
import { CONFIGS } from "../../../config/address";
import { AdminBV__factory } from "../../../typechain";
import { rates } from "../../Navbar/Navbar";
import { checkCorrectChainId } from "../../../App";
import { rateToEmoji } from "../MyPage";

export default function AdminPage() {
  const [inputScore, setInputScore] = useState<number>(1);
  const [selectedRate, setSelectedRate] = useState(rates[0]);
  const [account, setAccount] = useState<string>("");
  const handleRateSelection = (rate: string) => {
    setSelectedRate(rate);
  }; // poap 타입을 설정
  const handleInputChange = (e: any) => {
    // 입력한 점수를 업데이트
    const newScore = parseInt(e.target.value, 10);
    setInputScore(newScore);
  };
  const handleInputAccount = (e: any) => {
    const newAccount = e.target.value;
    setAccount(newAccount);
  };
  const increasePoint = async () => {
    if (await checkCorrectChainId()) {
      const signer: Signer = await new BrowserProvider(
        window.ethereum
      ).getSigner();
      const adminPOAP = AdminBV__factory.connect(CONFIGS[1][137].admin, signer);
      if (selectedRate === rates[0]) {
        adminPOAP.increasePoint(account, inputScore, 0n);
      } else if (selectedRate === rates[1]) {
        adminPOAP.increasePoint(account, inputScore, 1n);
      } else if (selectedRate === rates[2]) {
        adminPOAP.increasePoint(account, inputScore, 2n);
      } else if (selectedRate === rates[3]) {
        adminPOAP.increasePoint(account, inputScore, 3n);
      }
    } else {
      alert("Please connect to the polygon network");
    }
  };
  const decreasePoint = async () => {
    if (await checkCorrectChainId()) {
      const signer: Signer = await new BrowserProvider(
        window.ethereum
      ).getSigner();
      const adminPOAP = AdminBV__factory.connect(CONFIGS[1][137].admin, signer);
      if (selectedRate === rates[0]) {
        adminPOAP.decreasePoint(account, inputScore, 0n);
      } else if (selectedRate === rates[1]) {
        adminPOAP.decreasePoint(account, inputScore, 1n);
      } else if (selectedRate === rates[2]) {
        adminPOAP.decreasePoint(account, inputScore, 2n);
      } else if (selectedRate === rates[3]) {
        adminPOAP.decreasePoint(account, inputScore, 3n);
      }
    } else {
      alert("Please connect to polygon network");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h1 className="text-4xl font-light mb-4">👮‍♀️ Admin</h1>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Address:</p>
          <input
            type="text"
            value={account}
            onChange={handleInputAccount}
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Score:</p>
          <input
            type="number"
            value={inputScore}
            onChange={handleInputChange}
            min="1"
            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-light mb-2">
          Selected POAP Type: {selectedRate}
        </p>
        <div className="flex space-x-2">
          {rates.map((rate) => (
            <button
              key={rate}
              onClick={() => handleRateSelection(rate)}
              className={`rounded-full w-10 h-10 flex items-center justify-center focus:outline-none ${
                selectedRate === rate
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-200"
              }`}
            >
              {rateToEmoji(rate)}
            </button>
          ))}
        </div>
        <div className="mt-4">
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
            Take PoC
          </button>
        </div>
      </div>
    </div>
  );
}
