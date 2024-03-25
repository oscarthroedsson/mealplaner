// functions

import { useEffect, useState } from "react";

// icons // images
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import pannkaka from "../../assets/pancakes.jpeg";

// Components
import PrimeButton from "../../Components/Shared/Buttons/PrimeButton.jsx";
import SecondaryButton from "../../Components/Shared/Buttons/SecondaryButton.jsx";
import { getCookieUser } from "../../config/cookies/cookie_config.js";
import { destroyMealplan, getMealplans } from "../../Api/mealpan_Api.js";
import { activityLevels } from "../../assets/data/activity.js";
import { EllipsMenuButton } from "../../Components/Shared/Buttons/iconButtons/EllipsMenuButton.jsx";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

/*
KOMPONENTEN SKA GENERERA ALLA KOSTPLANER SOM HAR GENERERATS TILL ANVÄNDAREN

Kostplanerna måste kallas någon annanstans, vi ska enbart hämta dom från stället  där de lagras i denna komponenten
Just nu kör vi APIet här för att vi ska kunna generera kostprogram och visa på datorn
*/

export default function MealPlans() {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [user, setUser] = useState(null);
  const [mealplans, setMealplans] = useState(null);
  const [editProfil, setEditProfil] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCookieUser();

      if (userInfo) {
        setUser(userInfo);

        await getMealplans(userInfo.id)
          .then((mealplans) => {
            setMealplans(mealplans); // Uppdatera mealplans med datan från getMealplans
          })
          .catch((error) => {
            console.log("Error fetching mealplans:", error);
          });
      } else {
        console.log("handle user errors");
      }
    };
    fetchUser();
  }, []);

  function viewMealplan() {
    console.log("want to view mealplan");
  }

  async function deleteMealplan(mealplanId) {
    if (mealplanId) {
      await destroyMealplan(mealplanId, user.id).then(() => {
        const updatedMealplans = mealplans.filter((mealplan) => mealplan._id !== mealplanId);

        setMealplans(updatedMealplans);
      });
    }
  }

  function editProfile() {
    console.log("want to edit profil");
    if (editProfil) {
      setEditProfil(!editProfil);
    } else {
      setEditProfil(!editProfil);
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
      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 place-content-between  sm:flex-row sm:justify-end ">
          <PrimeButton textContent="Build a meal plan" href="#" />
          <SecondaryButton textContent="Generate a mealplan" href="#" />
        </div>

        <section className="flex flex-col gap-4 text-txtColor">
          <div className="p-4 bg-two gap-1 space-y-4 rounded-lg xl:flex">
            <div className="flex items-start flex-col  text-[#394867]">
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
                <p>info</p>
              </div>
            </div>
            {showPersonalInfo && (
              // rebuild as table
              <>
                <div className="flex gap-2 flex-col xl:flex-row ml-auto xl:space-x-8 ">
                  <div className=" w-full py-2 flex justify-between xl:flex-col xl:justify-normal xl:border-none xl:py-0">
                    <p className="font-medium">Age</p>
                    <p className="text-sm">{user.age}</p>
                  </div>
                  <div className="w-full  py-2 flex justify-between xl:flex-col xl:justify-normal">
                    <p className="font-medium">Gender</p>
                    <p className="text-sm">{user.isMale ? "Man" : "Woman"}</p>
                  </div>
                  <div className="w-full  py-2  flex justify-between xl:flex-col xl:justify-normal">
                    <p className="font-medium">Height</p>
                    <p className="text-sm">{user.useImperial ? `${user.height} inch` : `${user.height} cm`}</p>
                  </div>
                  <div className="w-full  py-2  flex justify-between xl:flex-col xl:justify-normal">
                    <p className="font-medium">Weight</p>
                    <p className="text-sm">{user.useImperial ? `${user.weight} lsb` : `${user.weight} kg`}</p>
                  </div>
                  <div className="w-full  py-2 flex justify-between xl:flex-col xl:justify-normal">
                    <p className="font-medium">Goal</p>
                    <p className="text-sm">{user.health_goal}</p>
                  </div>
                  <div className="w-full  py-2  flex justify-between xl:flex-col xl:justify-normal">
                    <p className="font-medium">Activity</p>
                    <p className="text-sm">
                      {activityLevels.find((lvl) => lvl.value === user.activity_level).shortText}
                    </p>
                  </div>
                  <div>
                    <button onClick={editProfile}>Edit</button>
                  </div>
                </div>
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
