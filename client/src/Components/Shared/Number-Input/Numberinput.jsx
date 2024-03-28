export default function Numberinput({ onChange, checked, type, name, placeholder }) {
  return (
    <label>
      <input
        checked={checked}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        className={` rounded-lg px-4 py-2 w-full placeholder-txtInput text-txtColorTwo outline-none focus:outline-green-500 ring-offset-0`}
      />
    </label>
  );
}
