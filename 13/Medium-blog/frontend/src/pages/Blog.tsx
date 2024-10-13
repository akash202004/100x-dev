import { useParams } from "react-router-dom";
import { singleBlog } from "../hooks";
import { Avatar } from "../components/BlogCard";
import { Header } from "../components/Header";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Error: Blog ID not found</div>;
  }

  const { blog, loading, error } = singleBlog(id);

  if (loading) {
    return (
      <BlogSkeleton/>
    )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Error: Blog not found</div>;
  }

  return (
    <div>
      <Header/>
      <div className="py-6 px-10 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="col-span-1 md:col-span-8">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4">
            {blog.title}
          </h1>
          <p className="text-md text-gray-500 ">
            {blog.published ? "Published" : "Not Published"}
          </p>
          <p className="text-lg italic mt-6 md:mt-8">{blog.content}</p>
        </div>

        <div className="md:col-span-4 lg:col-span-4 w-full mx-auto">
          <h1 className="text-lg font-semibold mb-2">Author</h1>
          <div className="flex items-center justify-center gap-4">
            <div>
              <Avatar name={blog.author?.username || "Unknown Author"} />
            </div>
            <div>
              <p className="font-medium text-lg">
                {blog.author?.username || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-600">
                Master of wit, purveyor of puns, and the funniest person on
                earth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
