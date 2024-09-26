export default function formatDate(
  date,
  options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }
) {
  return new Date(date).toLocaleString("en-US", options);
}
