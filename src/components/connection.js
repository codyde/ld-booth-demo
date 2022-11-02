import React, { useState, useEffect } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import Modal from "./modal";


export default function Connection() {
  const { dbinfo } = useFlags();
  const [api1, setapi1] = useState("text-ldred");
  const [api1loc, setapi1loc] = useState("UNKNOWN");
  
  async function queryAPI() {
    const ENDPOINT2 =
    window.location.protocol + "//" + window.location.host + "/health";
    const response = await fetch(ENDPOINT2);
    const data = await response.json();
    console.log(data)
    if (response.status !== 200) {
      setapi1("text-ldred");
    } else {
      setapi1("text-ldyellow");
      setapi1loc(data.location);
    }
  }

  useEffect(() => {
    queryAPI();
    console.log("running useeffect");
  }, [dbinfo]);

  return (
    <div className="flex mx-auto w-full h-3/5 space-x-4">
      <div
        className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center bg-ldinput shadow-2xl py-4 px-4 xl:py-8 xl:px-8 w-full"
      >
        <div>
          <h1 className="font-sohne text-ldgraytext text-base px-2 lg:text-3xl">
            Connected to the <span className={`${api1}`}>{api1loc.toUpperCase()}</span> database 
          </h1>
        </div>
        <div className="grid py-4">
            <Modal dbDetails={dbinfo} />
          </div>
      </div>
    </div>
  );
}
