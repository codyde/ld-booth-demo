import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLDClient } from "launchdarkly-react-client-sdk";
import Toasts from "./toaster";
import ls from 'local-storage';
import getUserId from "../utils/getUserId";

export default function Login() {
  const LDClient = useLDClient();

  const [userState, setUserState] = useState({
    username: "",
  });

  const [loginState, setLoginState] = useState(true)

  async function setCurrLDUser() {
    const obj = await LDClient.getUser();
    return obj;
  }

  const submitUser = async (e) => {
    e.preventDefault();
    setLoginState(false)
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
    toast.success("Your LaunchDarkly user is " + userState.username);
    console.log("The updated user is: " + lduser.key);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };
 
  const clearUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    setLoginState(true)
    await ls.remove('LD_User_Key')
    const id = getUserId()
    lduser.key = id;
    await LDClient.identify(lduser);
    toast.success("User has been cleared");
    const response = await fetch(
      window.location.protocol +
          "//" +
          window.location.host +
          "/logout", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }
    )
    console.log(response)
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
            {loginState ? (
              <input
                className="text-base xl:text-2xl bg-ldinput border-lddblue border-0 border-b-4  text-white flex-grow px-2 box-content h-8 w-8 xl:h-16 xl:w-16"
                type="input"
                id="username"
                placeholder="Username"
                value={userState.username}
                onChange={handleChange}
              />):null}
          </div>
          <div className="flex items-center pt-5 px-1 py-3 xl:pt-10 xl:px-2 xl:py-6 space-x-4 mx-auto submission">
            { loginState ? (
              <button
                type="submit"
                id="submission"
                className="bg-lddblue mx-auto text-white text-base xl:text-2xl px-2 py-1 xl:px-4 xl:py-2 w-1/2 "
                onClick={submitUser.bind(userState)}
              >
                Submit
              </button>
            ):null}
            <button
              type="submit"
              id="clear"
              className="bg-ldred mx-auto text-white text-base xl:text-2xl px-2 py-1 xl:px-4 xl:py-2 w-1/2 "
              onClick={clearUser.bind()}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
