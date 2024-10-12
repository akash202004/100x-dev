import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Header = () => {
  return (
    <header className="flex mb-5 items-center justify-between p-5 bg-gray-200 border-b-2 border-gray-500">
      <Link to={"/blogs"}>
        <h1 className="text-xl font-bold">Mediumm..</h1>
      </Link>
      <Avatar name="A" />
    </header>
  );
};
