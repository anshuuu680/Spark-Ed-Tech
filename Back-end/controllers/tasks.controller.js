import { Task } from "../models/User/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    console.log(title,description,isCompleted);

    if (!title) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Title is required"));
    }
    const id = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userTask = await Task.findOne({
      userId: id,
      createdAt: { $gte: today },
    });

    const newTask = { title, description, isCompleted };

    if (userTask) {
      userTask.tasks.push(newTask);
      await userTask.save();
    } else {
      await Task.create({
        userId: id,
        tasks: [newTask],
      });
    }

    const userTasks = await Task.findOne({
      userId: id,
      createdAt: { $gte: today },
    });

    

    res
      .status(200)
      .json(new ApiResponse(200, userTasks, "Task added successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const getTasks = async (req, res) => {
  try {
    const id = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userTask = await Task.findOne({
      userId: id,
      createdAt: { $gte: today },
    });

    if (!userTask) {
      return res
        .status(200)
        .json(
          new ApiResponse(200,[],"No task for today")
        );
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, userTask, "Today's tasks fetched successfully")
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, isCompleted } = req.body;

    if (!title && !description && isCompleted === undefined) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "No valid fields provided to update"));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userTask = await Task.findOne({
      "tasks._id": taskId,
      userId: req.user._id,
      createdAt: { $gte: today },
    });

    if (!userTask) {
      return res.status(404).json(new ApiResponse(404, null, "Task not found"));
    }

    const task = userTask.tasks.id(taskId);
    if (title) task.title = title;
    if (description) task.description = description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    await userTask.save();

    res.status(200).json(new ApiResponse(200, "Task updated successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const id = req.user._id;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userTask = await Task.findOne({
      "tasks._id": taskId,
      userId: id,
      createdAt: { $gte: today },
    });

    if (!userTask) {
      return res.status(404).json(new ApiResponse(404, "User tasks not found"));
    }

    userTask.tasks = userTask.tasks.filter(
      (task) => task._id.toString() !== taskId.toString()
    );

    await userTask.save();

    res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    const { taskId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userTask = await Task.findOne({
      "tasks._id": taskId,
      userId: req.user._id,
      createdAt: { $gte: today },
    });

    if (!userTask) {
      return res.status(404).json(new ApiResponse(404, null, "Task not found"));
    }

    const task = userTask.tasks.id(taskId);

    if (task) {
      task.isCompleted = !task.isCompleted;
    }
    await userTask.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Task completion toggled successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
