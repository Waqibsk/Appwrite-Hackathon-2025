import React from "react";
import Navbar from "@/components/global/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SpaceType } from "@/types/space";
import {
  BUCKET_ID,
  ID_,
  storage,
  tabelsDB,
  DB_ID,
  SPACES_COLLECTIONS_ID,
} from "@/lib/appwrite";
import { Permission, Role } from "appwrite";
export default function CreateSpace() {
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({
    name: "",
    image: null,
    description: "",
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
      await tabelsDB.createRow({
        databaseId: DB_ID,
        tableId: SPACES_COLLECTIONS_ID,
        rowId: ID_.unique(),
        data: {
          name: form.name,
          description: form.description,
          imageId: uploadedFile?.$id,
        },
      });
      console.log("CREATED SPACE ");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />
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
