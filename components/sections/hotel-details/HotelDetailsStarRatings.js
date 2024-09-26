import StarRating from "@/components/common/StarRating";

const ReviewTab = ({ reviews, starRating }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {/* Star Rating Component */}
        <StarRating count={starRating} />
        <span className="ml-2 text-lg font-bold">{starRating.toFixed(1)}</span>
        <span className="ml-2 text-gray-600">
          ({reviews.total} Reviews)
        </span>
      </div>
      {/* Review Categories with Progress Bars */}
      <div className="space-y-2">
        {reviews.categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <span className="w-1/3 text-gray-700">{category.name}</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 ml-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${category.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
