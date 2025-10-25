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
      className="bg-neutral-200 m-4 "
      onClick={() => {
        navigate(`/items/${spaceId}`);
      }}
    >
      <div className=" rounded-lg h-[200px] cursor-pointer flex max-sm:flex-col">
        {imageUrl && (
          <div className="w-full h-full flex justify-center ">
            <img
              src={imageUrl}
              className="max-sm:h-[100px] h-full w-full object-cover"
              alt=""
            />
          </div>
        )}
        <div className="flex flex-col w-full items-center border-l-[2px] border-slate-100/40  ">
          <div>
            <div className="font-semibold text-2xl mb-2  w-[100%]">{name}</div>

            <div className="w-[100%] max-[500px]:my-4">
              {description.split(" ").slice(0, 40).join(" ") +
                (description.split(" ").length > 20 ? "..." : "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
