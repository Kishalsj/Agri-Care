"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { AuthContext } from "@/components/contexts/AuthContext";
import Modal from "@/components/common/Modal";

export default function PersonalDetailsDeleteAccount() {
  const router = useRouter();
  const [user] = useContext(AuthContext);

  async function deleteAccount(close) {
    close();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/deleteUser/${user.id}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },

          body: JSON.stringify({
            email: user.email,
            id: user.id,
          }),
        }
      );

      toast.info(
        "We have received your request for account deletion. You will be logged out now"
      );

      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      router.push("/sign-in");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        id="personal-details-delete-account"
        className={`delete-account-container`}
      >
        <div
          key={`delete-account`}
          className="mb-4 flex items-center space-x-4 w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong className="md:w-2/5">{`Delete Account`}</strong>
            <div className="w-3/5 sm:whitespace-normal">
              {`Permanently delete your Checkins.ai account`}
            </div>
          </div>
          <Modal
            headerText="Are you sure you want to delete your account?"
            bodyText="If you want to delete your account, please press confirm."
            confirmationText="Confirm"
            cancelText="Cancel"
            onConfirm={deleteAccount}
            trigger={
              <button className="text-blue-500 w-1/3 ml-auto text-right">
                Delete Account
              </button>
            }
          />
        </div>
      </div>
    </>
  );
}
