import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { OwnSkeleton } from "../components/OwnSkeleton";
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
    axios
      .get(`${apiUrl}/api/v1/blog/user/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response?.data?.message || "Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto mt-10 p-5 border rounded bg-white shadow">
        <h1 className="text-2xl font-bold mb-5">My Blogs</h1>

        {loading ? (
          <>
            <OwnSkeleton />
            <OwnSkeleton />
            <OwnSkeleton />
          </>
        ) : blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          <ol className="ml-5">
            {blogs.map((blog, index) => (
              <li key={blog.id} className="mb-4 border-b pb-5">
                <h2 className="text-xl font-semibold">{`${index + 1}. ${
                  blog.title
                }`}</h2>
                <p className="text-gray-700">{blog.content}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
