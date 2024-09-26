"use client";

import { useEffect, useState } from "react";

export default function PersonalDetailsDropdown({
  id,
  label,
  initialValue,
  justSaved,
  options,
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
      <div
        className={`personal-details-dropdown block xl:hidden ${id}-container`}
      >
        <div key={label} className="mb-4 flex items-center space-x-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong className="md:w-2/5">
              {label.charAt(0).toUpperCase() + label.slice(1)}:
            </strong>
            <div id={`${id}-value`} className="w-3/5 sm:whitespace-normal">
              {isEdit ? (
                <>
                  <div className="flex flex-col space-y-2">
                    {options.map((val, key) => (
                      <label key={val} className="flex items-center">
                        <input
                          type="radio"
                          name={id}
                          value={val}
                          checked={val === value}
                          onChange={(event) => setValue(event.target.value)}
                        />
                        <span className={`radio-button`}></span>
                        <span className="ml-2">{val}</span>
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                value
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

      {/* For Bigger Screens */}
      <div className={`hidden xl:block ${id}-container`}>
        <div key={label} className="mb-4 flex items-center space-x-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong className="md:w-2/5">
              {label.charAt(0).toUpperCase() + label.slice(1)}:
            </strong>
            <div id={`${id}-value`} className="w-3/5 sm:whitespace-normal">
              {isEdit ? (
                <select
                  className="border rounded-md px-2 py-1 w-full appearance-none"
                  id={id}
                  name={id}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                >
                  {options.map((value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ) : (
                value
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
