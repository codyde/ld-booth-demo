import React, { useState, useEffect } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";



export default function Spacepicker() {
  const { planet } = useFlags();
  
  async function submitPlanet() {
    console.log(planet)
  }
  
  return (
    <div className="flex mx-auto w-full h-3/5 space-x-4">
      <div
        className="grid grid-cols-1 xl:grid-cols-2 mx-auto justify-center items-center bg-ldinput shadow-2xl py-4 px-4 xl:py-8 xl:px-8 w-full"
      >
        <div>
          <h1 className="font-sohne text-ldgraytext text-base px-2 lg:text-3xl">
            Pick Your Planet 
          </h1>
        </div>
        <div className="grid py-4">
        <button
        className="bg-lddblue text-white font-sohne text-base xl:text-xl uppercase px-3 py-1 xl:px-6 xl:py-3 ease-linear transition-all duration-150"
        type="button"
        onClick={submitPlanet.bind()}
      >
        {planet}
      </button>
          </div>
      </div>
    </div>
  );
}
