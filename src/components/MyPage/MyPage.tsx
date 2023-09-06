import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONFIGS } from "../../config/address";
import { JsonRpcProvider } from "ethers";
import {
  AdminBV,
  AdminBV__factory,
  AlumnaiPOAP,
  AlumnaiPOAP__factory,
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

export default function MyPage() {
  const { state } = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState("");
  const [rate, setRate] = useState<string>("");
  const [poap, setPoap] = useState<string>("");
  const [point, setPoint] = useState<string>("");

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
  };

  useEffect(() => {
    balaceOfPOAP(state.account);
  });

  return (
    <div>
      {tokenId !== "" ? (
        <div>
          <h1>My Page</h1>
          <p>TokenId : {tokenId}</p>
          <p>My Point : {point === "" ? "0" : point}</p>
          <p>Rate : {rate}</p>
          {poap !== "" ? <UpgradeGrade poap={poap} /> : null}
          <p>{isAdmin ? <AdminPage /> : null} </p>
          <Ranking />
        </div>
      ) : (
        <Mint />
      )}
    </div>
    // <p>{state.account}</p>
  );
}
