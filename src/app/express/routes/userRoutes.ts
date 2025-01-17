import { createUser, validateUser } from "../controllers/userControllers";
import { Router } from "express";
const router = Router();

router.post("/createUser", createUser);
router.post("/validateUser", validateUser);

export { router };
