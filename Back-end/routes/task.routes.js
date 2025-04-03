import { Router } from "express";
import { addTask, getTasks, updateTask, deleteTask, toggleTaskCompletion } from "../controllers/tasks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Add a new task
router.post("/", verifyJWT, addTask);

// Get all tasks
router.get("/get-tasks", verifyJWT, getTasks);

// Update a task
router.put("/:taskId", verifyJWT, updateTask);

// Delete a task
router.delete("/:taskId", verifyJWT, deleteTask);

// Toggle task completion status
router.patch("/:taskId/toggle", verifyJWT, toggleTaskCompletion);

export default router;
