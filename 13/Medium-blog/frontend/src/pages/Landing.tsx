import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white p-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1608874973445-de098faf870f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold mb-3">Welcome to Our Platform!</h1>
        <p className="text-lg">
          Join us today and start your journey to success. Connect, share, and
          grow together!
        </p>

        <div className="flex gap-5 mt-5">
          <Link to="/signup">
            <button className="bg-green-400 border-2 border-black hover:bg-green-800 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300">
              Signup
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-blue-400 hover:bg-blue-800 border-2 border-black text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300">
              Signin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
