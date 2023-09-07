import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONFIGS } from "../../config/address";
import { JsonRpcProvider } from "ethers";
import {
  AdminBV,
  AdminBV__factory,
  AlumnaiPOAP,
  AlumnaiPOAP__factory,
  Attendance,
  Attendance__factory,
  NewBiePOAP,
  NewBiePOAP__factory,
  SeniorPOAP,
  SeniorPOAP__factory,
  WelcomePOAP,
  WelcomePOAP__factory,
} from "../../typechain";
import { rates } from "../Navbar/Navbar";
import Mint from "./Mint/Mint";
import UpgradeGrade from "./UpgradeGrade/UpgradeGrade";
import AdminPage from "./AdminPage/AdminPage";
import Ranking from "./Ranking/Ranking";
import Attend from "./Attendance/Attendance";
const rpcUrl = CONFIGS[1][137].rpcUrls;
const provider = new JsonRpcProvider(rpcUrl);
const adminPOAP = AdminBV__factory.connect(
  CONFIGS[1][137].admin,
  provider
) as AdminBV;
const alumnaiPOAP = AlumnaiPOAP__factory.connect(
  CONFIGS[1][137].alumnai,
  provider
) as AlumnaiPOAP;
const seniorPOAP = SeniorPOAP__factory.connect(
  CONFIGS[1][137].senior,
  provider
) as SeniorPOAP;
const newBiePOAP = NewBiePOAP__factory.connect(
  CONFIGS[1][137].newbie,
  provider
) as NewBiePOAP;
const welcomePOAP = WelcomePOAP__factory.connect(
  CONFIGS[1][137].welcome,
  provider
) as WelcomePOAP;
export const attendContract = Attendance__factory.connect(
  CONFIGS[1][137].attendance!,
  provider
) as Attendance;

export const rateToEmoji = (rate: string) => {
  if (rate === rates[0]) {
    return "👶";
  } else if (rate === rates[1]) {
    return "👦";
  } else if (rate === rates[2]) {
    return "👨";
  } else if (rate === rates[3]) {
    return "👴";
  }
};

export default function MyPage() {
  const { state } = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState("");
  const [rate, setRate] = useState<string>("");
  const [poap, setPoap] = useState<string>("");
  const [point, setPoint] = useState<string>("");
  const [lock, setlock] = useState<boolean>(true);
  const balaceOfPOAP = async (account: string) => {
    if (account !== null) {
      if ((await alumnaiPOAP.balanceOf(account!)) === 1n) {
        setRate(rates[3]);
        setTokenId((await alumnaiPOAP.ownerToTokenId(account)).toString());

        setPoap(CONFIGS[1][137].alumnai);
        setPoint((await alumnaiPOAP.myPoint(account)).toString());
      } else if ((await seniorPOAP.balanceOf(account!)) === 1n) {
        setRate(rates[2]);
        setTokenId((await seniorPOAP.ownerToTokenId(account)).toString());
        setPoap(CONFIGS[1][137].senior);
        setPoint((await seniorPOAP.myPoint(account)).toString());
      } else if ((await newBiePOAP.balanceOf(account!)) === 1n) {
        setRate(rates[1]);
        setTokenId((await newBiePOAP.ownerToTokenId(account)).toString());
        setPoap(CONFIGS[1][137].newbie);
        setPoint((await newBiePOAP.myPoint(account)).toString());
      } else if ((await welcomePOAP.balanceOf(account!)) === 1n) {
        setRate(rates[0]);
        setTokenId((await welcomePOAP.ownerToTokenId(account)).toString());
        setPoap(CONFIGS[1][137].welcome);
        setPoint((await welcomePOAP.myPoint(account)).toString());
      } else {
        setRate(rates[0]);
      }
      if ((await adminPOAP.admins(account!)) === true) {
        setIsAdmin(true);
      }
    }
    setlock(await attendContract.lock());
  };

  useEffect(() => {
    balaceOfPOAP(state.account);
    console.log(lock);
  }, []);

  return (
    <div className="bg-white text-black p-8 rounded-lg ">
      {tokenId !== "" ? (
        <div>
          <div className="bg-white text-black p-8 rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] mb-6">
            <h1 className="text-4xl font-light  mb-6">🙌 My POAP </h1>
            <p className="text-lg font-light mb-4">
              1️⃣ My Token ID : {tokenId}
            </p>
            <p className="text-lg font-light mb-4">
              2️⃣ My Point: {point === "" ? "0" : point}
            </p>
            <p className="text-lg font-light mb-4">
              3️⃣ Rate: {rateToEmoji(rate)}
            </p>
            <div className="mt-8 flex space-x-6">
              {poap !== "" && <UpgradeGrade poap={poap} />}
              <Attend rate={rate} lock={lock} />
            </div>
          </div>
          {isAdmin && <AdminPage lock={lock} setlock={setlock} />}
          <Ranking />
        </div>
      ) : (
        <Mint />
      )}
    </div>
  );
}
