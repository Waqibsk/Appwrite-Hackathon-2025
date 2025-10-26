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

          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center min-h-screen items-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <div className="flex justify-start m-4">
              <Button
                onClick={() => {
                  navigate(`/create/${id}`);
                }}
              >
                Create Post
              </Button>
            </div>
            <div className="grid grid-cols-5  max-lg:grid-cols-4 gap-2 max-md:grid-cols-3 min-h-screen max-sm:grid-cols-2 max-[380px]:grid-cols-1 ">
              {items.length === 0 ? (
                <p className="m-4"> No items to show</p>
              ) : (
                items.map((item) => (
                  <PostCard
                    remarks={item.remarks}
                    key={item.$id}
                    name={item.name}
                    id={item.$id}
                    imageId={item.imageId}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
