// functions

import { useEffect, useState } from "react";

// icons // images
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import pannkaka from "../../assets/pancakes.jpeg";

// Components
import PrimeButton from "../../Components/Shared/Buttons/PrimeButton.jsx";
import SecondaryButton from "../../Components/Shared/Buttons/SecondaryButton.jsx";
import { getCookieUser } from "../../config/cookies/cookie_config.js";
import { getMealplans } from "../../Api/mealpan_Api.js";
import { activityLevels } from "../../assets/data/activity.js";
import { EllipsMenuButton } from "../../Components/Shared/Buttons/iconButtons/EllipsMenuButton.jsx";

/*
KOMPONENTEN SKA GENERERA ALLA KOSTPLANER SOM HAR GENERERATS TILL ANVÄNDAREN

Kostplanerna måste kallas någon annanstans, vi ska enbart hämta dom från stället  där de lagras i denna komponenten
Just nu kör vi APIet här för att vi ska kunna generera kostprogram och visa på datorn
*/

export default function MealPlans() {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [user, setUser] = useState(null);
  const [mealplans, setMealplans] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCookieUser();

      if (userInfo) {
        setUser(userInfo);
        console.log("userInfo.id: ", userInfo.id);

        await getMealplans(userInfo.id)
          .then((mealplans) => {
            console.log("mealplans: ", mealplans);
            setMealplans(mealplans); // Uppdatera mealplans med datan från getMealplans
          })
          .catch((error) => {
            console.log("Error fetching mealplans:", error);
          });
        if (mealplans) {
          console.log(mealplans);
        }
      } else {
        console.log("handle user errors");
      }
    };
    fetchUser();
  }, []);

  function viewMealplan() {
    console.log("want to view mealplan");
  }

  function handleLike() {
    console.log("it was liked");
  }

  return (
    <>
      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 place-content-between my-6 sm:place-content-end sm:gap-6">
          <PrimeButton textContent="Build a meal plan" href="#" />
          <SecondaryButton textContent="Generate a mealplan" href="#" />
        </div>

        <section className="flex flex-col gap-4 text-txtColor">
          <div className="p-4 bg-two gap-1 space-y-4 rounded-lg">
            <div className="flex items-start flex-col  text-[#394867]">
              {user && (
                <h2>
                  {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}{" "}
                  {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
                </h2>
              )}
              <div
                className="flex gap-1 items-center mt-2 cursor-pointer"
                onClick={() => {
                  console.log("user:", user);
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
              <>
                <div className="width-full flex justify-between">
                  <p className="font-medium">Age</p>
                  <p className="text-sm">{user.age}</p>
                </div>
                <div className="width-full flex justify-between">
                  <p className="font-medium">Gender</p>
                  <p className="text-sm">{user.isMale ? "Man" : "Woman"}</p>
                </div>
                <div className="width-full flex justify-between">
                  <p className="font-medium">Height</p>
                  <p className="text-sm">{user.useImperial ? `${user.height} inch` : `${user.height} cm`}</p>
                </div>
                <div className="width-full flex justify-between">
                  <p className="font-medium">Weight</p>
                  <p className="text-sm">{user.useImperial ? `${user.weight} lsb` : `${user.weight} kg`}</p>
                </div>
                <div className="width-full flex justify-between">
                  <p className="font-medium">Goal</p>
                  <p className="text-sm">{user.health_goal}</p>
                </div>
                <div className="width-full flex justify-between">
                  <p className="font-medium">Activity</p>
                  <p className="text-sm">{activityLevels.find((lvl) => lvl.value === user.activity_level).shortText}</p>
                </div>
              </>
            )}
          </div>
          {mealplans !== null && (
            <>
              {mealplans.map((nutritionMeal) => {
                console.log("mealplan: ", nutritionMeal);
                return (
                  <>
                    <h3 className="mt-6">Your Mealplans</h3>
                    <div key={nutritionMeal.id} className=" bg-one">
                      <div className="">
                        <div className="relative">
                          <img src={pannkaka} alt="" className="rounded-t-lg h-1/3" />
                        </div>
                        <div className="flex justify-around  bg-two rounded-b-lg drop-shadow-sm relative">
                          <div className="flex items-center gap-2 my-2">
                            <p className="text-2xl">🍽️</p>
                            <p className="text-base">{`${Object.keys(nutritionMeal.mealplan).length - 2} meals`}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl">🌿</p>
                            <p className="text-base">Vegeterian</p>
                          </div>
                          <div className="flex  items-center ">
                            <EllipsMenuButton className=" w-6 " />
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
            </>
          )}
        </section>
      </main>
    </>
  );
}
