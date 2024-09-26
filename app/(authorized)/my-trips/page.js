import { cookies } from "next/headers";

import FilterBookings from "@/components/sections/my-trips/FilterBookings";

export default async function MyTripsPage() {
  const cookieStore = cookies();

  const email = cookieStore.get("email").value;
  const id = cookieStore.get("id").value;
  const isAuthenticated = cookieStore.get("isAuthenticated").value;
  const accessToken = cookieStore.get("access_token").value;

  return (
    <div className="min-h-full px-5 pt-1">
      <FilterBookings email={email} id={id} accessToken={accessToken} />
    </div>
  );
}
