import toggleArrayItem from "@/utils/toggle-array-item";

export default function HotelListingPills({
  selectedFilters,
  handleSelectedFilters,
}) {
  const mappedFilters = Object.entries(selectedFilters).reduce(
    (accumulator, [key, value]) => {
      if (["searchFilter", "priceMinFilter", "priceMaxFilter"].includes(key)) {
        return accumulator;
      }

      if (key === "starRatingFilter") {
        value.forEach((value) =>
          accumulator.push({
            key,
            value,
            label: `${value} star${value > 1 ? "s" : ""}`,
          })
        );
      } else if (value && key === "refundableFilter") {
        accumulator.push({ key, value, label: "Refundable" });
      } else if (value && key === "swimmingPoolFilter") {
        accumulator.push({ key, value, label: "Swimming Pool" });
      } else if (value && key === "internetFilter") {
        accumulator.push({ key, value, label: "Wifi" });
      } else if (value && key === "parkingFilter") {
        accumulator.push({ key, value, label: "Parking" });
      } else if (value && key === "breakfastFilter") {
        accumulator.push({ key, value, label: "Breakfast" });
      } else if (value && key === "businessCenterFilter") {
        accumulator.push({ key, value, label: "Business Center" });
      } else if (value && key === "barFilter") {
        accumulator.push({ key, value, label: "Bar" });
      } else if (value && key === "hotelFilter") {
        accumulator.push({ key, value, label: "Hotel" });
      } else if (value && key === "villaFilter") {
        accumulator.push({ key, value, label: "Villa" });
      } else if (value && key === "resortFilter") {
        accumulator.push({ key, value, label: "Resort" });
      } else if (value && key === "houseFilter") {
        accumulator.push({ key, value, label: "House" });
      } else if (value && key === "palaceFilter") {
        accumulator.push({ key, value, label: "Palace" });
      } else if (value && key === "apartmentFilter") {
        accumulator.push({ key, value, label: "Apartment" });
      } else if (value && key === "condoFilter") {
        accumulator.push({ key, value, label: "Condo" });
      } else if (value && key === "innFilter") {
        accumulator.push({ key, value, label: "Inn" });
      }

      return accumulator;
    },
    []
  );

  function removeFilter(selectedFilters, { key, value }) {
    if (Array.isArray(selectedFilters[key])) {
      const updatedArray = toggleArrayItem(selectedFilters[key], value);

      selectedFilters[key] = updatedArray;
    } else {
      selectedFilters[key] = false;
    }

    handleSelectedFilters(selectedFilters);
  }

  return (
    <>
      {mappedFilters.length > 0 && (
        <div className="p-2 xl:p-4 bg-white rounded-xl shadow flex items-center xl:space-x-2 overflow-x-visible w-2/3 xl:w-auto">
          <div className="font-bold flex xl:justify-start items-center xl:text-md pr-2 xl:pr-0">
            Filter By
          </div>
          <div className="custom-scrollbar overflow-x-auto xl:overflow-scroll flex-1 py-1 mt-1">
            <div className="flex items-center space-x-1 pl-6 xl:max-w-md">
              {mappedFilters.map((filter, index) => (
                <div
                  key={`${filter.key}-${index}`}
                  className="rounded-full px-2 py-1 border-[#1893F8] text-[#1893F8] border-[1px] text-xs cursor-pointer flex items-center max-w-[300px] min-w-fit"
                  onClick={() => removeFilter(selectedFilters, filter)}
                >
                  <div className="mr-1">{filter.label}</div>
                  <div>x</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
