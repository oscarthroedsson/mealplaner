/*
export const index = async (req, res) => {};
export const show = async (req, res) => {};
export const store = async (req, res) => {};
export const update = async (req, res) => {};
export const destroy = async (req, res) => {};
*/

import {
  addFoodpreferenceToUser,
  getFoodPreference,
} from "../Services/Foodpreference_Services/foodpreferenceServices.js";

export const store = async (req, res) => {
  //take out data from body
  const foodpreference = req.body;
  console.log("SERVER | foodpref Controller | store: ", foodpreference);

  //   const validatedData = foodPreferenceGenerator(req.body);
  try {
    const addedFoodpreference = await addFoodpreferenceToUser(foodpreference);

    res.send({
      status: "Success",
      endpoint: addedFoodpreference,
    });
  } catch (err) {
    res.send({
      status: "Success",
      message: "Something went wrong",
      error: err,
    });
  }
};

export const show = async (req, res) => {
  const userId = Number(req.params.id);
  console.log("foodpref | show | userId:", userId);

  try {
    const userFoodPref = await getFoodPreference(userId);
    res.status(200).send({
      status: "success",
      data: userFoodPref,
    });
  } catch (err) {
    res.send({
      status: "Error",
      msg: "Something went wrong",
      Error: err,
    });
  }
};
