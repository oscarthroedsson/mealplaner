/*
export const index = async (req, res) => {};
export const show = async (req, res) => {};
export const store = async (req, res) => {};
export const update = async (req, res) => {};
export const destroy = async (req, res) => {};
export const create = async (req, res) => {};
*/

//FUNCTIONS

import { getCookieUser } from "../config/cookies/cookie_config";

/**
 * createMealplan |
 * @description If no userData is sent in we get the userData from cookies 🍪
 * @param {obj} userData
 */
export const createMealplan = async (userData = "") => {
  console.log("createMealplan | was initiated");
  //if no userData was sent in
  if (!userData) {
    try {
      userData = await getCookieUser();
    } catch (err) {
      throw new Error(`Couldnt get user → ${err}`);
    }
  }

  try {
    const response = await fetch(`http://localhost:3000/mealplan/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const mealplan = await response.json();

    if (mealplan) {
      return mealplan;
    } else {
      console.log("Error getting mealplan");
    }
  } catch (err) {
    console.log("createMealplan | Something went wrong fetching mealplan ", err);
  }
};

export const getMealplans = async (userId) => {
  console.log("getMealplans | was initiated");

  try {
    const response = await fetch(`http://localhost:3000/mealplan/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const mealplans = await response.json();

    if (mealplans) {
      return mealplans.data;
    } else {
      console.log("handle Error");
    }
  } catch (err) {
    console.log("err: ", err);
  }
};

export const destroyMealplan = async (mealplanID, userId) => {
  try {
    const respone = await fetch("http://localhost:3000/mealplan/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        mealplanID,
      }),
    });
  } catch (err) {
    console.log("destroyMealplan | ", err);
  }
};
