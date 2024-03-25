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
import { deleteMealplan, getMealplan, getMealplans } from "../Services/Mealplan_Services/getMealplan.js";
import { storeMealplan } from "../Services/Mealplan_Services/storeMealplan.js";
import { getUser } from "../Services/User_Services/userServices.js";

export const create = async (req, res) => {
  const { id: userId } = req.body;

  const { energy_intake: energyNeed } = await getUser(userId);

  if (!energyNeed) {
    res.status(400).send({
      status: "error",
      message: `Problem finding usre with id: ${userId} in the DBs`,
    });
  }
  let foodPref = null;
  try {
    foodPref = await getFoodPreference(userId);
  } catch (err) {
    res.status(400).send({
      message: "error",
      data: "user not found",
      error: err,
    });
  }

  // Take out the intolerance from an array of objects to an array with string of the intolerance
  foodPref.Intolerances = foodPref.Intolerances.map((intolerance) => intolerance.name);
  try {
    const mealplan = await createMealPlan(foodPref, energyNeed);
    mealplan.userId = userId; // add the users ID to the whole mealplan
    mealplan.plateModel = foodPref.pref_MealModels; // which diet we find meals of(vegeterian, and so on)
    mealplan.createdAt = moment().format("YYYY-MM-DD"); // gives time when mealplan is created
    mealplan.numOfMeals = foodPref.meals_PerDayIs;

    try {
      await storeMealplan(mealplan);
    } catch (err) {
      res.status().send({
        message: "error",
        data: "storing mealplan failed",
        error: err,
      });
    }

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

export const destroy = async (req, res) => {
  console.log("req.body: ", req.body);
  const userId = req.body.userId;
  const mealplanID = req.body.mealplanID;

  console.log("userId: ", userId);
  console.log("mealplanID: ", mealplanID);

  // validate user
  try {
    await getUser(userId, false);
  } catch (err) {
    res.status(400).send({
      message: "error",
      code: 400,
      data: "We couldn´t find the user",
    });
  }

  // if user OK delete mealplan
  try {
    const deletedMealplan = deleteMealplan(userId, mealplanID);

    if (deletedMealplan) {
      res.status(200).send({
        message: "success",
        data: [],
      });
      return;
    }
  } catch (err) {
    res.status(400).send({
      message: "error",
      data: "We couldn´t delete the mealplan",
    });
  }
};
