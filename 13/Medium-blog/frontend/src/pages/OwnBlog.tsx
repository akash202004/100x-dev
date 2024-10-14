import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { OwnSkeleton } from "../components/OwnSkeleton";
import { Link } from "react-router-dom"; // For navigating to the edit page
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export const OwnBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/blog/user/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(response.data.blogs);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${apiUrl}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        alert("Blog deleted successfully!");
      } catch (error: any) {
        console.log(error.response?.data?.message || "Failed to delete blog");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto mt-10 p-5 border-2 border-black rounded bg-white shadow ">
        <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>

        {loading ? (
          <>
            <OwnSkeleton />
            <OwnSkeleton />
            <OwnSkeleton />
          </>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs available.</p>
        ) : (
          <ol className="ml-5">
            {blogs.map((blog, index) => (
              <li key={blog.id} className="mb-6 border-b border-black pb-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{`${index + 1}. ${
                    blog.title
                  }`}</h2>
                  <div className="flex gap-2">
                    <Link to={`/edit-blog/${blog.id}`}>
                      <button className="bg-blue-400 border-2 border-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-400 border-2 border-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{blog.content}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
