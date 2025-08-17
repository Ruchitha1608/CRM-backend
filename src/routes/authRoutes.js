import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/protected", authenticate, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user, // decoded info from JWT
  });
});

export default router;
