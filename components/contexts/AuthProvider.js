"use client";

import { useState } from "react";
import { AuthContext } from "@/components/contexts/AuthContext";

export function AuthProvider({ children, value }) {
  return (
    <AuthContext.Provider value={useState(value)}>
      {children}
    </AuthContext.Provider>
  );
}
