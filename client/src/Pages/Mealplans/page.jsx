"use client";

// functions

import { useEffect, useState } from "react";

// icons
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Components
import PrimeButton from "../../Components/Shared/Buttons/PrimeButton.jsx";
import Navbar from "../../Components/shared/Navbar/Navbar.jsx";
import SecondaryButton from "../../Components/Shared/Buttons/SecondaryButton.jsx";
import MealPlanThumbNail from "../../Components/MealPlanThumbnail";
import { useSearchParams } from "next/navigation";

/*
KOMPONENTEN SKA GENERERA ALLA KOSTPLANER SOM HAR GENERERATS TILL ANVÄNDAREN

Kostplanerna måste kallas någon annanstans, vi ska enbart hämta dom från stället  där de lagras i denna komponenten
Just nu kör vi APIet här för att vi ska kunna generera kostprogram och visa på datorn
*/

export default function MealPlans() {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  useEffect(() => {
    const piss = {
      diet: "vegeterian",
      type: ["breakfast", "snack", "dinner"],
      number: "3",
      intolerances: "milk",
      excludeIngredients: "peanut",
      maxReadyTime: "20",
    };

    const getMeals = async () => {
      // return await createMealPlan(piss);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-10">
        <div className="flex place-content-between my-6 sm:place-content-end sm:gap-6">
          <PrimeButton textContent="Generate meal plan" href="#" />
          <SecondaryButton textContent="Build a meal plan" href="#" />
        </div>

        <section className="flex flex-col gap-9 text-txtColor">
          <div className="p-4 bg-two ">
            <div className="flex items-start flex-col gap-1 text-[#394867]">
              <h1>Oscar Throedsson</h1>
              <div className="flex gap-1 items-center">
                <InfoOutlinedIcon className="text-[18px]" /> <p>info</p>
              </div>
            </div>

            <div className="grid grid-cols-1 grid-rows-auto gap-y-2 text-txtColorTwo">
              <div className="width-full flex justify-between">
                <p className="font-medium">Gender:</p>
                <p className="text-sm">Male</p>
              </div>
              <div className="width-full flex justify-between">
                <p className="font-medium">Age:</p>
                <p className="text-sm">30</p>
              </div>
              <div className="width-full flex justify-between">
                <p className="font-medium">Height:</p>
                <p className="text-sm">184 cm</p>
              </div>
              <div className="width-full flex justify-between">
                <p className="font-medium">Weight:</p>
                <p className="text-sm">99 kg</p>
              </div>
              <div className="width-full flex justify-between">
                <p className="font-medium">Goal:</p>
                <p className="text-sm">Weight loss</p>
              </div>
              <div className="width-full flex justify-between">
                <p className="font-medium">Activity</p>
                <p className="text-sm">Mediocre</p>
              </div>
            </div>
          </div>

          <MealPlanThumbNail />
        </section>
      </main>
    </>
  );
}
