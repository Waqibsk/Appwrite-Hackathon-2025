import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end  m-4 gap-3">
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
    </div>
  );
}
