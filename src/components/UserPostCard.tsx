import React, { useState } from "react";
import { storage, BUCKET_ID } from "@/lib/appwrite";
import { useNavigate } from "react-router";
import { DB_ID, tabelsDB, ITEMS_COLLECTIONS_ID } from "@/lib/appwrite";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
export default function UserPostCard({
  id,
  name,
  setItems,
}: {
  id: string;
  name: string;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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

      setItems((prevItems) => prevItems.filter((item) => item.$id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Could not delete item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div
      className="w-[93%] h-[50px]  shadow-md border-[1px] border-slate-300 cursor-pointer flex flex-col m-3   "
      onClick={() => {
        if (isDeleting) return;
        navigate(`/item/${id}`);
        window.scrollTo(0, 0);
      }}
    >
      <div>
        <div className="flex flex-col  w-full ">
          <div className=" flex  p-3  h-full justify-between  border-b-[1px] border-slate-300">
            <div className="font-md text-black">{name}</div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-20"
              >
                {isDeleting ? <Spinner className="size-4" /> : "Delete"}
              </Button>
              <Button
                variant="outline"
                disabled={isDeleting}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/item/edit/${id}`);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
