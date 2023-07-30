import { Router } from "express";
const router = Router();

import {
  isValidAdminToken,
  login,
  logout,
} from "../../controllers/apiControllers/authJwtController.js";

router.route("/login").post(login);
router.route("/logout").post(isValidAdminToken, logout);

export default router;
