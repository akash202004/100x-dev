interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden my-4">
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
          <span>{formatDateWithOrdinal(publishedDate)}</span>
        </div>
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-center bg-gray-500 text-white rounded-full w-10 h-10">
      <span className="text-lg font-bold">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
};

const formatDateWithOrdinal = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();

  const ordinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
};
