const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const tasksFile = path.join(__dirname, "tasks.json");

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

app.get("/tasks", async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const tasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    dueDate: req.body.dueDate || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const tasks = await readTasks();
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  
  const t = tasks[idx];
  if (req.body.completed !== undefined) t.completed = req.body.completed;
  if (req.body.title !== undefined) t.title = req.body.title;
  if (req.body.dueDate !== undefined) t.dueDate = req.body.dueDate;
  tasks[idx] = t;
  await writeTasks(tasks);
  res.json(t);
});

app.delete("/tasks/:id", async (req, res) => {
  const tasks = await readTasks();
  const filtered = tasks.filter(t => t.id !== Number(req.params.id));
  if (filtered.length === tasks.length) return res.status(404).json({ error: "Not found" });
  await writeTasks(filtered);
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
