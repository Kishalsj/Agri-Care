"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PersonalDetailsDropdown from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDropdown";

export default function PersonalDetailsLanguage() {
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setJustSaved(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [justSaved]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setJustSaved(true);
        toast.info("Language updated successfully");
      }}
      id="personal-details-language"
    >
      <PersonalDetailsDropdown
        id="language"
        label="Language"
        initialValue="American English"
        justSaved={justSaved}
        options={["American English"]}
      />
    </form>
  );
}
