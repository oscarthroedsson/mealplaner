/**
 * @description Builds a relevant object for our cause and fix so every recipe that is provided is returned as one serving
 * @param {number} id - ID of the recipe that we want details on
 * @param {number} servings - MUST SERVNINGS FROM A RECIPE, NOT A MADE-UP NUMBER
 * @returns {object} - object of nutrition details of a recipe
 */

const apiKey =
  process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNutritionDetails = async (id, servings) => {
  servings = Number(servings);
  console.log("getNutritionDetails | ID:", id);
  console.log("getNutritionDetails | servings: ", servings);
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json${apiKey}`
    );
    if (res.ok) {
      const nutrient = await res.json();
      await delay(500);

      return {
        calories: Math.round(Number(nutrient.calories)),
        protein:
          Math.round(
            Number(nutrient.protein.replace("g", "") / servings)
          ).toString() + "g",
        carbs: {
          total:
            Math.round(
              Number(nutrient.carbs.replace("g", "")) / servings
            ).toString() + "g",
          sugars:
            Math.round(
              Number(
                nutrient.bad
                  .find((sugers) => sugers.title === "Sugar")
                  .amount.replace("g", "")
              ) / servings
            ).toString() + "g",
        },
        fat: {
          total:
            Math.round(
              Number(nutrient.fat.replace("g", "") / servings)
            ).toString() + "g",
          saturatedFat:
            Math.round(
              Number(
                nutrient.bad
                  .find(
                    (saturatedFat) => saturatedFat.title === "Saturated Fat"
                  )
                  .amount.replace("g", "")
              ) / servings
            ).toString() + "g",
        },
        cholesterol:
          Math.round(
            Number(
              nutrient.bad
                .find((cholesterol) => cholesterol.title === "Cholesterol")
                .amount.replace("mg", "")
            ) / servings
          ).toString() + "mg",
        vitamins: nutrient.nutrients
          .filter((vitamin) => {
            return (
              vitamin.name !== "Calories" &&
              vitamin.name !== "Fat" &&
              vitamin.name !== "Carbohydrates" &&
              vitamin.name !== "Net Carbohydrates" &&
              vitamin.name !== "Sugar" &&
              vitamin.name !== "Cholesterol" &&
              vitamin.name !== "Protein" &&
              vitamin.name !== "Saturated Fat"
            );
          })
          .map((vitamin) => {
            return {
              name: vitamin.name,
              amount: Math.round(vitamin.amount / servings),
              unit: vitamin.unit,
            };
          }),
      };
    }
  } catch (err) {
    console.log("ERROR -> getNutritionDetails | with fetching API", err);
  }
};
