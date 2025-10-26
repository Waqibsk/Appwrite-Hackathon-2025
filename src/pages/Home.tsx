import React, { useEffect, useState } from "react";
import Navbar from "@/components/global/Navbar";
import {
  account,
  tabelsDB,
  DB_ID,
  SPACES_COLLECTIONS_ID,
} from "@/lib/appwrite";
import { Plus } from "lucide-react";
import { motion } from "framer-motion"
import { Query } from "appwrite";
import { SpaceType } from "@/types/space";
import { Spinner } from "@/components/ui/spinner";
import SpaceCard from "@/components/SpaceCard";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
export default function Home() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<SpaceType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await tabelsDB.listRows({
        databaseId: DB_ID,
        tableId: SPACES_COLLECTIONS_ID,
        queries: [],
      });
      setSpaces(res.rows as unknown as SpaceType[]);
      setLoading(false);
    };
    fetchSpaces();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <motion.div
     initial={{opacity:0,x:-20}} 
    animate={{opacity:1,x:0}}
      transition={{ duration: 0.3 }}
      
      className=" min-h-screen text-black ">
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold mb-4">Spaces</h1>
          <Button
            size="lg"
            variant="outline"
            className="bg-neutral-900 text-white px-5 flex items-center "
            onClick={() => {
              navigate("/space/create");
            }}
          >
            <Plus /> Create Space
          </Button>
        </div>
        {spaces.length === 0 ? (
          <p>No spaces found.</p>
        ) : (
          spaces.map((space) => (
            <SpaceCard
              key={space.$id}
              spaceId={space.$id}
              name={space.name}
              description={space.description}
              imageId={space.imageId || null}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
