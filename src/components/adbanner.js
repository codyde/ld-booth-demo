
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { useState, useEffect } from "react";


export default function Adbanner() {
  const { adbanner } = useFlags()
  console.log(adbanner)
  const [cta, setCTA] = useState("Check out")
  const [academy, setacademy] = useState("LaunchDarkly Academy")
  const [maincss, setmaincss] = useState("text-white")


  useEffect(() => {
    console.log("setting CTAs")
    configure()
  }, [adbanner])

  async function configure() {
    console.log("Configuring")
    await setCTA(adbanner['cta'])
    await setmaincss(adbanner['maincss'])
  }

  const client = useLDClient()

  function handleClick() {
    console.log("sending client tracking to LD Experiment for CTA")
    client.track('Academy Clickthrough');
  }

  return (
    <div
      className={`p-2 ${maincss} items-center leading-none lg:rounded-full flex lg:inline-flex`}
      role="alert"
    >
      <span className="font-sohne mr-2 ml-2 text-left flex-auto">
        {cta}
        <a class="cta"
          href="https://academy.launchdarkly.com"
          target="_blank"
          className={`text-ldyellow`}
          onClick={handleClick.bind()}
        >
          {academy}
        </a>
      </span>
    </div>
  );
}
