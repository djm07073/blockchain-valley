import React, { useEffect } from "react";
import { alumnaiPOAP, newBiePOAP, seniorPOAP, welcomePOAP } from "../MyPage";
import { rates } from "../../Navbar/Navbar";
import { BrowserProvider } from "ethers";
import { POAPUpgrade__factory } from "../../../typechain";

interface UpgradeGradeProps {
  poap: string;
}
const upgradeGrade = async (poap: string) => {
  const signer = await new BrowserProvider(window.ethereum).getSigner();
  const upgrade = POAPUpgrade__factory.connect(poap, signer);
  await upgrade.upgradeGrade();
};
export default function UpgradeGrade({ poap }: UpgradeGradeProps) {
  const onClick = async () => {
    upgradeGrade(poap);
  };

  return (
    <div>
      <button onClick={onClick}>Upgrade My POAP</button>
    </div>
  );
}
