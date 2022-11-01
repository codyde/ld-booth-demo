import React, { useEffect } from "react";
import QRCode from "./components/qrCode";
import "./App.css";
import { useFlags } from "launchdarkly-react-client-sdk";
import Login from "./components/login";
import ld from "./ld-white-wide.png";
import Connection from "./components/connection";
import Adbanner from "./components/adbanner";

function App() {
  const { login, bgstyle, qrcode, apidebug } = useFlags();
  const [bg, setbg] = React.useState();

  useEffect(() => {
    console.log("update to bg detected");
    setbg(bgstyle);
  }, [bgstyle]);

  console.log(bgstyle);

  return (
    <div className="App h-screen bg- grid xl:grid-cols-4 grid-cols-1 grid-rows-4 xl:grid-rows-3 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}>
      <div className="body grid xl:col-span-1 xl:col-start-1 xl:row-start-1 w-full xl:w-4/5 bg-black-4 place-items-center">
        <img src={ld} className="mx-auto max-h-30 px-8" alt="logo" />
      </div>
      <div className="body mx-auto grid xl:col-span-5 xl:col-start-1 xl:row-start-1 w-full bg-ldgray place-items-center h-1/5">
        <Adbanner />
        </div>
      {login ? (
        <header className="App-header mx-auto bg-ldgray shadow-2xl w-full xl:w-4/5 grid col-span-1 row-start-2 xl:col-start-2 xl:col-span-2">
          <Login />
        </header>
      ) : (
        <header className="App-header grid row-start-2 xl:row-start-2 xl:col-start-2 xl:col-span-2">
          <div className="body px-8 py-4 mb-5 w-4/5">
            <div className="text-2xl md:text-5xl xl:text-7xl font-audimat text-transparent bg-clip-text bg-gradient-to-br from-ldgdcol1 to-ldgdcol2">
              Innovate Faster,
            </div>
            <div className="text-2xl md:text-5xl xl:text-7xl">
              <p>
                <span className="font-audimat text-transparent bg-clip-text bg-gradient-to-br from-ldgdcol1 to-ldgdcol2">
                  Deploy Fearlessly.
                </span>
              </p>
            </div>
          </div>
        </header>
      )}
      {qrcode ? (
        <div className="body grid mx-auto row-start-4 xl:col-span-1 xl:col-start-4 xl:row-start-1 bg-black-4 place-content-center">
          <QRCode />
        </div>
      ) : null}
      {apidebug ? (
        <div className="mx-auto xl:col-span-2 row-start-3 w-full xl:w-4/5 xl:col-start-2 bg-black-4">
          <Connection />
        </div>
      ) : null}
    </div>
  );
}

export default App;
