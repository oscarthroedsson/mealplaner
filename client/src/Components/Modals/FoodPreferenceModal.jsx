import { useState, useContext } from "react";

//COMPONENTS
import Radiobutton from "../Shared/Radio-Input/Radiobutton.jsx";
import Selectinput from "../Shared/Select-Input/Selectinput.jsx";
import Taginput from "../Shared/Tag-Input/Taginput.jsx";
import SecondaryButton from "../Shared/Buttons/SecondaryButton.jsx";
import PrimaryButton from "../Shared/Buttons/PrimeButton.jsx";

//FOOD DATA
//! ska läggas i data
import { intolerances } from "../../assets/data/intolerances.js";
import { diets } from "../../assets/data/diets.js";

// FUNCTIONS
import { registerFoodPreference } from "../../Api/foodPreference.js";
import { getCookieUser } from "../../config/cookies/cookie_config.js";

//CONTEXT
import WizardContext from "../../context/wizardContext.jsx";
import { createMealplan } from "../../Api/mealpan_Api.js";

export default function FoodPreferenceModal() {
  const [prefMealModels, setPrefMealModels] = useState("Plate Modal");
  const [mealsPerDayIs, setMealsPerDayIs] = useState(4);
  const [prefCookingTimeIs, setPrefCookingTimeIs] = useState({});
  const [tagsIs, setTagsIs] = useState([]);

  const { onClose } = useContext(WizardContext);
  const numOfMeals = [1, 2, 3, 4, 5];

  async function addFoodPrefToUser() {
    //todo try/catch på att hämta användare

    try {
      //
      const { id } = await getCookieUser();
      console.log("id: ", id);

      const foodPreference = {
        userId: id,
        pref_MealModels: prefMealModels,
        meals_PerDayIs: mealsPerDayIs,
        pref_CookingTimeIs: prefCookingTimeIs,
        intolerances: tagsIs,
      };
      console.log("FoodPreferenceModal | foodPreference: ", foodPreference);

      if (id) {
        const addedfoodpref = await registerFoodPreference(foodPreference);
        console.log("FoodPreferenceModal | addedfoodpref: ", addedfoodpref);

        onClose();
      } else {
        // todo | När du har aktiverat toaster så lägg ERROR här med try/catch
        console.log("id var null");
      }
      //
    } catch (err) {
      console.log("User allready exist");
    }
  }

  return (
    <>
      <div className="max-w-xl">
        <div className="mb-10">
          <h1>Food Preference</h1>
          <p className="w-full md:max-w-96">
            To create your tailored meal plan, please share a bit about yourself
            with us!
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
              <h3>Plate modal</h3>
              <p>
                There is no model that is better than others. The best one is
                the one that fits you and your daily life the best, ensuring
                continuity and sustainability in your diet.
              </p>
            </div>
            <div className="">
              <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
                {diets.map((modal, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex flex-col gap-y-2 w-full md:w-fit"
                      >
                        <Radiobutton
                          onChange={() => {
                            setPrefMealModels(modal.diet);
                          }}
                          checked={modal.diet === prefMealModels}
                          name="food modal"
                          text={modal.diet}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="pb-2">
              <h3>Meals per day</h3>
              <p>
                Fewer meals per day mean larger portions, while more meals lead
                to smaller portions on your plate. You can adjust later if you
                find the portions too large or too small.
              </p>
            </div>
            <div className="">
              <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
                {numOfMeals.map((num, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex flex-col gap-y-2 w-full md:w-fit"
                      >
                        <Radiobutton
                          onChange={() => {
                            setMealsPerDayIs(num);
                          }}
                          checked={mealsPerDayIs === num}
                          name="NumOfMeals"
                          text={num.toString()}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="pb-2">
              <h3>Pref cooking time</h3>
              <p>
                The time you can commit to cooking is a key aspect of your meal
                plan. Choose a time frame that you are comfortable with, one
                that fits seamlessly into your daily routine.
              </p>
            </div>
            <div className="">
              <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
                <div className="flex flex-col gap-y-2 w-full md:w-fit">
                  <Selectinput
                    onSelect={(selectedTime) => {
                      setPrefCookingTimeIs({
                        min: selectedTime.min,
                        max: selectedTime.max,
                      });
                    }}
                    text="Choose pref cooking time"
                    options={[
                      {
                        textContent: "10 to 20 min",
                        value: { min: 10, max: 20 },
                      },
                      {
                        textContent: "20 to 30 min",
                        value: { min: 20, max: 30 },
                      },
                      {
                        textContent: "30 to 40 min",
                        value: { min: 30, max: 40 },
                      },
                      {
                        textContent: "40 to 50 min",
                        value: { min: 40, max: 50 },
                      },
                      {
                        textContent: "1 hour+",
                        value: { min: 60, max: "" },
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="pb-2">
              <h3>Allergies</h3>
              <p>
                Please inform us about any allergies or ingredients you cannot
                or do not wish to include in your meals.
              </p>
            </div>
            <div className="">
              <div className="flex flex-col gap-y-2 flex-wrap md:flex-row md:gap-x-2">
                <div className="flex flex-col gap-y-2 w-full md:w-fit">
                  <Taginput
                    type="text"
                    placeholder="Add allergies"
                    onChange={(event) => {
                      setTagsIs(event);
                    }}
                    options={intolerances}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex *:grow gap-x-2 gap-y-2 flex-wrap justify-between md:flex-row md:gap-x-2  ">
            <SecondaryButton
              textContent="Save for later"
              href="#"
              onClick={() => {
                console.log("secondary btn pressed");
              }}
            />
            <PrimaryButton
              textContent="Genereate Mealplan"
              href="#"
              onClick={async () => {
                console.log("prime btn pressed");
                await addFoodPrefToUser();
                await createMealplan();
                // re-direct to mealplan
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
