import { recipeModel } from "../../Models/recipeModel";
const apiKey =
  process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";

export async function getRecipeInfo(arrayOfId) {
  const meals = [];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //# DELAYS THE API CALLS

  for (let i = 0; i < arrayOfId.length; i++) {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${arrayOfId[i]}/information/${apiKey}`
      );

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
  console.log("meals:", meals);
  return meals;
}
