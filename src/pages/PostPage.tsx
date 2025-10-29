import { DB_ID, ITEMS_COLLECTIONS_ID, tabelsDB } from "@/lib/appwrite";
import { PostType } from "@/types/post";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { p } from "react-router/dist/development/index-react-server-client-BbRcBjrA";
import Navbar from "@/components/global/Navbar";
import { Spinner } from "@/components/ui/spinner";
import { BUCKET_ID, storage } from "@/lib/appwrite";
import { motion, scale } from "framer-motion";

export default function PostPage() {
  const { id } = useParams();
  const [item, setItem] = useState<PostType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      console.log("POOST fetching");
      if (id) {
        const res = await tabelsDB.listRows({
          databaseId: DB_ID,
          tableId: ITEMS_COLLECTIONS_ID,
          queries: [Query.equal("$id", id)],
        });
        setItem(res.rows[0] as unknown as PostType);

        setIsloading(false);
      }
    };
    fetchPostDetails();
  }, []);
  useEffect(() => {
    if (item) {
      const tempUrl = storage.getFileDownload({
        bucketId: BUCKET_ID,
        fileId: item.imageId,
      });
      setImageUrl(tempUrl);
    }
  }, [item]);

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {loading ? (
        <div className="flex justify-center min-h-screen items-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        item && (
          <div className="flex  text-black min-h-screen max-[700px]:flex-col animate-fadeIn">
            <div className="p-5 w-3/5  max-[700px]:w-full  ">
              <h1 className="text-5xl py-3    max-[400px]:text-4xl">
                {item.name}
              </h1>
              {imageUrl && (
                <motion.div className=" my-3 pt-1 w-2/5  max-[700px]:w-[93%] max-[700px]:block hidden ">
                  <img
                    className="w-full rounded-[10px]"
                    src={imageUrl}
                    alt="Event Poster"
                  />
                </motion.div>
              )}
              <div className="text-xl py-2 px-2 font-poppins  animate-fadeIn max-[300px]:text-sm ugc-desc">
                {item?.remarks ?? ""}
                <div className="font-sans">
                  <div>
                    <span className="">
                      {" "}
                      <span className="font-bold">Last Seen:</span>{" "}
                      {item.lastseen} 
                    </span>
                  </div>
                  <div>
                    <span className="">
                      {" "}
                      <span className="font-bold ">Bounty:</span> {item.bounty?item.bounty:"None"}{" "}
                      Rupee
                    </span>
                  </div>

                  <div>
                    <span className="">
                      {" "}
                        <span className="font-bold">Created on :</span>   {new Date(item.$createdAt).toLocaleDateString("en-US")}{" "}
                    </span>
                  </div>


                </div>
              </div>
            </div>

            <div className=" m-3 pt-10 w-2/5  max-[700px]:hidden  block">
              {imageUrl && (
                <img
                  className="w-full rounded-[10px]"
                  src={imageUrl}
                  alt="Event Poster"
                />
              )}
            </div>
          </div>
        )
      )}
    </motion.div>
  );
}
