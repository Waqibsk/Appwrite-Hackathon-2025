import { Spinner } from "@/components/ui/spinner";
import UserPostCard from "@/components/UserPostCard";
import { useUser } from "@/context/UserContext";
import { DB_ID, ITEMS_COLLECTIONS_ID, tabelsDB } from "@/lib/appwrite";
import { PostType } from "@/types/post";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";

import {motion, scale} from "framer-motion"

export default function Profile() {
  const { user, loading } = useUser();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resolvedItems, setResolvedItems] = useState<any[]>([]);
  const [notResolvedItems, setNotResolvedItems] = useState<any[]>([]);

  const handleToggleResolve = (toggledItem: PostType) => {
    if (toggledItem.resolved) {
      setNotResolvedItems((prev) =>
        prev.filter((item) => item.$id !== toggledItem.$id)
      );
      setResolvedItems((prev) => [...prev, toggledItem]);
    } else {
      setResolvedItems((prev) =>
        prev.filter((item) => item.$id !== toggledItem.$id)
      );
      setNotResolvedItems((prev) => [...prev, toggledItem]);
    }
  };
  useEffect(() => {
    if (loading || !user) return;

    const fetchItems = async () => {
      try {
        const result = await tabelsDB.listRows({
          databaseId: DB_ID,
          tableId: ITEMS_COLLECTIONS_ID,
          queries: [Query.equal("createdBy", user.$id)],
        });
        const rows = result.rows;
        setItems(rows);

        const resolved = rows.filter((item: any) => item.resolved === true);

        const notResolved = rows.filter((item: any) => item.resolved === false);

        setResolvedItems(resolved);
        setNotResolvedItems(notResolved);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [user, loading]);
  if (!user) {
    <div>hello</div>;
  }

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <motion.div
   initial={{x:-20,opacity:0}} 
   animate={{x:0,opacity:1}}
   transition={{duration:0.3}}
    >
      <div className="text-[40px] fonr-semibold p-3">Dashboard</div>

      <div className="p-4">
        <h1 className="">Not Resolved</h1>
        <div>
          {notResolvedItems.length === 0 ? (
            <p className="m-4"> No items to show</p>
          ) : (
            notResolvedItems.map((item) => (
              <UserPostCard
                key={item.$id}
                setItems={setItems}
                onToggleResolve={handleToggleResolve}
                item={item}
              />
            ))
          )}
        </div>
      </div>
      <div className="p-4">
        <h1>Resolved</h1>
        <div>
          {resolvedItems.length === 0 ? (
            <p className="m-4"> No items to show</p>
          ) : (
            resolvedItems.map((item) => (
              <UserPostCard
                key={item.$id}
                item={item}
                setItems={setItems}
                onToggleResolve={handleToggleResolve}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
