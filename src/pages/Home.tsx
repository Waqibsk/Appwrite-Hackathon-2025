import  { useEffect, useState } from "react";
import {
  tabelsDB,
  DB_ID,
  SPACES_COLLECTIONS_ID,
} from "@/lib/appwrite";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { SpaceType } from "@/types/space";
import { Spinner } from "@/components/ui/spinner";
import SpaceCard from "@/components/SpaceCard";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
export default function Home() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<SpaceType[]>([]);
  const [Loading, setLoading] = useState(true);
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

  if (!user && !loading) {
    navigate("/signin");
  }

  if (Loading || loading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className=" min-h-screen text-black "
    >
      <div className="p-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full lg:w-[80%] mb-4">
            <h1 className="text-[40px]  mb-4 font-serif">Spaces</h1>
            <p>
              Each Space is a dedicated area created to handle lost and found
              items for a particular place like a campus, hostel, office, or
              event. These spaces keep things organized so users only see items
              relevant to their location or community. Anyone within a space can
              report lost belongings or share found items to help others. The
              goal is to make finding and returning items quick, safe, and
              location-focused.
            </p>
          </div>
          {user?.labels.includes("admin") && (
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
          )}
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
