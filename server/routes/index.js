/**
 * WE import the routes folder in app.js. This index file is the file app.use(router) will enter first becuase of
 * us importing a folder instead of a file
 */

//ƒ Syntax example for using another folder/file router.use("/authors", authorRoutes);
import express from "express";
import mealplanRoutes from "./mealplan.js";
import foodpreferenceRoutes from "./foodpreference.js";
import userRoutes from "./user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "Thanks for usein Mealplaners API, we hope we can satisfy your expectations!"
  );
});
/**
 * Write your routes ------------------------------------------------------------------------
 */

/*
User
*/
router.use("/user", userRoutes);

/*
Mealplan
*/
router.use("/mealplan", mealplanRoutes);

/*
Food preference
*/
router.use("/foodpreference", foodpreferenceRoutes);

// do not write routes under this line ---------------------------------------------

// handle request that do not find any routes
router.use((req, res) => {
  // Respond with 404 and a message in JSON-format
  res.status(404).send({
    message: "No route was found",
  });
});

// Do not write anyting under this line
export default router;
