import React from "react";
import { storage, BUCKET_ID } from "@/lib/appwrite";
import { useNavigate } from "react-router";
import { PostType } from "@/types/post";
export default function PostCard({ post }: { post: PostType }) {
  const navigate = useNavigate();
  let imageUrl = null;
  if (post.imageId) {
    imageUrl = storage.getFileDownload({
      bucketId: BUCKET_ID,
      fileId: post.imageId,
    });
  }

  return (
    <div
      className="w-[93%] h-[400px]  shadow-md border-[1px] border-slate-300 cursor-pointer flex flex-col m-3   "
      onClick={() => {
        navigate(`/item/${post.$id}`);
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
            <div className="font-semibold text-[20px] text-black">
              {post.name}
            </div>
            <div className="  overflow-hidden whitespace-nowrap text-ellipsis">
              {post.remarks}
            </div>
          </div>
          <div className="h-[60%] flex justify-center px-3 flex-col ">
            <div>LastSeen: {post.lastseen}</div>
            <div>Priority: {post.priority}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
