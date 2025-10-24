import React, { useState } from "react";
import { PostType } from "@/types/post";
import Navbar from "@/components/global/Navbar";
export default function CreatePost() {
  const [form, setForm] = useState<PostType>({
    name: "",
    lastSeen: "",
    image: null,
    remarks: "",
    bounty: "",
    category: "urgent",
    priority: "medium",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post Data:", form);
    alert("Post submitted! Check console for data.");
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-8 p-6 border rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Lost/Found Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="lastSeen"
            placeholder="Last Seen"
            value={form.lastSeen}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="remarks"
            placeholder="Remarks / Description"
            value={form.remarks}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="bounty"
            placeholder="Bounty (optional)"
            value={form.bounty}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="urgent">Urgent</option>
            <option value="docs">Documents</option>
            <option value="accessory">Accessory</option>
            <option value="money">Money</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}
