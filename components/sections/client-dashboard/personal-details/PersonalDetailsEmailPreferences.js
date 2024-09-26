"use client";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "@/components/contexts/AuthContext";
import PersonalDetailsCheckbox from "@/components/sections/client-dashboard/personal-details/PersonalDetailsChekbox";

export default function PersonalDetailsEmailPreferences({ emailPreferences }) {
  const [user] = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (justSaved) {
      setIsEdit(false);
    }

    const timer = setTimeout(() => {
      setJustSaved(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [justSaved]);

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: user.email,
      id: user.id,
      promotions: Number(formData.get("promotions") === "on"),
      newsletter: Number(formData.get("newsletter") === "on"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/auth/updateEmailPreferences/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      setJustSaved(true);

      toast.info("Email Preferences updated successfully");
    } catch (error) {
      toast.info("Error updating profile");
    }
  }

  return (
    <form
      id="personal-details-email-preferences"
      className="email-preferences-container"
      onSubmit={onSubmit}
    >
      <div className={`flex items-center space-x-8 h-11`}>
        <div
          key={`email-pref`}
          className="mb-4 flex items-center space-x-4 w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong>Email Preferences</strong>
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
      <div className="flex flex-col gap-1 justify-start text-[#002248]">
        <PersonalDetailsCheckbox
          id="booking-confirmation"
          label="Booking Confirmation"
          initialValue={true}
          disabled={true}
        />
        <PersonalDetailsCheckbox
          id="account-information"
          label="Account Information"
          initialValue={true}
          disabled={true}
        />
        <PersonalDetailsCheckbox
          id="newsletter"
          label="Newsletter"
          disabled={!isEdit}
          initialValue={Boolean(emailPreferences?.newsletter) || false}
        />
        <PersonalDetailsCheckbox
          id="promotions"
          label="Promotions & Announcements"
          disabled={!isEdit}
          initialValue={Boolean(emailPreferences?.promotions) || false}
        />
      </div>
    </form>
  );
}
