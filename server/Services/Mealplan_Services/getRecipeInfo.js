import { recipeModel } from "../../Models/recipeModel";
import { delay } from "../../Tools/delay";
const apiKey = process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";

export async function getRecipeInfo(arrayOfId) {
  const meals = [];

  delay(500); // delays the API CALL

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
  console.log("meals:", meals);
  return meals;
}
