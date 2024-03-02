/**
 * @description Builds a relevant object for our cause and fix so every recipe that is provided is returned as one serving
 * @param {number} id - ID of the recipe that we want details on
 * @param {number} servings - MUST SERVNINGS FROM A RECIPE, NOT A MADE-UP NUMBER
 * @returns {object} - object of nutrition details of a recipe
 */

import { portionModel } from "../../Models/portionModel.js";
import { delay } from "../../Tools/delay.js";

const apiKey = process.env.API_KEY || "?apiKey=70b1469bc39d4fbcadbf282a070d81ac";

/**
 * @description
 * @param {*} id
 * @param {*} servings
 * @returns
 */

export const getNutritionDetails = async (id, servings) => {
  servings = Number(servings);
  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json${apiKey}`);
    if (res.ok) {
      const nutrient = await res.json();

      await delay(500);
      /**
       * @description Takes in the nutrient servings from the recipe
       * *
       */
      const nutritionDetails = portionModel(nutrient, servings);
      // const customizePortion = customizePortionModal(nutritionDetails);
      return nutritionDetails;
    }
  } catch (err) {
    console.log("ERROR -> getNutritionDetails | with fetching API", err);
  }
};
