import { Spinner } from "@/components/ui/spinner";
import UserPostCard from "@/components/UserPostCard";
import { useUser } from "@/context/UserContext";
import { DB_ID, ITEMS_COLLECTIONS_ID, tabelsDB } from "@/lib/appwrite";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { user, loading } = useUser();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    const fetchItems = async () => {
      try {
        const result = await tabelsDB.listRows({
          databaseId: DB_ID,
          tableId: ITEMS_COLLECTIONS_ID,
          queries: [Query.equal("createdBy", user.$id)],
        });

        setItems(result.rows);
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
    <div>
      {user?.email}
      <div>
        {items.length === 0 ? (
          <p className="m-4"> No items to show</p>
        ) : (
          items.map((item) => (
            <UserPostCard
              key={item.$id}
              name={item.name}
              id={item.$id}
              setItems={setItems}
            />
          ))
        )}
      </div>
    </div>
  );
}
