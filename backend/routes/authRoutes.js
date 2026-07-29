import express from "express";
import { register, login, profile } from "../controllers/authController.js";
import { protect } from "../middlewares/authenticate.js";
import { validateRegister } from "../middlewares/validateRegister.js";
import { validateLogin } from "../middlewares/validateLogin.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login)

router.get("/me", protect, profile);
export default router ;