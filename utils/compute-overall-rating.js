export default function computeOverallRating(reviews) {
  const totalReviews = Array.isArray(reviews) ? reviews.length : []
  const totalOverallRating =
  Array.isArray(reviews) ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : null

  return Number.isNaN(totalOverallRating)
    ? "0.0"
    : totalOverallRating?.toFixed(1);
}
