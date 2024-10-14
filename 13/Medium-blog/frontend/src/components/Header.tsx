import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="flex mb-5 items-center justify-between p-5 bg-gray-200 border-b-2 border-gray-500">
      <Link to={"/blogs"}>
        <h1 className="text-xl font-bold">Mediumm..</h1>
      </Link>

      <div className="flex items-center gap-4">
        <Avatar name="A" />

        <button
          onClick={handleLogout}
          className="bg-red-400 border-2 border-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
