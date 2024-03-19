import { delay } from "../../Tools/delay.js";

const apiKey = process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";

export const getMealIds = async (foodpref, typeOfMeals) => {
  const meals = [];
  let alternativesPerMeal = 3;

  const runAPi = async () => {
    for (let i = 0; i < alternativesPerMeal; i++) {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch${apiKey}&diet=${foodpref.pref_MealModels}&type=${typeOfMeals[i].type}&number=${alternativesPerMeal}&intolerances=${foodpref.Intolerances}&maxReadyTime=${foodpref.pref_CookingTimeIs.max}`
      );

      const result = await res.json();

      meals[typeOfMeals[i].type] = result.results.map((meal) => meal.id);
    }
  };

  let rounds = 0; // make sure that findIdenicals() is only run 1 + 3 times, if identical IDs is found
  const findIdenicals = async () => {
    const identicals = {};
    let foundIdenticals = false;
    // nested loop of meals array
    // goes threw every meal-obj in meals array
    for (const mealType1 in meals) {
      // goes threw every meal-obj in meals array
      for (const mealType2 in meals) {
        // compare the array of recipe IDs with the other meals
        if (mealType1 !== mealType2) {
          const intersection = meals[mealType1].filter((id) => meals[mealType2].includes(id)); // if the ids is identical - return them
          if (intersection.length > 0) {
            // creates a object with key: mealType and assign an array with the identical IDs
            identicals[mealType1] = intersection;

            foundIdenticals = true;
            break; // ends the loop and re-do the search.
          }
        }
      }
      // break outer loop if we found identicals
      if (foundIdenticals) {
        break;
      }
    }

    // Get new recipes for the meal where we found identical recipes
    if (foundIdenticals) {
      foundIdenticals = false; // reset the foundIdenticals varible
      for (const mealType in identicals) {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch${apiKey}&type=${mealType}&number=${identicals[mealType].length}`
        );
        const newResults = await res.json();

        // console.log(`Nya resultat för ${mealType}:`, newResults);

        meals[mealType] = newResults.results.map((meal) => meal.id);

        delay(500); // delay so we can do API calls
      }

      if (rounds < 3) {
        rounds++;
        await findIdenicals();
      }
    }
  };

  if (foodpref) {
    console.log("foodpref är sant");
    await runAPi();
    await findIdenicals();

    return meals;
  }
};
