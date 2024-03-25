import { EllipsisHorizontalCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function EllipsMenuButton({ callback }) {
  const [clicked, setClicked] = useState(true);
  function handleClick() {
    if (clicked) {
      setClicked(!clicked);
    } else {
      setClicked(!clicked);
    }
  }
  return (
    <>
      <div
        onClick={() => {
          handleClick();
        }}
        className="cursor-pointer text-slate-400 hover:text-slate-500"
      >
        {clicked ? (
          <EllipsisHorizontalCircleIcon
            className=" w-6 "
            onClick={() => {
              handleClick();
            }}
          />
        ) : (
          <XMarkIcon className="w-6" />
        )}
      </div>
      {!clicked && (
        <div className="absolute left-0 w-[80%] flex gap-4 divide-x-1 my-4 px-2  bg-two ">
          <p className="font-medium text-slate-500 hover:text-[#E6544D] cursor-pointer hover:underline hover: underline-offset-4">
            Delete
          </p>
          <div class="bg-slate-300 w-[1px] "></div>
          <p className="font-medium text-slate-500 hover:text-main cursor-alias hover:underline hover: underline-offset-4">
            Share
          </p>
        </div>
      )}
    </>
  );
}
