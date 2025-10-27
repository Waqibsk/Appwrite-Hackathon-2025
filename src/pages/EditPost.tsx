import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate, useParams } from "react-router";
import {
  storage,
  BUCKET_ID,
  ID_,
  DB_ID,
  tabelsDB,
  ITEMS_COLLECTIONS_ID,
} from "@/lib/appwrite";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

interface PostFormState {
  name: string;
  lastSeen: string;
  type: string;
  image: File | null;
  remarks: string;
  bounty: string;
  category: string;
  priority: string;
  originalImageId?: string;
}

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState<PostFormState>({
    name: "",
    lastSeen: "",
    type: "",
    image: null,
    remarks: "",
    bounty: "",
    category: "Documents",
    priority: "medium",
  });

  const [loadingPost, setLoadingPost] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const post = await tabelsDB.getRow({
          databaseId: DB_ID,
          tableId: ITEMS_COLLECTIONS_ID,
          rowId: id,
        });

        setForm({
          name: post.name || "",
          lastSeen: post.lastseen || "",
          type: post.type || "",
          remarks: post.remarks || "",
          bounty: post.bounty || "",
          category: post.category || "Documents",
          priority: post.priority || "medium",
          image: null,
          originalImageId: post.imageId,
        });
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setForm({ ...form, [name]: files[0] });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmitting(true);

    try {
      let imageIdToUpdate = form.originalImageId;

      if (form.image) {
        const newFile = await storage.createFile({
          bucketId: BUCKET_ID,
          fileId: ID_.unique(),
          file: form.image,
        });
        imageIdToUpdate = newFile.$id;

        if (form.originalImageId) {
          await storage.deleteFile({
            bucketId: BUCKET_ID,
            fileId: form.originalImageId,
          });
        }
      }

      const dataToUpdate = {
        name: form.name,
        lastseen: form.lastSeen,
        remarks: form.remarks,
        bounty: form.bounty,
        type: form.type,
        category: form.category,
        priority: form.priority,
        imageId: imageIdToUpdate,
      };

      await tabelsDB.updateRow({
        databaseId: DB_ID,
        tableId: ITEMS_COLLECTIONS_ID,
        rowId: id,
        data: dataToUpdate,
      });

      navigate(`/item/${id}`);
    } catch (err) {
      console.error("Failed to update post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || loadingPost) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-lg mx-auto mt-8 p-6 border rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Lost/Found Post</h2>
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
            name="lastSeen"
            placeholder="Last Seen"
            value={form.lastSeen}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "Lost" })}
              className={`border p-2 rounded w-full ${
                form.type === "Lost"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700"
              }`}
            >
              Lost
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, type: "Found" })}
              className={`border p-2 rounded w-full ${
                form.type === "Found"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700"
              }`}
            >
              Found
            </button>
          </div>

          <label
            htmlFor="image-upload"
            className="text-sm font-medium text-gray-700"
          >
            Upload a new image (optional)
          </label>
          <input
            id="image-upload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
            disabled={isSubmitting}
            className="bg-neutral-800 text-white p-2 rounded hover:bg-neutral-700 disabled:bg-blue-300 flex items-center justify-center"
          >
            {isSubmitting ? <Spinner className="size-4 mr-2" /> : null}
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
