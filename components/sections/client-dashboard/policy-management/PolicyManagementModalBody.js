import { useState } from "react";

export default function PolicyManagementModalBody({
  setPolicy,
  max_price_policy,
  setMaxPricePolicy,
  star_rating_policy,
  setStarRating,
}) {
  let policyOptions = {
    max_price_policy: "Max Price Policy",
    star_rating_policy: "Star Rating Policy",
  };

  policyOptions = Object.entries(policyOptions);
  const [selectedPolicy, setSelectedPolicy] = useState(policyOptions[0][1]);

  return (
    <div className="space-y-4">
      <div className="">
        Optimize your hotel's financial strategy and enhance your experience by
        strategically selecting maximum price and star rating policies.
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="program-name" className="text-[#697687] text-[12px]">
          Policy Name
        </label>
        <select
          className="border m-0 flex-1 border-gray-300 rounded-md px-2 py-2"
          id="policy-name"
          name="policy-name"
          value={selectedPolicy}
          onChange={(event) => {
            if (event.target.value === policyOptions[0][1])
              setPolicy(policyOptions[0][0]);
            else setPolicy(policyOptions[1][0]);
            setSelectedPolicy(event.target.value);
          }}
        >
          {policyOptions.map((value, key) => (
            <option key={key} value={value[1]}>
              {value[1]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full space-y-2">
        {selectedPolicy === policyOptions[0][1] && (
          <>
            <label
              htmlFor="program-name"
              className="text-[#697687] text-[12px]"
            >
              Maximum Price
            </label>
            <input
              id="maximum-price"
              type="number"
              className="p-2 border-[1px] border-[#5C6A7A] rounded-md mt-2"
              placeholder="Max Price"
              value={max_price_policy}
              onChange={(e) => {
                setMaxPricePolicy(e.target.value);
              }}
            />
          </>
        )}

        {selectedPolicy === policyOptions[1][1] && (
          <>
            <label
              htmlFor="program-name"
              className="text-[#697687] text-[12px]"
            >
              Star Rating
            </label>
            <select
              className="border m-0 flex-1 border-gray-300 rounded-md px-2 py-2"
              id="star-rating"
              name="star-rating"
              value={star_rating_policy}
              onChange={(event) => {
                setStarRating(event.target.value);
              }}
            >
              <option value="0">None</option>
              <option value="1">One Star</option>
              <option value="2">Two Star</option>
              <option value="3">Three Star</option>
              <option value="4">Four Star</option>
              <option value="5">Five Star</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
}
