"use client";

import { useState } from "react";
import { HotelContext } from "@/components/contexts/HotelContext";

export function HotelProvider({ children, value }) {
  return (
    <HotelContext.Provider value={useState(value)}>
      {children}
    </HotelContext.Provider>
  );
}
