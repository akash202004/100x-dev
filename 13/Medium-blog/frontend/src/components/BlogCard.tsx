import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  published: boolean;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  published,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`get/${id}`}>
      <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden my-4 cursor-pointerk">
        <div className="px-6 py-4">
          <div className="flex items-center mb-2">
            <Avatar name={authorName} />
            <h2 className="font-bold text-xl ml-3">{title}</h2>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            {content.length > 150 ? content.slice(0, 150) + "..." : content}
          </p>
        </div>
        <div className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <div className="flex items-center">
              <span>By {authorName}</span>
            </div>
            <span>{published ? "Published" : "Not Published"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-center bg-violet-400 text-white rounded-full w-10 h-10 border-black border-2 hover:bg-violet-600">
      <span className="text-lg font-bold">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
};
