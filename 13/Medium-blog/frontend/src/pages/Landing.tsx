import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="flex gap-3 m-10">
      <Link to="/signup">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Signup
        </button>
      </Link>
      <Link to="/signin">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Signin
        </button>
      </Link>
    </div>
  );
};
