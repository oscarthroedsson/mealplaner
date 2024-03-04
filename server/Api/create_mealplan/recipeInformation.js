import { recipeModel } from "../../Models/recipeModel.js";

/**
 * @description Takes in an array containing IDs of recipes and returns array of fully recipe objects in the array
 * @param {array} arrayOfId - An array containing IDs of recipes.
 * @param {apikey} apikey - The API key for accessing recipe data
 * @returns {array} An array of fully populated recipe objects
 */
export async function getRecipeInfo(arrayOfId) {
  const apiKey = process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";
  const meals = [];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //# DELAY THE API CALLS
  console.log("arrayOfId: ", arrayOfId);
  for (let i = 0; i < arrayOfId.length; i++) {
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${arrayOfId[i]}/information/${apiKey}`);

      if (res.ok) {
        const information = await res.json();
        const recipes = await recipeModel(information);

        meals.push(recipes);
      } else {
        console.log("RESPONSE CODE in getRecipeInfo | ", res);
      }
    } catch (err) {
      console.log("ERROR getRecipeInfo | with API: ", err);
    }

    await delay(500); //!NEED THE DELAY FOR API CALLS PER SEC
  }

  return meals;
}
