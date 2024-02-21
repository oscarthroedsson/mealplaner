export default function Numberinput({
  onChange,
  checked,
  type,
  name,
  placeholder,
}) {
  // const [isChecked, setIsChecked] = useState(checked || false);

  return (
    <label>
      <input
        checked={checked}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        className={` rounded-lg px-4 py-2 w-full placeholder-txtInput text-txtColorTwo`}
      />
    </label>
  );
}
