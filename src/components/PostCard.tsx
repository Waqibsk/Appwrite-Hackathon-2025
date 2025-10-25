import React from "react";
import { storage, BUCKET_ID } from "@/lib/appwrite";
import { useNavigate } from "react-router";
export default function PostCard({
  id,
  name,
  imageId,
}: {
  id:string,
  name: string;
  imageId: string;
}) {
  const navigate=useNavigate()
  let imageUrl = null;
  if (imageId) {
    imageUrl = storage.getFileDownload({
      bucketId: BUCKET_ID,
      fileId: imageId,
    });
  }

  return (
    <div className="w-[200px] flex flex-col bg-black " onClick={() => {
      navigate(`/item/${id}`)
    }}>
      <div>{imageUrl && <img src={imageUrl} alt="" />}</div>
      <div>{name}</div>
      <div></div>
    </div>
  );
}
