import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Avatar } from "../components/BlogCard";
import { Header } from "../components/Header";

export const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newBlog = { title, content };
    console.log("Blog Created:", newBlog);

    toast.success("Blog created successfully!");

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-5 border rounded bg-white shadow">
        <h1 className="text-2xl font-bold mb-5">Create Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="border p-2 w-full rounded"
              rows={parseInt("5")}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};
