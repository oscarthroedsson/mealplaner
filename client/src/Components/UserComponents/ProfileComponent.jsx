import { useState } from "react";

import SettingsProfile from "./SettingsProfile.jsx";
import SettingsActivity from "./SettingsActivity.jsx";
import SettingsFoodPreference from "./SettingsFoodPrefrence.jsx";
import SettingsIntegrations from "./SettingsIntegrations.jsx";

// todo | Look like shit on 768px, 976px,

export function ProfileComponent() {
  const [activeWindow, setActiveWindow] = useState("profile");
  let children;

  function handleClick(window) {
    setActiveWindow(window);
  }

  switch (activeWindow) {
    case "profile":
      children = <SettingsProfile />;
      break;
    case "activity":
      children = <SettingsActivity />;
      break;
    case "foodPreference":
      children = <SettingsFoodPreference />;
      break;
    case "integrations":
      children = <SettingsIntegrations />;
      break;
    default:
      children = null;
  }

  return (
    <>
      <div className="w-full">
        <div className=" md:col-start-2 col-span-12 md:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 py-6 mx-auto">
          <div className="md:p-4 col-span-6 md:col-span-2 ">
            {/* Menu start */}
            <div className="grid grid-cols-4 justify-items-center md:justify-items-start border-b-2 pb-2">
              {/* Personal Info */}
              <div
                onClick={() => {
                  handleClick("profile");
                }}
                className={`md:col-span-4 group relative flex items-center items-left gap-x-6 rounded-lg py-3 hover:p-3 text-sm leading-6 hover:bg-slate-50`}
              >
                <div className="text-center flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md mx-auto md:mx-0">
                  <svg
                    className="mx-auto items-center justify-center h-6 w-6 text-gray-600 group-hover:text-main"
                    aria-hidden="true"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-auto hidden md:block">
                  <p href="#" className="block font-semibold text-gray-900">
                    Personal Information
                    <span className="absolute inset-0"></span>
                  </p>
                  {/* <p className="mt-1 text-gray-600">Get a better understanding of your traffic</p> */}
                </div>
              </div>

              <div
                onClick={() => {
                  handleClick("activity");
                }}
                className="md:col-span-5 group relative flex items-center items-left justify-left gap-x-6 rounded-lg py-3 hover:p-3 text-sm leading-6 hover:bg-gray-50"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md  mx-auto md:mx-0">
                  <svg
                    className="h-6 w-6 text-gray-600 group-hover:text-main"
                    aria-hidden="true"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-auto  hidden md:block">
                  <p href="#" className="block font-semibold text-gray-900">
                    Physical Activity
                    <span className="absolute inset-0"></span>
                  </p>
                  {/* <p className="mt-1 text-gray-600">Speak directly to your customers</p> */}
                </div>
              </div>

              <div
                onClick={() => {
                  handleClick("foodPreference");
                }}
                className="md:col-span-5 group relative flex items-center gap-x-6 rounded-lg py-3 hover:p-3 text-sm leading-6 hover:bg-gray-50"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md  mx-auto md:mx-0">
                  <svg
                    className="h-6 w-6 text-gray-600 group-hover:text-main"
                    aria-hidden="true"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-auto  hidden md:block">
                  <p href="#" className="block font-semibold text-gray-900">
                    Food Prefrence
                    <span className="absolute inset-0"></span>
                  </p>
                  {/* <p className="mt-1 text-gray-600">Your customers’ data will be safe and secure</p> */}
                </div>
              </div>

              <div
                onClick={() => {
                  handleClick("integrations");
                }}
                className=" md:col-span-5 group relative flex items-center gap-x-6 rounded-lg py-3 hover:p-3 text-sm leading-6 hover:bg-gray-50 "
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md  mx-auto md:mx-0">
                  <svg
                    className="h-6 w-6 text-gray-600 group-hover:text-main"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <div className="flex-auto  hidden md:block">
                  <p className="clicked:text-green-200 block font-semibold text-gray-900">
                    Integrations
                    <span className="absolute inset-0"></span>
                  </p>
                  {/* <p className="mt-1 text-gray-600">Connect with third-party tools</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* Menu ends */}
          {/* Display settings start */}
          <div className=" col-span-6 md:col-span-4 pl-10">
            {/* Display settings here */}
            {children}
          </div>
          {/* Display settings ends */}
        </div>
      </div>
    </>
  );
}
