import { mongoDBstring } from "../../Database/mongoDB.js";
const mongo = mongoDBstring();

export const storeMealplan = async (mealplan) => {
  if (mealplan) {
    const added = await mongo.insertOne({ mealplan });
    if (!added) {
      console.log("🍎 storeMealplan | added:", added);
    }
  } else {
    console.log("🍎 storeMealplan | mealplan is NOT valid");
  }
};
