"use client";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "@/components/contexts/AuthContext";
import PersonalDetailsInput from "@/components/sections/client-dashboard/personal-details/PersonalDetailsInput";
import PersonalDetailsDropdown from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDropdown";
import PersonalDetailsDatePicker from "@/components/sections/client-dashboard/personal-details/PersonalDetailsDatePicker";
import PersonalDetailsPasswordReset from "@/components/sections/client-dashboard/personal-details/PersonalDetailsPasswordReset";
import PersonalDetailsAddressInput from "@/components/sections/client-dashboard/personal-details/PersonalDetailsAddressInput";

export default function PersonalDetailsProfile() {
  const [user, setUser] = useContext(AuthContext);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setJustSaved(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [justSaved]);

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Array.from(formData).reduce(
      (accumulator, [key, value]) => {
        accumulator[key] = value;

        return accumulator;
      },
      {
        email: user.email,
        id: user.id,
      }
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/updateProfile/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
            mode: "no-cors",
          },
          body: JSON.stringify(data),
        }
      );

      setUser({
        ...user,
        ...data,
      });

      setJustSaved(true);

      toast.info("Profile updated successfully");
    } catch (error) {
      toast.info("Error updating profile");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      id="personal-details-profile"
      className="space-y-6 md: space-y-0"
    >
      <PersonalDetailsInput
        id="firstName"
        label="First Name"
        initialValue={user.firstName}
        justSaved={justSaved}
      />
      <PersonalDetailsInput
        id="lastName"
        label="Last Name"
        initialValue={user.lastName}
        justSaved={justSaved}
      />
      <PersonalDetailsInput
        id="email"
        label="Email address"
        disabled={true}
        initialValue={user.email}
        justSaved={justSaved}
      />
      <PersonalDetailsInput
        id="phone"
        label="Mobile"
        initialValue={user.phone}
        justSaved={justSaved}
      />
      <PersonalDetailsDropdown
        id="gender"
        label="Gender"
        initialValue={user.gender}
        justSaved={justSaved}
        options={["Male", "Female", "Other"]}
      />
      <PersonalDetailsDatePicker
        id="dob"
        label="Date of Birth"
        initialValue={user.dob}
        justSaved={justSaved}
        options={{ month: "short", day: "numeric", year: "numeric" }}
      />
      <PersonalDetailsAddressInput
        id="address"
        label="Address"
        initialValue={user.address}
        justSaved={justSaved}
      />
      <PersonalDetailsPasswordReset
        id="password"
        label="Password"
        user={user}
        email={user.email}
      />
    </form>
  );
}
