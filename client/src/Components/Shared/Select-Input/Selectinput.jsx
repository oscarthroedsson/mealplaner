"use client";

import { useState } from "react";

//ICONS
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

/* eslint-disable react/prop-types */
export default function Selectinput({ onSelect, text, options }) {
  console.log("text: ", text);
  const [showDropdown, setShowDropDown] = useState(false);
  const [placeholder, setPlaceholder] = useState(text);

  return (
    <>
      {/* custom-select måstet ha custom width för MQ */}
      <div className="custom-select relative text-left grow">
        <button
          className="select-button bg-none border-2 border-[#616773] text-txtInput px-4 py-2 w-full flex justify-between items-center rounded-md m-0"
          role="combobox"
          aria-labelledby="select button"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="select-dropdown"
          onClick={() => {
            setShowDropDown((prevShowDropdow) => !prevShowDropdow);
          }}
        >
          <span className="selected-value text-base">{placeholder}</span>
          <span className={`material-icons-outlined ${showDropdown ? "rotate-180" : ""} text-green-500`}>
            <ArrowDropDownRoundedIcon className="text-2xl" />
          </span>
        </button>
        {showDropdown && (
          <ul
            className="select-dropdown absolute z-10 py-4 list-none w-full bg-two text-txtColor rounded-md mt-1 shadow-lg"
            role="listbox"
            id="select-dropdown"
          >
            {options.map((option, index) => {
              return (
                <>
                  <li
                    className="s w-full px-4 py-2 rounded-md hover:bg-three hover:text-main"
                    key={index}
                    role="option"
                    aria-selected={true}
                    value={option.value}
                    onClick={() => {
                      setPlaceholder(option.textContent);
                      setShowDropDown(false);
                      // Sends back the value
                      if (onSelect) {
                        onSelect(option.value);
                      }
                    }}
                  >
                    {option.textContent}
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
