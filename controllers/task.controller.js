// create task controller
import catchAsync from "../config/catchAsync.js";
import Task from "../schema/task.js";
/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} task
 * @description create a task
 * @function createTask
 * @async
 *
 */

const createTask = catchAsync(async (req, res) => {
  let { title, description, status, priority } = req.body;
  //validate  each field
  if (!title || !description) {
    return res.status(400).send({
      message: "Please fill in all required fields",
    });
  }
  //validate priority field
  const allowedPriority = ["Low", "Medium", "High"];
  if (priority && !allowedPriority.includes(priority)) {
    return res.status(400).send({
      message: `Priority must be one of ${allowedPriority.join(", ")}`,
    });
  }
  //validate status field
  const allowedStatus = ["Pending", "Completed"];
  if (status && !allowedStatus.includes(status)) {
    return res.status(400).send({
      message: `Status must be one of ${allowedStatus.join(", ")}`,
    });
  }

  const task = new Task({
    title: title,
    description: description,
    status: status,
    priority: priority,
    user: req.user._id,
  });
  task
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.send(error));
});
const getTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).populate("user");
  if (!tasks) {
    return res.status(404).send({ error: "No tasks found" });
  }

  res.send(tasks);
});
//get single task
const getTask = catchAsync(async (req, res) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }
  res.send(task);
});
//update task
const updateTask = catchAsync(async (req, res) => {
  let { title, description, status, priority } = req.body;
  //validate  each field
  // if (!title || !description) {
  //   return res.status(400).send({
  //     message: "Please fill in all required fields",
  //   });
  // }
  //validate priority field
  const allowedPriority = ["Low", "Medium", "High"];
  if (priority && !allowedPriority.includes(priority)) {
    return res.status(400).send({
      message: `Priority must be one of ${allowedPriority.join(", ")}`,
    });
  }
  //validate status field
  const allowedStatus = ["Pending", "Completed"];
  if (status && !allowedStatus.includes(status)) {
    return res.status(400).send({
      message: `Status must be one of ${allowedStatus.join(", ")}`,
    });
  }
  const task = await Task.findByIdAndUpdate(req.params.id, {
    title,
    description,
    status,
    priority,
  });
  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }
  res.send(task);
});
//delete task
const deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }
  res.send(task);
});
export { createTask, deleteTask, getTask, getTasks, updateTask };
