import { cookies } from "next/headers";

import ContactSupport from "@/components/sections/client-dashboard/contact-support/ContactSupport";

async function fetchMessages({ id, email, token }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/messages/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          id: id,
        }),
      }
    );

    if (response.ok) {
      return response.json();
    }

    return [];
  } catch (error) {
    throw new Error("Failed to fetch message data");
  }
}

export default async function SupportPage() {
  const cookieStore = cookies();
  const id = cookieStore.get("id").value;
  const email = cookieStore.get("email").value;
  const token = cookieStore.get("access_token").value;
  const messages = await fetchMessages({ id, email, token });

  return (
    <div className="px-0 w-full ">
      <ContactSupport data={messages} />
    </div>
  );
}
