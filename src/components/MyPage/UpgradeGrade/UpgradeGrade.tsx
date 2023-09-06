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
    <section>
      <button
        className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        onClick={onClick}
      >
        Upgrade My POAP
      </button>
    </section>
  );
}
