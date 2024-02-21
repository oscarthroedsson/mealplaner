// import { body } from "express-validator";

// export const userRules = [
//   body("firstNameIs")
//     .trim()
//     .isString()
//     .withMessage("First name | Needs to be a string")
//     .bail(),

//   body("lastNameIs")
//     .trim()
//     .isString()
//     .withMessage("Last name | Needs to be a string")
//     .bail(),

//   body("ageIs").isInt().withMessage("Age | Needs to be a number").bail(),

//   body("emailIs")
//     .trim()
//     .isEmail()
//     .withMessage("E mail needs to be a valid e-mail"),

//   body("isMale")
//     .isString()
//     .withMessage("Gender needs to be in string format")
//     .bail(),

//   body("useImperial")
//     .isBoolean()
//     .withMessage("Measurement system needs to be a boolean")
//     .bail(),

//   body("heightIs").isInt().withMessage("Height needs to be a number").bail(),

//   body("weightIs").isFloat().withMessage("Weight needs to be an float").bail(),

//   body("goalIs").isString().withMessage("Goal needs to be a textformat").bail(),

//   body("getGoalTempo")
//     .isInt()
//     .withMessage("Needs to be a positive or negative integer"),

//   body("activityLevel")
//     .isFloat()
//     .withMessage("Needs to be a float value")
//     .bail(),

//   body("bmr").isInt().withMessage("Needs to be a integer").bail(),

//   body("energyIntake").isInt().withMessage("Needs to be an integer").bail(),
// ];
