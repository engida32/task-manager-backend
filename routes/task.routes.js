import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
const router = express.Router();
router.post("/", async (req, res) => {
  createTask(req, res);
});
router.get("/", (req, res) => {
  getTasks(req, res);
});
router.get("/:id", (req, res) => {
  getTask(req, res);
});
router.patch("/:id", (req, res) => {
  updateTask(req, res);
});
router.delete("/:id", (req, res) => {
  deleteTask(req, res);
});

export default router;
