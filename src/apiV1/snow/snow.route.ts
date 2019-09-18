import Controller from "./snow.controller";
import { Router } from "express";
import verifyToken from "../../helpers/verifyToken";

const router: Router = Router();
const controller = new Controller();

// Retrieve all Snows
router.post("/openCase", verifyToken, controller.openCase);
router.post("/closeCase", verifyToken, controller.closeCase);
router.post("/openCloseCase", verifyToken, controller.openCloseCase);

export default router;
