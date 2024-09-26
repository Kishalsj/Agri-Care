import FullStarIcon from "../icons/FullStarIcon";
import GrayStarIcon from "../icons/GrayStarIcon";

export default function StarRating({ count }) {
  const stars = [];

  let index = 0;

  while (index < Math.floor(count)) {
    stars.push(<FullStarIcon key={index} />);

    index++;
  }

  while (index < 5) {
    stars.push(<GrayStarIcon key={index} />);

    index++;
  }

  return (
    <div id="star-rating" className="flex flex-row md:space-x-2">
      {stars}
    </div>
  );
}
