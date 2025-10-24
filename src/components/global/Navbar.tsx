import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { account } from "@/lib/appwrite";

export default function Navbar() {
  const [user, setUser] = useState<any>("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await account.get();
        setUser(user);
        return user;
      } catch (err) {
        console.error("No active session:", err);
        return null;
      }
    }
    getCurrentUser();
  }, []);
  const handleLogout = async () => {
    await account.deleteSession({
      sessionId: "current",
    });
    window.location.reload();
  };
  return (
    <div className="flex justify-end  m-4 gap-3">
      {!user && (
        <Button
          size="lg"
          variant="outline"
          className="bg-neutral-900 text-white  rounded-[12px]"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Signin
        </Button>
      )}
      {user && (
        <Button
          size="lg"
          variant="outline"
          className="bg-neutral-900 text-white  rounded-[12px]"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
      {user && (
        <Button
          size="lg"
          variant="outline"
          className="bg-neutral-900 text-white  rounded-[12px]"
          onClick={() => {
            navigate("/space/create");
          }}
        >
          Create Space
        </Button>
      )}

      {user && (
        <Button
          size="lg"
          variant="outline"
          className="bg-neutral-900 text-white  rounded-[12px]"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create Post
        </Button>
      )}
    </div>
  );
}
