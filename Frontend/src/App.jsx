import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      console.error("Error loading tasks:", e);
    }
  };

  useEffect(fetchTasks, []);

  const parseTimeString = (ts) => {
    const p = new Date(`1970-01-01T${ts}`);
    if (!isNaN(p.getTime())) return p.toTimeString().slice(0, 5);
    const m = ts.match(/(\d+):?(\d{0,2})?\s*(AM|PM)?/i);
    if (!m) return "";
    let [_, h, min, ampm] = m;
    h = parseInt(h);
    min = min ? parseInt(min) : 0;
    if (/PM/i.test(ampm) && h < 12) h += 12;
    if (/AM/i.test(ampm) && h === 12) h = 0;
    if (isNaN(h) || isNaN(min)) return "";
    return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    let due = "";
    if (date) {
      const t = parseTimeString(time) || "00:00";
      due = `${date}T${t}`;
    }
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, dueDate: due }),
    });
    setTitle(""); setDate(""); setTime("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Notes & Tasks</h1>

      <form onSubmit={addTask} className="bg-white rounded p-4 max-w-xl mb-6 shadow-md">
        <input
          type="text"
          placeholder="Take a note..."
          className="w-full text-black text-lg mb-4 outline-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            className="text-black p-2 rounded flex-1"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="text"
            className="text-black p-2 rounded flex-1"
            placeholder="Time (e.g. 14:30 or 2:30 PM)"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <button className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 text-sm font-semibold">
  Add
</button>

      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks.length === 0 && <p className="text-gray-400">No tasks yet.</p>}
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
