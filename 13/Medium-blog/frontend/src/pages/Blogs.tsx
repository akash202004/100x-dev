import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Header } from "../components/Header";
import { BlogsSkeleton } from "../components/BlogsSkeleton";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return (
      <div>
        <BlogsSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
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
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No blogs available at the moment.</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id} // Added key for better React list rendering
            id={blog.id}
            authorName={blog.author?.username || "Unknown Author"}
            title={blog.title}
            content={blog.content}
            published={blog.published}
          />
        ))
      )}
    </div>
  );
};
