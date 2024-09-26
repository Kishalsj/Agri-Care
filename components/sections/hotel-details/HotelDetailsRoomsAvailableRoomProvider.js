"use client";

import { useEffect, useState } from "react";

export default function HotelDetailsRoomsAvailableRoomProvider({
  providerName,
}) {
  const [showProviderInfo, setShowProviderInfo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "H") {
        setShowProviderInfo((prevShowProviderInfo) => !prevShowProviderInfo);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {showProviderInfo && (
        <span className="text-blue-600 font-semibold text-[12px] underline flex items-center">
          {providerName}
        </span>
      )}
    </>
  );
}
