import React, { useEffect, useState } from "react";
import Navbar from "@/components/global/Navbar";
import {
  account,
  tabelsDB,
  DB_ID,
  SPACES_COLLECTIONS_ID,
} from "@/lib/appwrite";
import { Query } from "appwrite";
import { SpaceType } from "@/types/space";

import SpaceCard from "@/components/SpaceCard";

export default function Home() {
  const [spaces, setSpaces] = useState<SpaceType[]>([]);
  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await tabelsDB.listRows({
        databaseId: DB_ID,
        tableId: SPACES_COLLECTIONS_ID,
        queries: [],
      });
      setSpaces(res.rows as unknown as SpaceType[]);
    };
    fetchSpaces();
  }, []);

  return (
    <div className=" min-h-screen text-black ">
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Spaces</h1>
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
    </div>
  );
}
