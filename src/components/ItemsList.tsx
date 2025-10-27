import React, { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { useParams } from "react-router";
import { Button } from "./ui/button";
import { PostType } from "@/types/post";
import { useNavigate } from "react-router";
import {
  DB_ID,
  ITEMS_COLLECTIONS_ID,
  SPACES_COLLECTIONS_ID,
  storage,
  tabelsDB,
} from "@/lib/appwrite";
import { Query } from "appwrite";
import PostCard from "./PostCard";
import { Plus } from "lucide-react";
import { ArrowDownWideNarrow } from "lucide-react";
import { motion } from "framer-motion";
export default function ItemsList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PostType[]>([]);
  const [LostItems, setLostItems] = useState<PostType[]>([]);
  const [FoundItems, setFoundItems] = useState<PostType[]>([]);
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (id) {
          const res = await tabelsDB.listRows({
            databaseId: DB_ID,
            tableId: ITEMS_COLLECTIONS_ID,
            queries: [Query.equal("spaceId", id)],
          });
          const spaceRes = await tabelsDB.listRows({
            databaseId: DB_ID,
            tableId: SPACES_COLLECTIONS_ID,
            queries: [Query.equal("$id", id)],
          });
          setSpaceDescription(spaceRes.rows[0].description);

          setSpaceName(spaceRes.rows[0].name);
          const rows = res.rows;

          setItems(rows as unknown as PostType[]);

          if (rows) {
            const lostItems = rows.filter((item) => item.type === "Lost");

            const foundItems = rows.filter((item) => item.type === "Found");
            setLostItems(lostItems as unknown as PostType[]);
            setFoundItems(foundItems as unknown as PostType[]);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  const handleSortbyTime = (name: string) => {
    if (name == "lost") {
      setLostItems(
        [...items]
          .filter((item) => item.type === "Lost")
          .sort(
            (a, b) =>
              new Date(b.$createdAt).getTime() -
              new Date(a.$createdAt).getTime()
          )
      );
    } else if (name == "found") {
      setFoundItems(
        [...items]
          .filter((item) => item.type === "Found")
          .sort(
            (a, b) =>
              new Date(b.$createdAt).getTime() -
              new Date(a.$createdAt).getTime()
          )
      );
    } else {
      setItems(
        [...items].sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        )
      );
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className=""
    >
      {loading ? (
        <div className="flex justify-center min-h-screen items-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <div className="flex justify-between m-4">
              <div>
                <div className="flex flex-col w-[80%] mb-4">
                  <h1 className="text-[40px]  mb-4 font-serif">{spaceName}</h1>
                  <p>{spaceDescription}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigate(`/create/${id}`);
                }}
              >
                <Plus /> Create Post
              </Button>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h1 className="p-4 font-semibold text-[30px]">Lost Items</h1>
                <Button
                  className="flex m-2  items-center  "
                  onClick={() => {
                    handleSortbyTime("lost");
                  }}
                >
                  <ArrowDownWideNarrow /> Recent
                </Button>
              </div>
              <div className="grid grid-cols-5  max-lg:grid-cols-4 gap-2 max-md:grid-cols-3 max-h-[500px] max-sm:grid-cols-2 max-[380px]:grid-cols-1 ">
                {LostItems.length === 0 ? (
                  <p className="m-4"> No items to show</p>
                ) : (
                  LostItems.map((item) => <PostCard post={item} />)
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h1 className="p-4 font-semibold text-[30px]">Found Items</h1>
                <Button
                  className="flex m-2  items-center  "
                  onClick={() => {
                    handleSortbyTime("found");
                  }}
                >
                  <ArrowDownWideNarrow /> Recent
                </Button>
              </div>
              <div className="grid grid-cols-5  max-lg:grid-cols-4 gap-2 max-md:grid-cols-3  max-h-[500px] max-sm:grid-cols-2 max-[380px]:grid-cols-1 ">
                {FoundItems.length === 0 ? (
                  <p className="m-4"> No items to show</p>
                ) : (
                  FoundItems.map((item) => <PostCard post={item} />)
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h1 className="p-4 font-semibold text-[30px]">All Items</h1>
                <Button
                  className="flex m-2  items-center  "
                  onClick={() => {
                    handleSortbyTime("all");
                  }}
                >
                  <ArrowDownWideNarrow /> Recent
                </Button>
              </div>
              <div className="grid grid-cols-5  max-lg:grid-cols-4 gap-1 max-md:grid-cols-3 max-h-[500px] max-sm:grid-cols-2 max-[380px]:grid-cols-1 ">
                {items.length === 0 ? (
                  <p className="m-4"> No items to show</p>
                ) : (
                  items.map((item) => <PostCard post={item} />)
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
