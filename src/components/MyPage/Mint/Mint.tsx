import React from "react";
import { BrowserProvider } from "ethers";
import { WelcomePOAP__factory } from "../../../typechain";
import { Signer } from "ethers";
import { CONFIGS } from "../../../config/address";
import { checkCorrectChainId } from "../../../App";

export default function Mint() {
  const handleMint = async () => {
    try {
      if (await checkCorrectChainId()) {
        const signer: Signer = await new BrowserProvider(
          window.ethereum
        ).getSigner();
        const welcomePOAP = WelcomePOAP__factory.connect(
          CONFIGS[1][137].welcome,
          signer
        );
        await welcomePOAP.mint().then((tx) => tx.wait());
        alert("Minting successful!"); // Minting 성공 메시지 추가
      } else {
        alert("Please connect to the correct network");
      }
    } catch (error) {
      console.error("Error minting:", error); // 에러 처리 추가
      alert("An error occurred while minting."); // 에러 메시지 추가
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <h2 className="text-2xl rounded-lg">
        Mint and get your Blockchain Valley POAP! 🤗
      </h2>
      <button
        className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        onClick={handleMint}
      >
        Mint
      </button>
    </div>
  );
}
