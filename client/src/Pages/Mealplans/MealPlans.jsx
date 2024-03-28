// functions

import { useEffect, useState, useContext } from "react";

// icons // images
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// CONTEXT
import ProfileContext from "../../context/userContext";

// Components
import PrimeButton from "../../Components/Shared/Buttons/PrimeButton.jsx";
import SecondaryButton from "../../Components/Shared/Buttons/SecondaryButton.jsx";
import { getCookieUser } from "../../config/cookies/cookie_config.js";
import { destroyMealplan, getMealplans } from "../../Api/mealpan_Api.js";
import { EllipsMenuButton } from "../../Components/Shared/Buttons/iconButtons/EllipsMenuButton.jsx";
import { ProfileComponent } from "../../Components/UserComponents/ProfileComponent.jsx";

export default function MealPlans() {
  const { user, mealplans } = useContext(ProfileContext);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  function viewMealplan() {
    console.log("want to view mealplan");
  }

  async function deleteMealplan(mealplanId) {
    if (mealplanId) {
      await destroyMealplan(mealplanId, user.id).then(() => {
        mealplans.filter((mealplan) => mealplan._id !== mealplanId);
      });
    }
  }

  function getRandomImg(mealplanObj) {
    const imgUrls = [];
    for (const meals in mealplanObj.mealplan) {
      if (Array.isArray(mealplanObj.mealplan[meals])) {
        mealplanObj.mealplan[meals].forEach((element) => {
          if (!imgUrls.includes(element.image)) {
            imgUrls.push(element.image);
          }
        });
      }
    }

    const randomImageUrl = imgUrls[Math.floor(Math.random() * imgUrls.length)];
    return randomImageUrl;
  }

  return (
    <>
      <main className="flex flex-col gap-4 max-w-[100rem] m-auto">
        <div className="flex flex-col gap-4 place-content-between my-4 sm:flex-row sm:justify-end ">
          <PrimeButton textContent="Build a meal plan" href="#" />
          <SecondaryButton textContent="Generate a mealplan" href="#" />
        </div>

        <section className="flex flex-col gap-4 text-txtColor">
          <div className="p-8 bg-two gap-1 space-y-4 rounded-lg ">
            <div className="flex items-start flex-col  text-[#394867] max-w-7xl mx-auto">
              {user && (
                <h2 className="font-black">
                  {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}{" "}
                  {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
                </h2>
              )}
              <div
                className="flex gap-1 items-center mt-2 cursor-pointer"
                onClick={() => {
                  if (user) {
                    setShowPersonalInfo(!showPersonalInfo);
                  } else {
                    console.log("user | false");
                  }
                }}
              >
                <InfoOutlinedIcon className="text-[18px]" />
                <p className="block font-semibold s mx-2">info</p>
              </div>
            </div>
            {showPersonalInfo && (
              <>
                <ProfileComponent />
              </>
            )}
          </div>
          {mealplans !== null && (
            <>
              <h3 className="mt-6 text-txtColorTwo">Your Mealplans</h3>
              <div className="flex flex-wrap gap-6 mb-36 ">
                {mealplans.map((nutritionMeal) => {
                  let randomImgFromMeals = getRandomImg(nutritionMeal);

                  return (
                    <>
                      <div key={nutritionMeal.id} className=" bg-one max-w-xs  md:max-w-xs">
                        <div className="w-full ">
                          <div>
                            <img src={randomImgFromMeals} alt="" className="rounded-t-lg h-1/3" />
                          </div>
                          <div className="flex px-2 gap-4 relative drop-shadow-sm rounded-b-lg bg-two">
                            <div className="flex items-center gap-2 my-2">
                              <p className="text-2xl">🍽️</p>
                              <p className="text-base">{`${nutritionMeal.mealplan.numOfMeals} meals`}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-2xl">🌿</p>
                              <p className="text-base">{`${nutritionMeal.mealplan.plateModel}`}</p>
                            </div>
                            <div className="flex items-center ml-auto ">
                              <EllipsMenuButton
                                className="w-6"
                                erase={() => {
                                  deleteMealplan(nutritionMeal._id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-2">
                          <PrimeButton textContent="View mealplan" onClick={viewMealplan} />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
