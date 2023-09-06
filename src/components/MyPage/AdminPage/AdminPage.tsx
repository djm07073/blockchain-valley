import { BrowserProvider } from "ethers";
import { Signer } from "ethers";
import { useState } from "react";
import { CONFIGS } from "../../../config/address";
import { AdminBV__factory } from "../../../typechain";
import { rates } from "../../Navbar/Navbar";
import { checkCorrectChainId } from "../../../App";

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
    <div>
      <div className="flex">
        <h1>Admin</h1>
        <p>점수/ address</p>
        <input
          type="number"
          value={inputScore}
          onChange={handleInputChange}
          min="1" // 최소값을 1로 설정
        />
        <input type="text" value={account} onChange={handleInputAccount} />
      </div>
      <div>
        <p>선택된 POAP: {selectedRate}</p>
        <div>
          {rates.map((rate) => (
            <button
              key={rate}
              onClick={() => handleRateSelection(rate)}
              className={selectedRate === rate ? "selected" : ""}
            >
              {rate}
            </button>
          ))}
        </div>
      </div>
      <button onClick={increasePoint}>Give PoC </button>
      <button onClick={decreasePoint}>Take PoC</button>
    </div>
  );
}
