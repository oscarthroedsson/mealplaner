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
recive,
store
update,
destroy,
create
*/

/**
 * Import every file in routes that controll the specific routes
 */

import { create, show, destroy } from "../Controllers/mealplan.js";

router.post("/create", create);

router.post("/get", show);

router.delete("/delete", destroy);

export default router;
