import React from "react";
import { storage, BUCKET_ID } from "@/lib/appwrite";
import { useNavigate } from "react-router";
export default function PostCard({
  id,
  name,
  remarks,
  imageId,
}: {
  id: string;
  name: string;
  remarks: string;
  imageId: string;
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
      className="w-[93%] h-[400px]  shadow-md border-[1px] border-slate-300 cursor-pointer flex flex-col m-3   "
      onClick={() => {
        navigate(`/item/${id}`);
        window.scrollTo(0, 0);
      }}
    >
      <div>
        <div className="h-[180px]">
          {imageUrl && (
            <img
              className="w-full h-full object-cover "
              src={imageUrl}
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col h-[70%]">
          <div className=" p-3 flex flex-col h-full justify-center  border-b-[1px] border-slate-300">
            <div className="font-semibold text-[20px] text-black">{name}</div>
            <div className="  overflow-hidden whitespace-nowrap text-ellipsis">
              {remarks}
            </div>
          </div>
          <div className="h-[60%] ">hi</div>
        </div>
      </div>
    </div>
  );
}
