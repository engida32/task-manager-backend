import express from "express";
import login from "../controllers/auth.controller.js";

const router = express.Router();
//login route
router.post("/login", async (req, res) => {
  login(req, res);
});
export default router;
