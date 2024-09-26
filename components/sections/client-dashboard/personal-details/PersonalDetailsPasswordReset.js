"use client";

import { useContext } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "@/components/contexts/AuthContext";

export default function PersonalDetailsPasswordReset({ id, label, email }) {
  const [user] = useContext(AuthContext);

  async function resetPassword(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/resetPassword/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer null",
          },
          body: JSON.stringify({
            id: user.id,
          }),
        }
      );
      toast.info("Password reset link sent to your email");
    } catch (error) {
      toast.info("Something went wrong.please try again later");
    }
  }

  return (
    <>
      <div className={`${id}-container`}>
        <div key={label} className="mb-4 flex items-center space-x-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full">
            <strong className="md:w-2/5">
              {label.charAt(0).toUpperCase() + label.slice(1)}:
            </strong>
            <div className="w-3/5 sm:whitespace-normal">{`*********`}</div>
          </div>

          <button
            className="text-blue-500 w-1/3 ml-auto text-right"
            onClick={resetPassword}
          >
            Reset Link
          </button>
        </div>
      </div>
    </>
  );
}
