/*
export const index = async (req, res) => {};
export const show = async (req, res) => {};
export const store = async (req, res) => {};
export const update = async (req, res) => {};
export const destroy = async (req, res) => {};
*/

import moment from "moment";

import { createMealPlan } from "../Api/create_mealplan/createMealplan.js";
import { getFoodPreference } from "../Services/Foodpreference_Services/foodpreferenceServices.js";
import { getMealplans } from "../Services/Mealplan_Services/getMealplan.js";
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
    mealplan.createdAt = moment().format("YYYY-MM-DD"); // gives time when mealplan is created
    await storeMealplan(mealplan);

    res.send({
      message: `success`,
      code: 200,
      route: "/mealplan",
      data: mealplan,
    });
  } catch (err) {
    console.log("getFoodPreference | Error: ", err);
  }
};

export const show = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    res.status(400).send({
      message: "error",
      code: 400,
      data: "Invalid user ID format or not a number",
    });
  }

  // check if user exist
  const validateUser = await getUser(userId, false);

  if (validateUser) {
    try {
      const mealplans = await getMealplans(userId);

      if (mealplans) {
        console.log("🥘 MEALPLAN WAS TRUE");
        res.status(200).send({
          message: `success`,
          code: 200,
          data: mealplans,
        });
      }
    } catch (err) {
      console.log("show | errors");
    }
  } else {
    res.status(400).send({
      message: "error",
      code: 400,
      data: "User Could not be found",
    });
  }
};
