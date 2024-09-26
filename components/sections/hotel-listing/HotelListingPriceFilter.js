import React, { useState } from "react";

const PriceFilter = ({ handleSelectedFilters, selectedFilters }) => {
  const [priceRange, setPriceRange] = useState({
    min: 1,
    max: 999,
  });

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
    handleSelectedFilters({
      ...selectedFilters,
      priceMinFilter: name === "min" ? Number(value) : selectedFilters.priceMinFilter,
      priceMaxFilter: name === "max" ? Number(value) : selectedFilters.priceMaxFilter,
    });
  };

  return (
    <div>
      <label className="font-bold text-[18px]">Filter By Price</label>
      <div className="flex flex-col gap-4 justify-between items-center border-gray-200 border-b-[1px] pb-7">
        <div className="w-full flex justify-between text-gray-600">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
        <input
          type="range"
          name="min"
          min={1}
          max={999}
          value={priceRange.min}
          onChange={handleSliderChange}
          className="w-full"
        />
        <input
          type="range"
          name="max"
          min={1}
          max={999}
          value={priceRange.max}
          onChange={handleSliderChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
