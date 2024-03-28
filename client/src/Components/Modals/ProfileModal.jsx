"use client";

/// react
import { useState, useMemo } from "react";

//functions
//! Måste läggas i en mapp i client
import { calculateEnergyIntake } from "../../Tools/Math/calculateCaloriNeed.js";
import { registerUser } from "../../Api/user.js";

//COMPONENTS
import Radiobutton from "../Shared/Radio-Input/Radiobutton.jsx";
import Textinput from "../Shared/Text-Input/Textinput.jsx";
import Numberinput from "../Shared/Number-Input/Numberinput.jsx";
import Selectinput from "../Shared/Select-Input/Selectinput.jsx";
import PrimButton from "../Shared/Buttons/PrimeButton.jsx";
import SecondaryButton from "../Shared/Buttons/SecondaryButton.jsx";

//CONTTEXT
import { useContext } from "react";
import WizardContext from "../../context/wizardContext.jsx";
import { storeCookieUser } from "../../config/cookies/cookie_config.js";
import { createMealplan } from "../../Api/mealpan_Api.js";

export default function ProfilModal() {
  const [isMale, setIsMale] = useState(false);
  const [useImperial, setUseImperial] = useState(false);
  const [firstNameIs, setFirstNameIs] = useState("");
  const [lastNameIs, setLastNameIs] = useState("");
  // const [heightIs, setHeightIs] = useState(0);
  const [ageIs, setAgeIs] = useState(0);
  const [weightIs, setWeightIs] = useState(0);
  const [emailIs, setEmailIs] = useState("");
  const [activityLevel, setActivityLevel] = useState(0);
  const [goalIs, setGoalIs] = useState("");
  const [getGoalTempo, setGetGoalTempo] = useState(0);
  const [feet, setFeet] = useState(0);
  const [centimeter, setCentimeter] = useState(0);
  const [inches, setInches] = useState(0);

  const { next } = useContext(WizardContext);

  const handleChangeMeasurement = (useImperial) => {
    setUseImperial(useImperial);
    setFeet(0);
    setInches(0);
    setCentimeter(0);
    setWeightIs(0);
  };

  const height = useMemo(() => {
    if (useImperial) {
      const heightInInches = feet * 12;
      return Number(heightInInches + inches);
    } else {
      return Number(centimeter);
    }
  }, [feet, inches, centimeter, useImperial]);

  async function handleClick() {
    // calculate eneryneed
    const { energyIntake, bmr } = await calculateEnergyIntake({
      weightIs,
      height,
      ageIs,
      activityLevel,
      getGoalTempo,
      isMale,
      useImperial,
    });
    console.log("ProfilModal | handleClick() | energyIntake:", energyIntake);
    console.log("ProfilModal | handleClick() | bmr:", bmr);

    //createing user
    const user = {
      isMale,
      useImperial,
      firstNameIs,
      emailIs,
      lastNameIs,
      height,
      ageIs,
      weightIs,
      activityLevel,
      goalIs,
      getGoalTempo,
      energyIntake,
      bmr,
    };

    const userData = await registerUser(user);
    console.log("ProfilModal | userData: ", userData);
    await storeCookieUser(userData.data);
    next();
  }

  return (
    <div className="">
      <div className="mb-10">
        <h1>Profil Information</h1>
        <p className="w-full md:max-w-96">
          To create your tailored meal plan, please share a bit about yourself with us!
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-y-8" // ska vara 40PX
      >
        <div className="">
          <div className="pb-2">
            <h3>Gender</h3>
          </div>
          <div className="">
            <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
              <div className="flex flex-col gap-y-2 w-full md:w-fit">
                <Radiobutton
                  onChange={() => {
                    setIsMale(true);
                  }}
                  checked={isMale}
                  name="gender"
                  text="Man"
                />
              </div>

              <div className="flex flex-col gap-y-2 w-full md:w-fit">
                <Radiobutton
                  onChange={() => {
                    setIsMale(false);
                  }}
                  checked={!isMale}
                  name="gender"
                  text="Woman"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="pb-2">
            <h3>Measurement Unit</h3>
          </div>
          <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
            <div className="flex flex-col gap-y-2 w-full md:w-fit">
              <Radiobutton
                onChange={() => {
                  handleChangeMeasurement(true);
                }}
                checked={useImperial}
                name="weightSystem"
                text="Imperial"
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full md:w-fit">
              <Radiobutton
                onChange={() => {
                  handleChangeMeasurement(false);
                }}
                checked={!useImperial}
                name="weightSystem"
                text="Metric"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="pb-2">
            <h3>Personal Info</h3>
          </div>

          <div className="flex flex-col gap-y-2 w-full md:w-fit">
            <div className="flex flex-col gap-y-2 flex-wrap  md:gap-x-2">
              <div className="flex gap-x-2">
                <Textinput
                  onChange={(e) => {
                    setFirstNameIs(e.target.value);
                  }}
                  type="text"
                  checked={firstNameIs}
                  name="Firstname"
                  placeholder="Firstname"
                />
                <Textinput
                  onChange={(e) => {
                    setLastNameIs(e.target.value);
                  }}
                  type="text"
                  checked={lastNameIs}
                  name="Lastname"
                  placeholder="Lastname"
                />
              </div>

              {useImperial === true ? (
                <div className="flex *:grow gap-x-2">
                  <Numberinput
                    onChange={(e) => {
                      setFeet(e.target.value);
                    }}
                    type="number"
                    checked={feet}
                    name="height"
                    placeholder="Feet"
                  />
                  <Numberinput
                    onChange={(e) => {
                      setInches(e.target.value);
                    }}
                    type="number"
                    checked={inches}
                    name="height"
                    placeholder="inches"
                  />
                </div>
              ) : (
                <Numberinput
                  onChange={(e) => {
                    console.log("height: ", e.target.value);
                    setCentimeter(e.target.value);
                  }}
                  type="number"
                  checked={height}
                  name="height"
                  placeholder="Height in cm"
                />
              )}
              <Textinput
                onChange={(e) => {
                  setEmailIs(e.target.value);
                }}
                type="email"
                checked={emailIs}
                placeholder="Email"
              />
            </div>

            <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
              <Numberinput
                onChange={(e) => {
                  console.log(e.target.value);
                  setAgeIs(Number(e.target.value));
                }}
                type="number"
                checked={ageIs}
                placeholder="Age"
              />

              <Numberinput
                onChange={(e) => {
                  console.log("e: ", e.target.value);
                  setWeightIs(e.target.value);
                }}
                type="number"
                checked={weightIs}
                placeholder={useImperial === true ? "Weight in lbs" : "Weight in kg"}
              />
            </div>

            <div className="w-full">
              <Selectinput
                onSelect={(selectedValue) => {
                  setActivityLevel(selectedValue);
                }}
                text="Choose Activity Level"
                options={[
                  {
                    textContent: "Lite eller ingen motion",
                    value: 1.2,
                  },
                  {
                    textContent: "Lätt motion (träning 1-3 dagar per vecka)",
                    value: 1.375,
                  },
                  {
                    textContent: "Medel motion (träning 3-5 dagar per vecka)",
                    value: 1.55,
                  },
                  {
                    textContent: "Tung motion (träning 6-7 dagar per vecka)",
                    value: 1.725,
                  },
                  {
                    textContent: "Mycket tung motion (2 gånger per dag, extra tungt)",
                    value: 1.9,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="pb-2">
            <h3>Goals</h3>
          </div>

          <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
            <Selectinput
              onSelect={(selectedGoal) => {
                console.log("selectedGoal: ", selectedGoal);
                setGoalIs(selectedGoal);
              }}
              text="Choose goal"
              options={[
                {
                  textContent: "weight loss",
                  value: "weightloss",
                },
                {
                  textContent: "weight gain",
                  value: "weightgain",
                },
                {
                  textContent: "stabile",
                  value: "stabile",
                },
              ]}
              name="goal"
              placeholder="Goal"
            />
            {goalIs == "stabile" || goalIs == "" ? null : (
              <Selectinput
                onSelect={(selectedTempo) => {
                  setGetGoalTempo(selectedTempo);
                }}
                text="Choose tempo"
                options={[
                  {
                    textContent: useImperial === true ? "1 pound week" : "0.5 kg week",
                    value: goalIs == "weightgain" ? 500 : -500,
                  },
                  {
                    textContent: useImperial === true ? "2 pound week" : "1 kg week",
                    value: goalIs == "weightgain" ? 1000 : -1000,
                  },
                ]}
                name="tempo"
                placeholder="Choose Tempo"
              />
            )}
          </div>
        </div>
        <div className="flex *:grow gap-x-2 gap-y-2 flex-wrap justify-between md:flex-row md:gap-x-2  ">
          <SecondaryButton
            textContent="Generate meal plan"
            href="#"
            onClick={async () => {
              //? check if this is true when mealplan is on place
              await createMealplan();
              // re-direct
            }}
          />
          <PrimButton
            textContent="Choose meal preference"
            href="#"
            onClick={() => {
              handleClick();
            }}
          />
        </div>
      </form>
    </div>
  );
}
