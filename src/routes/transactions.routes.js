import { Router } from "express"
import { getUserTransactionsController, getTransactionsController } from "../controllers/transections.controllers.js";

const router = Router();


router.get("/user/:userId", getUserTransactionsController);
router.get("/", getTransactionsController)


export default router;