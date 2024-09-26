import Image from "next/image";

import CopyIcon from "@/components/icons/CopyIcon";
import ReferAFriendInput from "@/components/sections/client-dashboard/refer-a-friend/ReferAFriendInput";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center  rounded-md animate-pulse">
      <div className="items-start w-full text-[#002248] flex flex-col p-6 bg-white shadow rounded-2xl mb-4 justify-start">
        <div className="  items-start text-[12px] justify-start px-0 flex flex-col gap-2 ">
          <span className="text-[#1B1B1B]  text-[21px] font-bold">
            Refer A Friend
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
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
              <span className="px-2"></span>
              <div className="flex flex-row gap-2">
                <div className="w-[1px] bg-[#5C6A7A] opacity-40 "></div>
                <button className="bg-[#1893F8] text-white flex flex-row gap-[2px] px-2 py-1 rounded-full">
                  <CopyIcon />
                  Copy
                </button>
              </div>
            </div>
          </div>
          <form className="space-y-4 py-4">
            <ReferAFriendInput id="name" label="Friend's Name" />
            <ReferAFriendInput id="email" label="Email" />
            <button
              type="submit"
              className="bg-[#1893F8] rounded-full mt-3 w-full font-bold py-2  text-white"
            >
              Send Invitation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
