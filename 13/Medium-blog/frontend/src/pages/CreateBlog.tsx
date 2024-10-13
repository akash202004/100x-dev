import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newBlog = { title, content };

    try {
      const response = await axios.post(`${apiUrl}/api/v1/blog`, newBlog, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        toast.success("Blog created successfully!");
        setTitle("");
        setContent("");
        navigate("/blogs");
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to create blog";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="max-w-4xl mx-auto mt-10 p-5 border-2 border-black rounded bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-5">Create Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title (min-length: 3)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-2 w-full rounded border-2 border-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content (min-length: 10)
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="border-2 border-black p-2 w-full rounded"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`bg-blue-400 font-bold border-2 border-black text-white px-4 py-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};
