import React from "react";

export default function TaskCard({ id, title, dueDate, completed, onDelete, onToggleComplete }) {
  const now = new Date();
  const due = dueDate ? new Date(dueDate) : null;

  let status = "⏳ Pending";
  if (completed) status = "✅ Completed";
  else if (due && due < now) status = "❌ Missed";

  return (
    <div className="bg-white text-black rounded p-4 shadow-md relative flex flex-col justify-between min-h-[120px]">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          className="mr-3 w-5 h-5"
          checked={completed}
          onChange={() => onToggleComplete(id, !completed)}
        />
        <h3 className={`${completed ? "line-through text-gray-500" : "font-medium"} text-lg`}>
          {title}
        </h3>
      </div>

      {due && <p className="text-sm text-gray-600 mb-1">Due: {due.toLocaleString()}</p>}
      <p className="text-sm text-gray-700">Status: {status}</p>

      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-sm"
        title="Delete"
      >
        ✖
      </button>
    </div>
  );
}
