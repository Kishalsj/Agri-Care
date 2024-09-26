import PersonalDetailsInput from "@/components/sections/client-dashboard/personal-details/PersonalDetailsInput";
import PersonalDetailsDropdown from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDropdown";
import PersonalDetailsDatePicker from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDatePicker";
import PersonalDetailsPasswordReset from "@/components/sections/client-dashboard/personal-details/PersonalDetailsPasswordReset";
import PersonalDetailsAddressInput from "@/components/sections/client-dashboard/personal-details/PersonalDetailsAddressInput";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center  rounded-md animate-pulse">
      <div className="p-6 bg-white shadow rounded-2xl items-start text-[12px] justify-start w-full flex flex-col gap-2 mb-4">
        <span className="text-[#1B1B1B]  text-[21px] font-bold">
          Personal Details
        </span>

        <div className="flex flex-col">
          <span>Account contact and booking information. </span>
        </div>
      </div>
      <div className="space-y-4 w-full">
        <div className="text-start w-full p-6 bg-white shadow rounded-2xl ">
          <form className="space-y-4">
            <PersonalDetailsInput id="firstName" label="First Name" />
            <PersonalDetailsInput id="lastName" label="Last Name" />
            <PersonalDetailsInput
              id="email"
              label="Email address"
              disabled={true}
            />
            <PersonalDetailsInput id="phone" label="Mobile" />
            <PersonalDetailsDropdown
              id="gender"
              label="Gender"
              options={["Male", "Female", "Other"]}
            />
            <PersonalDetailsDatePicker
              id="dob"
              label="Date of Birth"
              options={{ month: "short", day: "numeric", year: "numeric" }}
            />
            <PersonalDetailsAddressInput id="address" label="Address" />
            <PersonalDetailsPasswordReset id="password" label="Password" />
          </form>
        </div>
        <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
          <div className="text-[#1B1B1B]  text-[21px] text-center">
            Preferences
          </div>
          <div className="w-1/5">Language</div>
          <div className="text-[#002248] flex-1 px-[9px]">English</div>
          <button className="text-[#1893F8] px-[22px]">Edit</button>
        </div>
        {/* <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
          <div className="text-[#1B1B1B]  text-[21px] text-center">
            Email Notifications
          </div>
          <PersonalDetailsEmailPreferences
            emailPreferences={emailPreferences}
          />
        </div>
        <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
          <div className="text-[#1B1B1B]  text-[21px] text-center">
            Security
          </div>
          <PersonalDetailsDeleteAccount />
        </div> */}
      </div>
    </div>
  );
}
