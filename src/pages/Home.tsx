import React, { useEffect } from "react";
import Navbar from "@/components/global/Navbar";
import { account } from "@/lib/appwrite";

export default function Home() {
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await account.get();
        console.log("Logged in user:", user);
        return user;
      } catch (err) {
        console.error("No active session:", err);
        return null;
      }
    }
    getCurrentUser();
  }, []);
  return (
    <div>
      <Navbar />
      helelo
    </div>
  );
}
