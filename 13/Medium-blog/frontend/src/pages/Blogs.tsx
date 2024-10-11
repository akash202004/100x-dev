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
      <header className="flex mb-10 items-center justify-between p-5 bg-gray-200 border-b-2 border-gray-500">
        <h1 className="text-xl font-bold">Mediumm..</h1>
        <Avatar name="A" />
      </header>
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
