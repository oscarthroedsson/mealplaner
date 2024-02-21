"use client";

export default function TextInput({ onChange, checked, type, placeholder }) {
  return (
    <label className="">
      <input
        checked={checked}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={` rounded-lg px-4 py-2 w-full text-txtColortwo placeholder-txtInput text-txtColorTwo`}
      />
    </label>
  );
}
