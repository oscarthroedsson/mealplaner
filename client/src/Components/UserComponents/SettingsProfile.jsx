import { useState, useContext, useEffect, useSyncExternalStore } from "react";
import ProfileContext from "../../context/userContext";
import Radiobutton from "../Shared/Radio-Input/Radiobutton";
import TextInput from "../Shared/Text-Input/Textinput";
import Numberinput from "../Shared/Number-Input/Numberinput";
import SelectInput from "@mui/material/Select/SelectInput";
import { activityLevels } from "../../assets/data/activity";
import Selectinput from "../Shared/Select-Input/Selectinput";

export default function SettingsProfile() {
  const { user, mealplans } = useContext(ProfileContext);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastname] = useState(user.last_name);
  const [age, setAge] = useState(user.age);
  const [height, setHeight] = useState(user.height);
  const [email, setEmail] = useState(user.email);
  const [weight, setWeight] = useState(user.weight);
  const [gender, setGender] = useState(() => {
    return user.isMale ? "Male" : "Female";
  });
  const [useImperial, setUseImperial] = useState(user.useImperial);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);

  function cmToFeetAndInches() {
    let totalHeightInches = height / 2.54;
    let heightFeet = totalHeightInches / 12;
    let remainingInches = totalHeightInches - heightFeet * 12;

    console.log("totalHeightInches :", totalHeightInches);
    console.log("heightFeet :", heightFeet);
    console.log("remainingInches :", remainingInches);

    // we skip inchs that are 0. somthing
    if (remainingInches < 1) {
      remainingInches = 0;
    }

    setFeet(heightFeet);
    setInches(remainingInches);
    setHeight(totalHeightInches);
  }

  function feetAndInchesToCm() {
    console.log("feet: ", feet);
    console.log("inchs: ", inches);
    console.log("height: ", height);

    const feetToCm = Number(feet) * 30.48;
    console.log("feetToCm: ", feetToCm);

    const inchesToCm = Number(inches) * 2.54;
    console.log("inchesToCm: ", inchesToCm);

    const totalCm = feetToCm + inchesToCm;
    console.log("totalCm: ", totalCm);

    setHeight(totalCm);
  }

  // Funktion för att konvertera kg till lbs
  function kgToLbs() {
    console.log("kgToLbs | weight: ", weight);

    const weightInLbs = Number(weight) * 2.20462;

    console.log("kgToLbs | weightInLbs: ", weightInLbs);

    setWeight(weightInLbs);

    console.log("kgToLbs | after weight: ", weight);
  }

  // Funktion för att konvertera lbs till kg
  function lbsToKg() {
    console.log("lbsToKg | weight: ", weight);
    const weightInKg = Number(weight) / 2.20462;
    console.log("kgToLbs | weightInKg: ", weightInKg);
    setWeight(weightInKg);

    console.log("lbsToKg | after weight: ", weight);
  }

  function handleChange(totalInches) {
    // if user change from metric to imperial but dont add any height, we reset till metric.
    if ((useImperial && feet === 0) || (!useImperial && height === 0)) {
      setUseImperial(user.useImperial);
      setHeight(user.height);
    }

    console.log({
      firstName,
      lastName,
      age,
      height: useImperial ? totalInches : height,
      email,
      weight,
      gender,
      useImperial,
    });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
          {/* Profile settings */}
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Gender
            </label>
            <div className="mt-2">
              {edit ? (
                <div className="grid grid-cols-2 gap-x-2">
                  <Radiobutton
                    onChange={() => {
                      setGender(!gender);
                    }}
                    checked={gender}
                    name="gender"
                    text="Male"
                  />
                  <Radiobutton
                    onChange={() => {
                      setGender(!gender);
                    }}
                    checked={!gender}
                    name="gender"
                    text="Female"
                  />
                </div>
              ) : (
                <p>{user.isMale ? "Male" : "Female"}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Metrics
            </label>
            <div className="mt-2">
              {edit ? (
                <div className="grid grid-cols-2 gap-x-2">
                  <Radiobutton
                    onChange={() => {
                      setUseImperial(!useImperial);
                      console.log("Metric | useImperial", useImperial);
                      feetAndInchesToCm();
                      lbsToKg();
                    }}
                    checked={!useImperial}
                    name="measurement"
                    text="Metric"
                  />
                  <Radiobutton
                    onChange={() => {
                      setUseImperial(!useImperial);
                      console.log("Imperial | useImperial", useImperial);
                      cmToFeetAndInches();
                      kgToLbs();
                    }}
                    checked={useImperial}
                    name="measurement"
                    text="Imperial"
                  />
                </div>
              ) : (
                <p>{useImperial ? "Imperial" : "Metric"}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2 ">
              {edit ? (
                <TextInput
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  name="firstname"
                  placeholder={firstName}
                />
              ) : (
                <p className="first-letter:uppercase">{firstName}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>

            <div className="mt-2">
              {edit ? (
                <TextInput
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  type="text"
                  name="lastname"
                  placeholder={lastName}
                />
              ) : (
                <p className="first-letter:uppercase">{lastName}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Age
            </label>
            <div className="mt-2">
              {edit ? (
                <Numberinput
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  type="number"
                  checked={age}
                  name="age"
                  placeholder={age}
                />
              ) : (
                <p>{age}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Height
            </label>
            <div className="mt-2">
              {edit ? (
                useImperial ? (
                  <div className="grid grid-cols-2 gap-x-2">
                    <Numberinput
                      onChange={(e) => {
                        setFeet(e.target.value);
                      }}
                      type="number"
                      checked={height}
                      name="height"
                      placeholder={Math.floor(feet)}
                    />
                    <Numberinput
                      onChange={(e) => {
                        setInches(e.target.value);
                      }}
                      type="number"
                      checked={height}
                      name="height"
                      placeholder={Math.floor(inches)}
                    />
                  </div>
                ) : (
                  <Numberinput
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                    type="number"
                    checked={height}
                    name="height"
                    placeholder={`${Math.floor(height)} cm`}
                  />
                )
              ) : (
                <p>
                  {Math.floor(height)}
                  {useImperial ? " inch" : " cm"}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1s">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Weight
            </label>
            <div className="mt-2">
              {edit ? (
                useImperial ? (
                  <>
                    <Numberinput
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                      type="number"
                      checked={weight}
                      name="weight"
                      placeholder={`${Math.floor(weight)} ${useImperial ? " lbs" : " kg"}`}
                    />
                  </>
                ) : (
                  <Numberinput
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                    type="number"
                    checked={weight}
                    name="weight"
                    placeholder={`${weight} ${useImperial ? " lbs" : " kg"}`}
                  />
                )
              ) : (
                <p>
                  {Math.floor(weight)}
                  {useImperial ? " lbs" : " kg"}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              {edit ? (
                <TextInput
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  name="email"
                  placeholder={email}
                />
              ) : (
                <p>{email}</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Activity level
            </label>
            <div className="mt-2">
              {edit ? (
                <Selectinput onSelect={() => {}} text="aktivitet" options={activityLevels} />
              ) : (
                <p className="first-letter:uppercase">Light exercise</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {edit ? (
              <button
                onClick={() => {
                  setEdit(false);

                  handleChange();
                }}
                type="submit"
                className="rounded-md bg-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
