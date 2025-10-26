import React, { useState } from "react";
import { PostType } from "@/types/post";
import Navbar from "@/components/global/Navbar";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";
import {
  storage,
  BUCKET_ID,
  ID_,
  DB_ID,
  tabelsDB,
  ITEMS_COLLECTIONS_ID,
} from "@/lib/appwrite";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "react-router";
import { Permission, Role } from "appwrite";
export default function CreatePost() {
  const { id } = useParams();
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({
    name: "",
    lastSeen: "",
    type: "",
    image: null,
    remarks: "",
    resolved: false,
    bounty: "",
    category: "Documents",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedFile = null;
      if (form.image) {
        uploadedFile = await storage.createFile({
          bucketId: BUCKET_ID,
          fileId: ID_.unique(),
          file: form.image,
        });
      }
      if (id && user) {
        await tabelsDB.createRow({
          databaseId: DB_ID,
          tableId: ITEMS_COLLECTIONS_ID,
          rowId: ID_.unique(),
          data: {
            name: form.name,
            lastseen: form.lastSeen,
            remarks: form.remarks,
            bounty: form.bounty,
            type: form.type,
            category: form.category,
            priority: form.priority,
            spaceId: id,
            resolved: form.resolved,
            createdBy: user?.$id,
            imageId: uploadedFile?.$id,
          },
          permissions: [
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
            Permission.read(Role.user(user.$id)),
          ],
        });
      }
      navigate(`/items/${id}`);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading)
    return (
      <div>
        <Spinner className="size-4" />
      </div>
    );
  return (
    <div>
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
            type="text"
            name="type"
            placeholder="Lost or found "
            value={form.type}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
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
