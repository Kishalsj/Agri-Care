"use client";

import { useState, useEffect } from "react";

export default function PersonalDetailsInput({
  id,
  label,
  initialValue,
  disabled,
  justSaved,
  children,
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
      <div className={`${id}-container mt-5`}>
        <div key={label} className="mb-4 flex items-center space-x-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong className="md:w-2/5">
              {label.charAt(0).toUpperCase() + label.slice(1)}:
            </strong>
            <div className="w-3/5 sm:whitespace-normal">
              {isEdit ? (
                <input
                  type="text"
                  id={id}
                  name={id}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                <span id={`${id}-value`}>{value}</span>
              )}
            </div>
          </div>

          {disabled ? (
            <div className="md:w-1/3 ml-auto text-right">{`Can't Edit`}</div>
          ) : isEdit ? (
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
