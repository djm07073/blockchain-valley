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
      <button className="" onClick={onClick}>
        Upgrade My POAP
      </button>
    </div>
  );
}
