const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const path = require("path");

const tasksFile = path.join(__dirname, "..", "data", "tasks.json");

async function readTasks() {
  try {
    return await fs.readJson(tasksFile);
  } catch {
    return [];
  }
}

async function writeTasks(tasks) {
  await fs.writeJson(tasksFile, tasks, { spaces: 2 });
}

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// POST create new task
router.post("/", async (req, res) => {
  const tasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    dueDate: req.body.dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.json(newTask);
});

// PUT update task by id
router.put("/:id", async (req, res) => {
  const tasks = await readTasks();
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks[index] = { ...tasks[index], ...req.body };
  await writeTasks(tasks);
  res.json(tasks[index]);
});

// DELETE task by id
router.delete("/:id", async (req, res) => {
  const tasks = await readTasks();
  const id = Number(req.params.id);
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length)
    return res.status(404).json({ error: "Task not found" });

  await writeTasks(filtered);
  res.json({ success: true });
});

module.exports = router;
