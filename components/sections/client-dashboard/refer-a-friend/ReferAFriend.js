"use client";

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import formatDate from "@/utils/format-date";
import { AuthContext } from "@/components/contexts/AuthContext";
import CopyIcon from "@/components/icons/CopyIcon";
import ReferAFriendInput from "@/components/sections/client-dashboard/refer-a-friend/ReferAFriendInput";

export default function ReferAFriend({ initialValue = [] }) {
  const [referredUsers, setReferredUsers] = useState(initialValue);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user] = useContext(AuthContext);
  const { firstName, id } = user;
  const referralCode = `${firstName}&${id}`;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/refferalUsers/create/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            name,
            email,
            id: user.id,
          }),
        }
      );

      toast.info("Great, your invite is on the way to your friend!");

      setName("");
      setEmail("");

      const data = await fetchRefferalUsers();

      setReferredUsers(data);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  async function fetchRefferalUsers() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/refferalUsers/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ email: user.email, id: user.id }),
        }
      );

      return response.json();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard");
  }

  return (
    <>
      <div className="w-full p-6 bg-white shadow rounded-2xl  space-y-2 ">
        <div className="px-12 py-7 flex items-center justify-center">
          <Image
            src="/img/client-dashboard/friend.jpg"
            alt="Friends"
            width={297}
            height={177}
          />
        </div>
        <div className=" text-[#5C6A7A] justify-center px-0 md:px-2 flex flex-col gap-2 py-3 mt-4">
          <div className=" font-bold justify-center flex text-[#002248]">
            Invite a friend
          </div>
          <span>Copy your code, share it with your friends</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-between px-2 py-2 w-full border rounded-full border-dashed bg-white">
            <span id="referral-code" className="px-2">
              {referralCode}
            </span>
            <div className="flex flex-row gap-2">
              <div className="w-[1px] bg-[#5C6A7A] opacity-40 "></div>
              <button
                id="copy"
                onClick={() => copy(referralCode)}
                className="bg-[#1893F8] text-white flex flex-row gap-[2px] px-2 py-1 rounded-full"
              >
                <CopyIcon />
                Copy
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <ReferAFriendInput
            id="name"
            label="Friend's Name"
            value={name}
            setValue={setName}
          />
          <ReferAFriendInput
            id="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />
          <button
            id="send-invitation"
            type="submit"
            className="bg-[#1893F8] rounded-full mt-3 w-full font-bold py-2  text-white"
          >
            Send Invitation
          </button>
        </form>
      </div>
      {referredUsers.length > 0 && (
        <table
          id="referred-users-table"
          className="flex flex-col overflow-hidden border mb-[30px] w-full text-[#5C6A7A] mt-4 p-6 bg-white shadow rounded-2xl"
        >
          <thead>
            <tr className="flex flex-row bg-[#5C6A7A] px-3 py-2 bg-opacity-10 justify-between text-[#002248] font-bold">
              <th className="w-1/3 text-left">Name</th>
              <th className="w-1/3 text-left">Date Invited</th>
              <th className="w-1/3 text-center">Joined Invitation</th>
            </tr>
          </thead>
          <tbody className="flex flex-col max-h-[200px] overflow-y-scroll">
            {referredUsers.map((referredUser, index) => {
              return (
                <tr
                  key={index}
                  className="flex flex-row text-left justify-between items-center border-b-[1px] last-of-type:border-b-0 p-3"
                >
                  <td className="w-1/3 text-left">{referredUser.name}</td>
                  <td
                    className="w-1/3 text-left"
                    suppressHydrationWarning={true}
                  >
                    {formatDate(referredUser.date)}
                  </td>
                  <td className="w-1/3 text-center">
                    {referredUser.joined ? "Joined" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
