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

import { storeUser } from "../Controllers/user.js";

/*
# Generators
Making sure that every key-pair-value is the right value for the database. If not, it will send a res back.
*/

router.post("/register", storeUser);

export default router;
