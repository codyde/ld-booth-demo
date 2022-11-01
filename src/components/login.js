import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLDClient } from "launchdarkly-react-client-sdk";
import Toasts from "./toaster";
import ls from 'local-storage';

export default function Login() {
  const LDClient = useLDClient();

  const [userState, setUserState] = useState({
    username: "",
  });

  const [loginButton, setLoginButton] =  useState(true)

  async function setCurrLDUser() {
    const obj = await LDClient.getUser();
    return obj;
  }

  const submitUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    lduser.key = userState.username;
    await ls.remove('LD_User_Key')
    await ls.set('LD_User_Key', userState.username)
    await LDClient.identify(lduser);
    const response = await fetch(
      window.location.protocol +
          "//" +
          window.location.host +
          "/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(lduser)
          }
    )
    console.log(response.json())
    LDClient.track("userLogin", { customProperty: userState.username });
    toast.success("Your LaunchDarkly user is " + userState.username);
    setLoginButton(false)
    console.log("The updated user is: " + lduser.key);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };
 

  const clearUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    lduser.key = "anonymous";
    await ls.remove('LD_User_Key')
    await ls.set('LD_User_Key', lduser.key)
    await LDClient.identify(lduser);
    setLoginButton(true)
    LDClient.track("userClear", { customProperty: userState.username });
    toast.success("User has been cleared");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="">
      <Toasts />
      <div className={` p-2 px-3 xl:p-4 xl:px-7 2xl:px-14 w-full`}>
        <div className="text-2xl xl:text-5xl py-5 font-audimat">Login with your username</div>
        <form>
          <div className="flex overflow-hidden px-2 py-1 justify-between">
            <input
              className="text-base xl:text-2xl bg-ldinput border-lddblue border-0 border-b-4  text-white flex-grow px-2 box-content h-8 w-8 xl:h-16 xl:w-16"
              type="input"
              id="username"
              placeholder="Username"
              value={userState.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center pt-5 px-1 py-3 xl:pt-10 xl:px-2 xl:py-6 space-x-4 mx-auto submission">
            {loginButton ? (
            <button
              type="submit"
              id="submission"
              className="bg-lddblue mx-auto text-white text-base xl:text-2xl px-2 py-1 xl:px-4 xl:py-2 xl:w-1/2 "
              onClick={submitUser.bind(userState)}
            >
              Submit
            </button>
            ):(    
            <button
              type="submit"
              id="clear"
              className="bg-ldred mx-auto text-white text-base xl:text-2xl px-2 py-1 xl:px-4 xl:py-2 xl:w-1/2 "
              onClick={clearUser.bind()}
            >
              Clear
            </button>)}
          </div>
        </form>
      </div>
    </div>
  );
}
