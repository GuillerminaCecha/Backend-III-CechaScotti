import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";

const sessionsController = new SessionsController();
const router = Router();

router.post("/register", sessionsController.register);
router.post("/login", sessionsController.login);
router.get("/current", sessionsController.current);
router.get("/unprotectedLogin", sessionsController.unprotectedLogin);
router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

export default router;