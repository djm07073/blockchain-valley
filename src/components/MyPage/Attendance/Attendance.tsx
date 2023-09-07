import { Attendance__factory } from "../../../typechain";
import { CONFIGS } from "../../../config/address";
import { BrowserProvider } from "ethers";
import { Signer } from "ethers";
import { rates } from "../../Navbar/Navbar";

export const rateToType = (rate: string) => {
  if (rate === rates[0]) {
    return 0;
  } else if (rate === rates[1]) {
    return 1;
  } else if (rate === rates[2]) {
    return 2;
  } else if (rate === rates[3]) {
    return 3;
  }
};

interface AttendanceProps {
  rate: string;
  lock: boolean;
}

export default function Attend({ rate, lock }: AttendanceProps) {
  const handleAttend = async () => {
    const signer: Signer = await new BrowserProvider(
      window.ethereum
    ).getSigner();
    const attend = Attendance__factory.connect(
      CONFIGS[1][137].attendance!,
      signer
    );
    if (rate) {
      await attend.attend(rateToType(rate)!).then((tx) => tx.wait());
    }
  };

  return (
    <div>
      {lock ? (
        <div className="bg-slate-300 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          <button> Attendance Locked</button>
        </div>
      ) : (
        <div className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          <button onClick={handleAttend}> Attendance </button>
        </div>
      )}
    </div>
  );
}
