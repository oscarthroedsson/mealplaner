// import { getRecipeInfo } from "../../Services/getRecipeInfo.js";
import { customizePortionModal } from "../../Models/customizePortionModal.js";
import { getMealIds } from "../../Services/Mealplan_Services/getMealIDService.js";
import { delay } from "../../Tools/delay.js";
import { meals } from "../../data/meals.js";
import { getRecipeInfo } from "./recipeInformation.js";

import Debug from "debug";
// Create a new debug instance
const debug = Debug("📁 Server: createMealPlan.js | 💬: ");

/**
 * @description Take in user object and runs: getRecipeInfo()
 * @param {object} user
 * @returns {object}
 */
export const createMealPlan = async (foodpref, energyNeed) => {
  let mealplan = {}; // create a obj where we will put all the meals (breakfast, lunch etc)
  const typeOfMeal = meals(foodpref.meals_PerDayIs, energyNeed); // Get the num of meals from /data/meals.js

  // get recipe IDs for every meal and alternativ
  const mealPlanIds = await getMealIds(foodpref, typeOfMeal); // also make sure we don´t get dublicate recipe ids over the whole mealplan

  // get meals for every mealtype in mealPlanIds with the IDs
  for (const mealType in mealPlanIds) {
    try {
      // get out the relevant IDs for the meal that we are creating
      const ids = mealPlanIds[mealType];

      // sends array of IDs to get info about the recipe
      const newMeal = await getRecipeInfo(ids);

      if (!mealplan[mealType]) {
        // if the meal doesn´t exist

        // create object with mealtype as the key, and adds the recipes in an array as value
        mealplan[mealType] = newMeal;
      } else if (mealplan[mealType].length <= 3) {
        // 3 is hardcoded untill we make it more dynamic... them need pay foor it 💵
        // if the meal doesnt have three recipes we add it.
        mealplan[mealType].push(newMeal);
      } else {
        //handles if a meal can´t be added
        console.log("We could not add (newMeal)", newMeal, "to the object");
      }
    } catch (err) {
      console.log("Error with API: ", err);
    }
    await delay(500);
  }

  mealplan = await customizePortionModal(mealplan, typeOfMeal);

  return mealplan;
};
