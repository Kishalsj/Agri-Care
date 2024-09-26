"use client";

import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";

export default function PersonalDetailsAddressInput({
  id,
  label,
  initialValue,
  justSaved,
}) {
  const [value, setValue] = useState(initialValue);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (justSaved) {
      setIsEdit(false);
    }
  }, [justSaved]);

  return (
    <>
      <div className={`${id}-container`}>
        <div key={label} className="mb-4 flex items-center space-x-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong className="md:w-2/5">
              {label.charAt(0).toUpperCase() + label.slice(1)}:
            </strong>
            <div className="w-3/5 sm:whitespace-normal">
              {isEdit ? (
                <Autocomplete
                  className="border m-0 flex-1 border-gray-300 rounded-md px-2 py-2"
                  id={id}
                  name={id}
                  apiKey="AIzaSyAW_PMwz5G2neE_lOW5C8DXz-Cb3d9RLB8"
                  defaultValue={initialValue}
                  options={{
                    types: ["address"],
                    fields: ["address_components", "formatted_address"],
                  }}
                  onPlaceSelected={(place) => {
                    setValue(place.formatted_address);
                  }}
                />
              ) : (
                <span id={`${id}-value`}>{value}</span>
              )}
            </div>
          </div>

          {isEdit ? (
            <button
              type="submit"
              className="text-blue-500 w-1/3 ml-auto text-right"
            >
              Save
            </button>
          ) : (
            <button
              className="text-blue-500 w-1/3 ml-auto text-right"
              onClick={(event) => {
                event.preventDefault();
                setIsEdit(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
}
