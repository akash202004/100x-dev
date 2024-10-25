import axios from "axios";
import { useEffect, useState } from "react";

function User() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user", {
          withCredentials: true,
        });
        alert(res.data.email); 
        setData(res.data.email); 
      } catch (error) {
        console.error("Error fetching user:", error);
        setData("Error loading user data");
      }
    };

    fetchUser();
  }, []);

  return <div>{data}</div>;
}

export default User;
