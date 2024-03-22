import { ReturnDocument } from "mongodb";
import { mongoDBstring } from "../../Database/mongoDB.js";
const mongo = mongoDBstring();

export const getMealplans = async (userId) => {
  if (userId) {
    try {
      const mealplans = await mongo.find({ "mealplan.userId": userId }).toArray();
      console.log("🐟 mealplans was fetched ");
      return mealplans;
    } catch (err) {
      console.log("getMealplan | err:", err);
    }
  }
};
