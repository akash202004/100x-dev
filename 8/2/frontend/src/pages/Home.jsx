import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-800 text-white h-screen justify-center items-center flex gap-10 text-2xl">
      <h1> PAYTM</h1>
      <Link to={"/signup"}>
        <div className="p-5 bg-green-200 text-black rounded-lg">SIGN-UP</div>
      </Link>
      <Link to={"/signin"}>
        <div className="p-5 bg-blue-200 text-black rounded-lg">SIGN-IN</div>
      </Link>
    </div>
  );
};

export default Home;
