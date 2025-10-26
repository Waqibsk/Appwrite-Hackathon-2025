import React from "react";
import { storage } from "@/lib/appwrite";
import { useNavigate } from "react-router";
import { BUCKET_ID } from "@/lib/appwrite";
export default function SpaceCard({
  name,
  description,
  imageId,
  spaceId,
}: {
  name: string;
  description: string;
  imageId: string | null;
  spaceId: string;
}) {
  const navigate = useNavigate();
  let imageUrl = null;
  if (imageId) {
    imageUrl = storage.getFileDownload({
      bucketId: BUCKET_ID,
      fileId: imageId,
    });
  }
  return (
    <div
      className="border-[1px] border-slate-400 m-4 "
      onClick={() => {
        navigate(`/items/${spaceId}`);
        window.scrollTo(0, 0);
      }}
    >
      <div className=" rounded-lg h-[200px] cursor-pointer shadow-sm hover:shadow-xl flex max-sm:flex-col">
        {imageUrl && (
          <div className="w-full h-full flex justify-center ">
            <img
              src={imageUrl}
              className="max-sm:h-[100px] h-full w-full object-cover"
              alt=""
            />
          </div>
        )}
        <div className=" w-full  border-l-[2px] p-4 border-slate-100/40  ">
          <div className="flex justify-center font-semibold text-2xl mb-2  w-[100%] ">
            {name}
          </div>

          <div className="w-[100%] max-[500px]:my-4 flex justify-center">
            {description.split(" ").slice(0, 40).join(" ") +
              (description.split(" ").length > 20 ? "..." : "")}
          </div>
        </div>
      </div>
    </div>
  );
}
