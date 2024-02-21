import { useState, useRef, useEffect } from "react";

//ICONS
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddIcon from "@mui/icons-material/Add";

export default function TagInput({
  onChange,
  name,
  placeholder,
  options,
  type,
}) {
  const [tagsIs, setTagsIs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [intolerance, setIntolerance] = useState(options);

  const wrapperRef = useRef(null); // Skapa en ref

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    // Lägg till eventlyssnaren till dokumentet
    document.addEventListener("mousedown", handleClickOutside);

    // Rensa eventlyssnaren när komponenten avmonteras
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]); // Töm beroendelista betyder att detta bara körs vid montering och avmontering

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const tagInput = inputValue.trim();
      if (tagInput && !tagsIs.includes(tagInput)) {
        const newTags = [...tagsIs, tagInput];
        setTagsIs(newTags);
        onChange(newTags);
        setInputValue("");
      }

      setInputValue("");
    }
  };

  const handleChoice = (choice) => {
    const tagInput = choice.trim();
    console.log("choice: ", choice);

    const intoleranceExist = options.includes(choice);
    if (intoleranceExist) {
      const updatedOptions = options.filter(
        (option) => option !== choice && !tagsIs.includes(option)
      );
      setIntolerance(updatedOptions);
    }

    if (tagInput && !tagsIs.includes(tagInput)) {
      const newTags = [...tagsIs, tagInput];

      setTagsIs(newTags);
      onChange(newTags);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const deleteTag = (indexToRemove, tag) => {
    const newTags = tagsIs.filter((_, index) => index !== indexToRemove);
    setTagsIs(newTags);

    if (!intolerance.includes(tag)) {
      setIntolerance([...intolerance, tag]);
    }
  };

  return (
    <div className="">
      <label className="">
        <input
          type={type}
          data-role="taginput"
          data-tag-trigger="Space"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setShowOptions(true);
          }}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          className={` tag rounded-lg px-4 py-2 text-txtColortwo placeholder-txtInput text-txtColorTwo`}
        />
        {showOptions && (
          <div
            className="flex gap-2 flex-wrap py-2 px-3 mb-2 rounded-md bg-two"
            ref={wrapperRef}
          >
            {intolerance.map((option, index) => {
              return (
                <>
                  <span
                    key={index}
                    className="flex items-center gap-1 border-main border-2 py-1 px-2 rounded-md"
                    onClick={() => handleChoice(option)}
                  >
                    {option}
                    <AddIcon className="text-txtInput text-sm" />
                  </span>
                </>
              );
            })}
          </div>
        )}
      </label>

      <div className="flex w-full flex-wrap px-3">
        {tagsIs.length >= 1
          ? tagsIs.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="bg-main py-1 px-2 rounded-md text-white m-1 flex items-center gap-1"
                >
                  {tag}
                  <ClearOutlinedIcon
                    onClick={() => {
                      deleteTag(index, tag);
                    }}
                  />
                </span>
              );
            })
          : null}
      </div>
    </div>
  );
}
