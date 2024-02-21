import express from "express"; // this should be first import
const router = express.Router();
/*
router.get("/url_path", "validations", "function");
router.post("/url_path", "validations", "function");
router.patch("/url_path", "validations", "function");
router.delete("/url_path", "validations", "function");
*/

/*
index,
show,
store
update,
destroy,
*/

/**
 * Import every file in routes that controll the specific routes
 */

import { show, store } from "../Controllers/foodpreference_controller.js";

router.post("/add", store);

router.get("/get/:id", show);

export default router;
