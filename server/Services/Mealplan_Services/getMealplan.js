import { ObjectId } from "mongodb";
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

export const getMealplan = async (userId, mealplanID) => {
  const mealplanIdObject = ObjectId.createFromHexString(mealplanID);
  await mongo.findOne({ _id: mealplanIdObject, "mealplan.userId": userId });
};

export const deleteMealplan = async (userId, mealplanID) => {
  const mealplanIdObject = ObjectId.createFromHexString(mealplanID);
  if (userId && mealplanIdObject) {
    await mongo.findOneAndDelete({ _id: mealplanIdObject, "mealplan.userId": userId });
  }
};
