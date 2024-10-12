import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Landing } from "./pages/Landing";
import { CreateBlog } from "./pages/CreateBlog";
import { OwnBlog } from "./pages/OwnBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs/get/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/own-blog" element={<OwnBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
