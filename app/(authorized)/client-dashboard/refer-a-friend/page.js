import { cookies } from "next/headers";
import { toast } from "react-toastify";

import ReferAFriend from "@/components/sections/client-dashboard/refer-a-friend/ReferAFriend";

async function fetchRefferalUsers({ id, email, token }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/refferalUsers/${id}`,
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
    toast.error("Something went wrong. Please try again later.");
  }
}

export default async function ReferAFriendPage() {
  const cookieStore = cookies();
  const id = cookieStore.get("id").value;
  const email = cookieStore.get("email").value;
  const token = cookieStore.get("access_token").value;
  const referredUsers = await fetchRefferalUsers({ id, email, token });

  return (
    <div className="px-3 lg:px-0 w-full space-y-4">
      <div className="p-6 bg-white shadow rounded-2xl items-start text-[12px] justify-start w-full flex flex-col gap-2 ">
        <span className="text-[#1B1B1B]  text-[21px] font-bold">
          Refer A Friend
        </span>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <ReferAFriend initialValue={referredUsers} />
      </div>
    </div>
  );
}
