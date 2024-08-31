import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center p-10">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 p-2 text-center h-max px-6 ">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            name="name"
            onChange={handleChange}
            placeholder="John Wick"
            label={"Full Name"}
          />
          <InputBox
            name="email"
            onChange={handleChange}
            placeholder="abc@gmail.com"
            label={"Email"}
          />
          <InputBox
            name="password"
            onChange={handleChange}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={handleSubmit} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
