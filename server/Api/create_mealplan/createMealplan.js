// import { getRecipeInfo } from "../../Services/getRecipeInfo.js";
import { customizePortionModal } from "../../Models/customizePortionModal.js";
import { getMealIds } from "../../Services/Mealplan_Services/getMealIDService.js";
import { delay } from "../../Tools/delay.js";
import { meals } from "../../data/meals.js";
import { getRecipeInfo } from "./recipeInformation.js";

import Debug from "debug";
// Create a new debug instance
const debug = Debug("📁 Server: createMealPlan.js | 💬: ");

const apiKey = process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";

/**
 * @description Take in user object and runs: getRecipeInfo()
 * @param {object} user
 * @returns {object}
 */
export const createMealPlan = async (foodpref, energyNeed) => {
  let mealplan = {}; // create a obj where we will put all the meals (breakfast, lunch etc)
  const typeOfMeal = meals(foodpref.meals_PerDayIs, energyNeed); // Get the num of meals from /data/meals.js

  //The fetch get IDs for all the meals that is going to be in the mealplan.
  //typeOfMeal.length
  const mealsToSearch = await getMealIds(foodpref, typeOfMeal);

  console.log("🌞 screateMealPlan | typeOfMeal: ", typeOfMeal);
  console.log("🌴 screateMealPlan | meals: ", mealsToSearch);

  for (let i = 0; i < typeOfMeal.length; i++) {
    try {
      // We fetch 3 alternatives per meal everytime we fetch → Look "number=3" in the URL
      // 🍎  This should be replaced with a function that checks so we dont get the same IDs

      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch${apiKey}&diet=${foodpref.pref_MealModels}&type=${typeOfMeal[i].type}&number=3&intolerances=${foodpref.Intolerances}&maxReadyTime=${foodpref.pref_CookingTimeIs.max}`
      );

      // Start to create a mealplan if response is OK (withing 200-299 code).
      if (res.ok) {
        const information = await res.json();

        /*
        Information contain 3 recipes for a meal, we take those IDs and add to ids
        */
        const ids = information.results.map((arrItem) => arrItem.id);

        // Skickar in IDs till getRecipeInformation där vi returnerar ett objekt för varje receptalternativ på varje måltid
        /*

        Gets the recipie information by the IDs we have generated threw another API
        🛸 hover to see what it does and takes in
        */
        const newMeal = await getRecipeInfo(ids);

        // if-statement create or sort the mealplan
        /*
         Adding the meal as a key in mealplan object and adds the alternatives as an array to that key ex:
         breakfasts:[
          {alt 1},
          {alt 2},
          {alt 3},
         ]
         */
        if (!mealplan[typeOfMeal[i].type]) {
          // adds the meal to the object, if it doesn´t exist, as type of Array
          mealplan[typeOfMeal[i].type] = newMeal;
        } else if (mealplan[typeOfMeal[i].type].length <= 3) {
          // adds a new meal to existing meal
          mealplan[typeOfMeal[i].type].push(newMeal);
        } else {
          //handles if a meal can´t be added
          console.log("We could not add (newMeal)", newMeal, "to the object");
        }
      } else {
        /*
        ⛔️ Handles error if res isn´t OK
        */
        const errorResponse = await res.json();
        console.log("Failed to fetch meals for:", typeOfMeal[i], errorResponse);
      }
    } catch (err) {
      // handles error with the API
      console.log("Error with API: ", err);
    }
    await delay(500);
  }

  mealplan = await customizePortionModal(mealplan, typeOfMeal);

  return mealplan;
};
