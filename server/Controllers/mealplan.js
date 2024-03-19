/*
export const index = async (req, res) => {};
export const show = async (req, res) => {};
export const store = async (req, res) => {};
export const update = async (req, res) => {};
export const destroy = async (req, res) => {};
*/

import { createMealPlan } from "../Api/create_mealplan/createMealplan.js";
import { getFoodPreference } from "../Services/Foodpreference_Services/foodpreferenceServices.js";
import { storeMealplan } from "../Services/Mealplan_Services/storeMealplan.js";
import { getUser } from "../Services/User_Services/userServices.js";

export const create = async (req, res) => {
  const { id: userId } = req.body;

  const { energy_intake: energyNeed } = await getUser(userId);
  console.log("⚡️ Energyneed: ", energyNeed);
  if (!energyNeed) {
    res.status(400).send({
      status: "error",
      message: `Problem finding usre with id: ${userId} in the DBs`,
    });
  }

  try {
    const foodPref = await getFoodPreference(userId);

    // Take out the intolerance from an array of objects to an array with string of the intolerance
    foodPref.Intolerances = foodPref.Intolerances.map((intolerance) => intolerance.name);

    const mealplan = await createMealPlan(foodPref, energyNeed);
    mealplan.userId = userId; // add the users ID to the whole mealplan
    await storeMealplan(mealplan);

    res.send({
      message: `sucsess`,
      route: "/mealplan -> store",
      data: mealplan,
    });
  } catch (err) {
    console.log("getFoodPreference | Error: ", err);
  }
};
