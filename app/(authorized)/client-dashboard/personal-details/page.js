import { cookies } from "next/headers";

import PersonalDetails from "@/components/sections/client-dashboard/personal-details/PersonalDetails";

async function fetchEmailPreferences({ id, email, token }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/getEmailPreferences/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email, id: id }),
      }
    );

    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch email preferences data");
  }
}

export default async function PersonalDetailsPage() {
  const cookieStore = cookies();
  const id = cookieStore.get("id").value;
  const email = cookieStore.get("email").value;
  const token = cookieStore.get("access_token").value;
  const emailPreferences = await fetchEmailPreferences({ id, email, token });

  return (
    <div className="w-full space-y-4">
      <div className="items-start w-full text-[#002248] flex flex-col justify-start flex-1">
        <div className="p-4 md:p-6 bg-white shadow-md rounded-2xl items-start text-sm md:text-base justify-start w-full flex flex-col space-y-2">
          <span className="text-[#1B1B1B] text-lg md:text-xl font-bold">
            Personal Details
          </span>

          <div className="flex flex-col">
            <span>Account contact and booking information. </span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <PersonalDetails emailPreferences={emailPreferences[0]} />
      </div>
    </div>
  );
}
