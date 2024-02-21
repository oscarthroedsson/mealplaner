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
  if (!userData) {
    try {
      userData = await getCookieUser();
    } catch (err) {
      throw new Error(`Couldnt get user → ${err}`);
    }
  }

  try {
    await fetch(`http://localhost:3000/mealplan/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.log(
      "createMealplan | fetch mealplan/create| Something went wrong: ",
      err
    );
  }
};
