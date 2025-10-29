import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate,useLocation } from "react-router";
import { Button } from "../ui/button";
import { account } from "@/lib/appwrite";
import { Menu, X } from "lucide-react";
import IconUrl from "@/assets/icon.png";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location=useLocation()

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await account.get();
        setUser(user);
      } catch (err) {
        console.error("No active session:", err);
      }
    }
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    navigate("/signin");
  };

  const NavButton = ({
    label,
    onClick,
  }: {
    label: string;
    onClick: () => void;
  }) => (
    <Button
      size="sm"
      variant="outline"
      className="text-black border-none shadow-none hover:bg-gray-100 w-full md:w-auto"
      onClick={onClick}
    >
      {label}
    </Button>
  );

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-slate-300 bg-white sticky top-0 z-50">
      <div
        className="font-montserrat font-bold flex items-center text-[24px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={IconUrl} alt="Argus Logo" className="h-[38px] mr-2" />
        <span className="tracking-wide">Argus</span>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {!user  && location.pathname !== "/signin" && (
          <NavButton label="Signin" onClick={() => navigate("/signin")} />
        )}
        {user && (
          <>
            <NavButton label="Home" onClick={() => navigate("/")} />
            <NavButton label="Profile" onClick={() => navigate("/profile")} />
            <NavButton label="Logout" onClick={handleLogout} />
          </>
        )}
      </div>
      <button
        className="md:hidden p-2"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-white border-t border-slate-200 flex flex-col items-center gap-2 py-3 md:hidden">
          {!user  && location.pathname !== "/signin" && (
            <NavButton label="Signin" onClick={() => navigate("/signin")} />
          )}
          {user && (
            <>
              <NavButton label="Home" onClick={() => navigate("/")} />
              <NavButton label="Profile" onClick={() => navigate("/profile")} />
              <NavButton label="Logout" onClick={handleLogout} />
            </>
          )}
        </div>
      )}
    </nav>
  );
}
