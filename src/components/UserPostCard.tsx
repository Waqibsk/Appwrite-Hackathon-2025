import React, { SetStateAction, useState } from "react";
import { storage, BUCKET_ID } from "@/lib/appwrite";
import { useNavigate } from "react-router";
import { DB_ID, tabelsDB, ITEMS_COLLECTIONS_ID } from "@/lib/appwrite";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Pencil, CheckCircle, Undo2 } from "lucide-react";
import { Trash2 } from "lucide-react";
import { PostType } from "@/types/post";
import { motion } from "framer-motion";
export default function UserPostCard({
  item,
  onToggleResolve,
  setItems,
  setResolvedItems,
  setNotResolvedItems,
}: {
  item: PostType;
  setItems: React.Dispatch<SetStateAction<any[]>>;
  setResolvedItems: React.Dispatch<SetStateAction<any[]>>;
  setNotResolvedItems: React.Dispatch<SetStateAction<any[]>>;
  onToggleResolve: (toggledItem: PostType) => void;
}) {
  const { $id: id, name, resolved } = item;
  const [isTogglingResolve, setIsTogglingResolve] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleToggleResolve = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTogglingResolve(true);
    try {
      const newResolvedStatus = !resolved;

      await tabelsDB.updateRow({
        databaseId: DB_ID,
        tableId: ITEMS_COLLECTIONS_ID,
        rowId: id,
        data: { resolved: newResolvedStatus },
      });

      const updatedItem = { ...item, resolved: newResolvedStatus };

      onToggleResolve(updatedItem);
    } catch (error) {
      console.error("Failed to toggle resolved status:", error);
      alert("Could not update item status.");
    } finally {
      setIsTogglingResolve(false);
    }
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const itemDoc = await tabelsDB.getRow({
        databaseId: DB_ID,
        tableId: ITEMS_COLLECTIONS_ID,
        rowId: id,
      });

      if (itemDoc.imageId) {
        await storage.deleteFile({
          bucketId: BUCKET_ID,
          fileId: itemDoc.imageId,
        });
      }

      await tabelsDB.deleteRow({
        databaseId: DB_ID,
        tableId: ITEMS_COLLECTIONS_ID,
        rowId: id,
      });

      setResolvedItems((prevItems) =>
        prevItems.filter((item) => item.$id !== id)
      );
      setNotResolvedItems((prevItems) =>
        prevItems.filter((item) => item.$id !== id)
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Could not delete item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="w-[98%] h-[60px]  shadow-md border-[1px] border-slate-300 cursor-pointer flex flex-col m-3   "
      onClick={() => {
        if (isDeleting) return;
        navigate(`/item/${id}`);
        window.scrollTo(0, 0);
      }}
    >
      <div>
        <div className="flex flex-col  w-full ">
          <div className=" flex  p-3  h-full justify-between  items-center">
            <div className="font-md text-black">{name}</div>
            <div className="flex gap-4 m-2 items-center">
              <div
                onClick={handleToggleResolve}
                className={`cursor-pointer ${resolved ? "text-amber-600" : "text-green-600"}`}
                title={resolved ? "Mark as Unresolved" : "Mark as Resolved"}
              >
                {isTogglingResolve ? (
                  <Spinner className="size-5" />
                ) : resolved ? (
                  <Undo2 className="size-5" />
                ) : (
                  <CheckCircle className="size-5" />
                )}
              </div>
              <div
                onClick={handleDelete}
                className=" bg-transparent text-black "
              >
                {isDeleting ? (
                  <Spinner className="size-5" />
                ) : (
                  <Trash2 className="size-5" />
                )}
              </div>
              <div
                className="bg-transparent text-black border-none "
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/item/edit/${id}`);
                }}
              >
                <Pencil className="size-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
