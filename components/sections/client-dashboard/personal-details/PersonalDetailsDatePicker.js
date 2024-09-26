"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PersonalDetailsDatePicker({
  id,
  label,
  initialValue,
  justSaved,
  options,
}) {
  const [value, setValue] = useState(new Date(initialValue));
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
                <DatePicker
                  id={id}
                  name={id}
                  selected={value}
                  onChange={(date) => {
                    // Check if the selected date is not in the future
                    if (date > new Date()) {
                      // Handle error or display a message indicating future dates are not allowed
                      return;
                    }

                    // Calculate the age of the user based on the selected date
                    const currentDate = new Date();
                    const age = currentDate.getFullYear() - date.getFullYear();

                    // Check if the user is at least 20 years old and not born after 2003
                    if (age < 20 || date.getFullYear() > 2003) {
                      // Handle error or display a message indicating the user is not eligible
                      return;
                    }

                    // Check if the user is not more than 80 years old
                    const maxAge = 80;
                    const maxAgeDate = new Date();
                    maxAgeDate.setFullYear(maxAgeDate.getFullYear() - maxAge);

                    if (date < maxAgeDate) {
                      // Handle error or display a message indicating the user is not eligible
                      return;
                    }

                    setValue(date);
                  }}
                  startDate={value}
                  value={
                    value
                      ? value
                          .toLocaleDateString("en-US", options)
                          .replace(/-/g, "/")
                      : ""
                  }
                  withPortal
                  portalId="root-portal"
                  isClearable={false}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Birth Day"
                  className="border m-0 flex-1 border-gray-300 rounded-md px-2 py-2"
                />
              ) : (
                <div id={`${id}-value`} suppressHydrationWarning={true}>
                  {value === null
                    ? "Enter birth date"
                    : value
                        .toLocaleDateString("en-US", options)
                        .replace(/-/g, "/")}
                </div>
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
