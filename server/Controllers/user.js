/*
export const index = async (req, res) => {};
export const show = async (req, res) => {};
export const store = async (req, res) => {};
export const update = async (req, res) => {};
export const destroy = async (req, res) => {};
*/

import { userGenerator } from "../Generator/userGenerator.js";
import { getUser, registerUser } from "../Services/User_Services/userServices.js";

//get active user
export const index = async (req, res) => {
  res.send({ message: "Not implemented", endpoint: "/register -> index" });
};

export const storeUser = async (req, res) => {
  console.log("controller");
  const userData = req.body;
  const validatedUser = await userGenerator(userData);

  try {
    const user = await registerUser(validatedUser);

    res.status(200).send({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      status: "error",
      code: err.code,
      message: err,
    });
  }
};

export const showUser = async (req, res) => {
  const userId = req.body.userId;
  const includeFoodPref = req.body.includeFoodPref;
  console.log({ userId, includeFoodPref });

  try {
    const user = await getUser(userId, includeFoodPref);

    if (user) {
      res.status(200).send({
        status: "success",
        data: user,
      });
    }
  } catch (err) {
    console.log("err: ", err);
    res.status(404).send({
      status: "error",
      message: "Something went wrong querying the user",
      error: err,
    });
  }
};
