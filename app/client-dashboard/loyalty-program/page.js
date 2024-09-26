import { cookies } from "next/headers";
import { toast } from "react-toastify";

import LoyaltyProgram from "@/components/sections/client-dashboard/loyalty-program/LoyaltyProgram";

async function fetchLoyaltyPrograms({ email, token }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/loyaltyPrograms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    return response.json();
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
}

export default async function LoyaltyProgramPage() {
  const cookieStore = cookies();
  const email = cookieStore.get("email").value;
  const token = cookieStore.get("access_token").value;
  const programs = await fetchLoyaltyPrograms({ email, token });

  return (
    <div className="px-3 lg:px-0 w-full space-y-4">
      <div className="items-start w-full text-[#002248] flex flex-col  mb-4 justify-start p-6 bg-white rounded-2xl shadow ">
        <div className="  items-start text-[12px] justify-start px-0 flex flex-col gap-2 ">
          <span className="text-[#1B1B1B]  text-[21px] font-bold">
            Loyalty Program
          </span>
        </div>
      </div>
      <LoyaltyProgram programs={programs.result} />
    </div>
  );
}
