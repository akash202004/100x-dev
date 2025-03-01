import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput, signupInput, signinInput } from "medium-vlog-project";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    email: "",
    password: "",
  });

  // Input change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs({ ...postInputs, [name]: value });
  };

  const validateInputs = () => {
    try {
      if (type === "signup") {
        signupInput.parse(postInputs);
      } else {
        signinInput.parse({
          email: postInputs.email,
          password: postInputs.password,
        });
      }
      return true;
    } catch (err: any) {
      toast.error(err.errors[0].message);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    try {
      let response;
      if (type === "signup") {
        response = await axios.post(`${apiUrl}/api/v1/user/signup`, {
          username: postInputs.username,
          email: postInputs.email,
          password: postInputs.password,
        });
        console.log("Signup Success:", response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
      } else if (type === "signin") {
        response = await axios.post(`${apiUrl}/api/v1/user/signin`, {
          email: postInputs.email,
          password: postInputs.password,
        });
        console.log("Signin Success:", response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
      }
      navigate("/blogs");
    } catch (error) {
      toast.error("Error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen items-center flex flex-col justify-center p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold">
        {type === "signup" ? "Create an account" : "Sign in to your account"}
      </h1>
      <h4 className="text-gray-700 text-md mt-2 sm:mt-4">
        {type === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <span className="underline font-bold">
          <Link to={type === "signup" ? "/signin" : "/signup"}>
            {type === "signup" ? "Login" : "Sign up"}
          </Link>
        </span>
      </h4>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
        {type === "signup" && (
          <LabelledInput
            label="Username"
            name="username"
            placeholder="Write your username..."
            onChange={handleInputChange}
          />
        )}
        <LabelledInput
          label="Email"
          name="email"
          placeholder="Write your email..."
          onChange={handleInputChange}
        />
        <LabelledInput
          label="Password"
          name="password"
          type="password"
          placeholder="Write your password..."
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-black rounded-lg text-white font-bold py-2 px-4 mt-6 w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

// LabelledInput component
interface LabelledInputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  name,
  type,
  onChange,
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-2 mt-5 text-sm font-medium">{label}</label>
      <input
        onChange={onChange}
        name={name}
        type={type || "text"}
        className="text-sm rounded-lg border border-black block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
