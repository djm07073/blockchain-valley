import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
export async function checkCorrectChainId() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  console.log(chainId);
  return chainId === "0x89";
}
function App() {
  const [account, setAccount] = useState<string>("");
  const [chainId, setchainId] = useState<number>(0);

  return (
    <>
      <Navbar
        account={account}
        setAccount={setAccount}
        chainId={chainId}
        setchainId={setchainId}
      />
      <Outlet />
    </>
  );
}

export default App;
