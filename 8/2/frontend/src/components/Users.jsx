import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const allUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/filtered-users?filter=" + filter,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    allUser();
  }, [token, filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full font-bold text-xl">
            {user.name.split(" ")[0][0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>{user.name}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={(e) => navigate(`/send?id=${user._id}&name=${user.name}`)}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
