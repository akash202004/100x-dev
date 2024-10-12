import { Avatar } from "../components/BlogCard";
import { Header } from "../components/Header";

const mockBlogs = [
  {
    id: 1,
    title: "My First Blog",
    content: "This is the content of my first blog.",
  },
  {
    id: 2,
    title: "A Day in My Life",
    content: "Today, I want to share my daily routine.",
  },
  {
    id: 3,
    title: "Learning React",
    content: "React is an amazing library for building UIs.",
  },
];

export const OwnBlog = () => {
  return (
    <div>
      <Header/>
      <div className="max-w-2xl mx-auto mt-10 p-5 border rounded bg-white shadow">
        <h1 className="text-2xl font-bold mb-5">My Blogs</h1>
        {mockBlogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          <ul>
            {mockBlogs.map((blog) => (
              <li key={blog.id} className="mb-4 border-b pb-2">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-700">{blog.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
