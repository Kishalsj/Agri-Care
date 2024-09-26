"use client";

import PersonalDetailsDeleteAccount from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDeleteAccount";
import PersonalDetailsEmailPreferences from "@/components/sections/client-dashboard/personal-details/PersonalDetailsEmailPreferences";
import PersonalDetailsLanguage from "@/components/sections/client-dashboard/personal-details/PersonalDetailsLanguage";
import PersonalDetailsProfile from "@/components/sections/client-dashboard/personal-details/PersonalDetailsProfile";

export default function PersonalDetails({ emailPreferences }) {
  return (
    <>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] text-lg md:text-[21px] text-center">
          My Profile
        </div>
        <PersonalDetailsProfile />
      </div>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] text-lg md:text-[21px] text-center">
          Preferences
        </div>
        <PersonalDetailsLanguage />
      </div>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] text-lg md:text-[21px] text-center">
          Email Notifications
        </div>
        <PersonalDetailsEmailPreferences emailPreferences={emailPreferences} />
      </div>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] text-lg md:text-[21px] text-center">
          Security
        </div>
        <PersonalDetailsDeleteAccount />
      </div>
    </>
  );
}
