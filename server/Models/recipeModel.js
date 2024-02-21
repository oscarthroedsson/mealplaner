import { getNutritionDetails } from "../Api/create_mealplan/getNutritionDetails.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
        amount: Math.round(element.measures.metric.amount / recipe.servings), //get metric value
        unitShort: element.measures.metric.unitShort, //get metric value
      };
    }),
  };
}
