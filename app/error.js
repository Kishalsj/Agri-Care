"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:w-10/12 mx-auto space-y-12 md:space-y-0 bg-gray-100 rounded-2xl">
      <div className="flex flex-col flex-1 w-full rounded-xl bg-white py-[16%] items-center justify-center space-y-4">
        <h2 className="font-semibold text-xl">Uh oh!</h2>
        <p>Something went wrong. Please try again.</p>
        <button
          className="bg-[#1893F8] text-white px-4 py-2 rounded-full"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
