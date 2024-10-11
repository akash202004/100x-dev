import { useParams } from "react-router-dom";
import { singleBlog } from "../hooks";
import { Avatar } from "../components/BlogCard";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Error: Blog ID not found</div>;
  }
  const { blog, loading, error } = singleBlog(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Error: Blog not found</div>;
  }

  return (
    <div>
      <header className="flex mb-10 items-center justify-between p-5 bg-gray-200 border-b-2 border-gray-500">
        <h1 className="text-xl font-bold">Mediumm..</h1>
        <Avatar name="A" />
      </header>
      <div className="py-6 px-20 flex justify-between items-start">
        <div>
          <h1 className="text-7xl font-bold mb-2">{blog.title}</h1>
          <p className="text-md text-gray-500 ">
            {blog.published ? "Published" : "Not Published"}
          </p>
          <p className="text-lg italic mt-8">{blog.content}</p>
        </div>
        <div>
          <h1 className="text-md mb-2 font-semibold">Author</h1>
          <div className="flex justify-center items-center gap-1">
            <Avatar name={blog.author?.username || "Unknown Author"} />
            <p>{blog.author?.username || "Unknown Author"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
