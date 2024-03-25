import { getNutritionDetails } from "../Api/create_mealplan/getNutritionDetails.js";

/**
 * @description
 * @param {object} recipe Takes an recipe obj from: getRecipeInfo() → not modyfied
 * @returns a re-constructed recipe object
 */

export async function recipeModel(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    image: "https://spoonacular.com/recipeImages/665182-556x370.jpg",
    timeToCook: recipe.readyInMinutes,
    serverings: recipe.servings > 1 ? 1 : recipe.servings, //kan användas för att anpassa allting //! Kan få fler än en serving.....
    nutrients: await getNutritionDetails(recipe.id, recipe.servings), //send in ID from the same object
    instructions: recipe.instructions,
    //Vi kanske vill ha näringsvärdena på varje ingridiens?
    ingridients: recipe.extendedIngredients.map((element) => {
      //Walk throug every ingridient and return a clean obj
      return {
        id: element.id,
        ingridientName: element.nameClean,
        amount: {
          imperial: {
            amount: element.measures.us.amount / recipe.servings,
            unit: element.measures.us.unitShort,
          },
          metric: {
            amount: element.measures.metric.amount / recipe.servings,
            unit: element.measures.metric.unitShort,
          },
        },
      };
    }),
  };
}
