"use client";

import { useState } from "react";
import style from "./styleCheckbox.module.css";

export default function Radiobutton({ text, onChange, checked, name }) {
  // const [isChecked, setIsChecked] = useState(checked || false);

  return (
    <div className="w-full">
      <label
        className={`${
          checked
            ? "border-2 border-main bg-main text-white"
            : "border-2 border-[#616773] text-txtInput "
        } rounded-lg px-4 py-2 plabel flex justify-center w-full`}
      >
        <input
          checked={checked}
          onChange={onChange}
          className={`${style.CBinputEl} w-full  text-txtInput`}
          type="radio"
          name={name}
        />
        {text ? text : "No text"}
      </label>
    </div>
  );
}
