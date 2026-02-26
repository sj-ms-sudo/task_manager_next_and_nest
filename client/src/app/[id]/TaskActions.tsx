"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskActions({ task }: { task: any }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    completed: task.completed,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleDelete() {
    const res = await fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleUpdate() {
    const res = await fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-6 space-y-4">

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <div>
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Completed
        </label>
      </div>

      <div>
        {["low", "medium", "high"].map((level) => (
          <label key={level} className="mr-4">
            <input
              type="radio"
              name="priority"
              value={level}
              checked={form.priority === level}
              onChange={handleChange}
            />
            {level}
          </label>
        ))}
      </div>

      <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2">
        Save
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 ml-4"
      >
        Delete
      </button>

    </div>
  );
}