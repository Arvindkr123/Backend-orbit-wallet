import { Router } from "express"
import { getUserByIdController } from "../controllers/users.controllers.js";

const router = Router();

router.get("/:id", getUserByIdController)
export default router;