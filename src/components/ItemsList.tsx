import React, { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { useParams } from "react-router";
export default function ItemsList() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      

        setLoading(false)
  }, []);
    return <div>{loading ? <Spinner className="size-4" /> : <div>
    
    
    </div>}</div>;
}
