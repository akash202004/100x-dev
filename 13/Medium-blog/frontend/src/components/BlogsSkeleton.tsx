export const BlogsSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="animate-pulse p-5 bg-gray-100 shadow-md mb-5">
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 mx-auto"></div>
        {/* Title or Logo */}
        <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto"></div>
        {/* Navbar links */}
      </div>

      {/* Blog Content Skeleton */}
      <div className="animate-pulse p-5 border-2 border-gray-300 rounded mb-5 bg-gray-100 shadow-md m-10">
        <div className="h-6 mt-5 bg-gray-300 rounded w-1/3 mb-4"></div>
        {/* Blog Title */}
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        {/* Author */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          {/* Content line 1 */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          {/* Content line 2 */}
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          {/* Content line 3 */}
        </div>
      </div>
      <div className="animate-pulse p-5 border-2 border-gray-300 rounded mb-5 bg-gray-100 shadow-md m-10">
        <div className="h-6 mt-5 bg-gray-300 rounded w-1/3 mb-4"></div>
        {/* Blog Title */}
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        {/* Author */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          {/* Content line 1 */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          {/* Content line 2 */}
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          {/* Content line 3 */}
        </div>
      </div>
      <div className="animate-pulse p-5 border-2 border-gray-300 rounded mb-5 bg-gray-100 shadow-md m-10">
          <div className="h-6 mt-5 bg-gray-300 rounded w-1/3 mb-4"></div> 
          {/* Blog Title */}
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div> 
          {/* Author */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            {/* Content line 1 */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            {/* Content line 2 */}
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            {/* Content line 3 */}
          </div>
        </div>
    </div>
  );
};
