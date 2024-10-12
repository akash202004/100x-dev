import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { Avatar } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header className="flex mb-5 items-center justify-between p-5 bg-gray-200 border-b-2 border-gray-500">
        <h1 className="text-xl font-bold">Mediumm..</h1>
        <Avatar name="A" />
      </header>
      <div className="mb-5 flex justify-end mr-5 space-x-4">
        <Link to="/create-blog">
          <button className="bg-blue-400 text-white px-4 py-2 font-semibold shadow-lg rounded border-black border-2 hover:bg-blue-600">
            Create Blog
          </button>
        </Link>
        <Link to="/own-blog">
          <button className="bg-green-400 text-white px-4 py-2 font-semibold shadow-lg rounded border-black border-2 hover:bg-green-600">
            Own Blog
          </button>
        </Link>
      </div>
      {blogs.map((blog) => (
        <BlogCard
          id={blog.id}
          authorName={blog.author?.username || "Unknown Author"}
          title={blog.title}
          content={blog.content}
          published={blog.published}
        />
      ))}
    </div>
  );
};
