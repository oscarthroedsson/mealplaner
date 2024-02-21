import express from "express"; // this should be first import

/**
 * Import every file in routes that controll the specific routes
 */

import {
  index,
  show,
  store,
  update,
  destroy,
} from "../Controllers/[specific controllre]";

//this should be last import
const router = express.Router();

/**
 * Frame for an route that shows the syntax being used
 */

router.get("/url_path", "validations", "function");
router.post("/url_path", "validations", "function");
router.patch("/url_path", "validations", "function");
router.delete("/url_path", "validations", "function");

export default router;
