export default function getRatingsLabel(ratings) {
  if (ratings > 4.3) {
    return "Excellent";
  }

  if (ratings > 3.8) {
    return "Very Good";
  }

  if (ratings > 3) {
    return "Good";
  }

  if (ratings > 2) {
    return "Fair";
  }

  return "Poor";
}
