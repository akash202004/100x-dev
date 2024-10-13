export const BlogSkeleton = () => {
    return (
      <div>
        <div className="animate-pulse p-5 bg-gray-100 shadow-md mb-5">
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 mx-auto"></div>
        {/* Title or Logo */}
        <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto"></div>
        {/* Navbar links */}
      </div>
        <div className="animate-pulse py-6 px-10 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Blog Title and Content Skeleton */}
          <div className="col-span-1 md:col-span-8">
            <div className="h-10 bg-gray-300 rounded w-2/3 mb-4"></div> {/* Title */}
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div> {/* Published Status */}
            <div className="space-y-3 mt-6 md:mt-8">
              <div className="h-5 bg-gray-300 rounded w-full"></div> {/* Content Line 1 */}
              <div className="h-5 bg-gray-300 rounded w-3/4"></div> {/* Content Line 2 */}
              <div className="h-5 bg-gray-300 rounded w-2/3"></div> {/* Content Line 3 */}
            </div>
          </div>
  
          {/* Author Section Skeleton */}
          <div className="md:col-span-4 lg:col-span-4 w-full mx-auto">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div> {/* Author Title */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-16 w-16 bg-gray-300 rounded-full"></div> {/* Avatar */}
              <div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div> {/* Author Name */}
                <div className="h-3 bg-gray-300 rounded w-3/4"></div> {/* Author Description */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  