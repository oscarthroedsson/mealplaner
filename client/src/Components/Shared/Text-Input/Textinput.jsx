export default function TextInput({ type, label, name, placeholder, checked, onChange }) {
  return (
    <label className="">
      {label ? label : null}
      <input
        name={name ? name : ""}
        checked={checked}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={` rounded-lg px-4 py-2 w-full text-txtColortwo placeholder-txtInput text-txtColorTwo focus:bg-white  focus:outline-main focus:outline-2`}
      />
    </label>
  );
}
