import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
  return (
    <div>
      <BlogCard
      authorName="John Doe"
      title="Blog Title"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisi at lacus."
      publishedDate="2021-08-01T00:00:00.000Z"
      />
    </div>
  );
};
