import React, { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { useParams } from "react-router";
import { Button } from "./ui/button";
import { PostType } from "@/types/post";
import { useNavigate } from "react-router";
import { DB_ID, ITEMS_COLLECTIONS_ID, storage, tabelsDB } from "@/lib/appwrite";
import { Query } from "appwrite";
import Navbar from "./global/Navbar";
import PostCard from "./PostCard";
import { p } from "react-router/dist/development/index-react-server-client-BbRcBjrA";

export default function ItemsList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (id) {
          const res = await tabelsDB.listRows({
            databaseId: DB_ID,
            tableId: ITEMS_COLLECTIONS_ID,
            queries: [Query.equal("spaceId", id)],
          });
          setItems(res.rows as unknown as PostType[]);

          console.log("THISJjl", res.rows);

          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner className="size-4" />
      ) : (
        <div>
          <Navbar />
          <div className="flex flex-col">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  navigate(`/create/${id}`);
                }}
              >
                Create Post
              </Button>
            </div>
            <div>
              {items.length === 0 ? (
                <p> hello no items</p>
              ) : (
                items.map((item) => (
                  <PostCard name={item.name} id={item.$id } imageId={item.imageId} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
