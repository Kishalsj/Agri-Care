"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "@/components/contexts/AuthContext";
import ContactSupportMessageList from "@/components/sections/client-dashboard/contact-support/ContactSupportMessageList";

export default function ContactSupport({ data }) {
  const bottomRef = useRef(null);
  const [user] = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(data);

  useEffect(() => {
    // scroll to bottom message list
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);

  async function clearMessageHistory(event) {
    event.preventDefault();

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/messages/clearMessageHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ id: user.id, email: user.email }),
        }
      );

      setMessages([]);
    } catch (error) {
      toast.info("Unable to clear messages. Please try again later.");
    }
  }

  async function fetchMessages() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/messages/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ id: user.id, email: user.email }),
        }
      );

      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  }

  async function sendNewMessage(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/messages/new/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            message,
            id: user.id,
            email: user.email,
          }),
        }
      );

      toast.info(
        "Your message has been received. We will respond within 24 hours"
      );

      setMessage("");

      const data = await fetchMessages();

      setMessages(data);
    } catch (err) {
      toast.info("Something happen.Try again few minutes");
    }
  }

  return (
    <div className="border-[0px]  flex flex-col items-center justify-center  rounded-md bg-opacity-[0.5]">
      <div className="items-start w-full text-[#002248] flex flex-col p-6 bg-white shadow rounded-2xl mb-4 justify-start">
        <div className="  items-start text-[12px] justify-start px-0 flex flex-col gap-2 ">
          <span className="text-[#1B1B1B]  text-[21px] font-bold">
            Contact Support
          </span>
        </div>
      </div>
      <div className="p-6 bg-white shadow rounded-2xl w-full">
        <ContactSupportMessageList messages={messages}>
          <div className="flex mb-4" ref={bottomRef} />
        </ContactSupportMessageList>
        <form
          className="w-full p-4 bg-gray-100 border-[1px] rounded-2xl shadow"
          onSubmit={sendNewMessage}
        >
          <div className="w-full">
            <label
              htmlFor="message"
              className="text-[#697687] text-[12px] hidden"
            >
              New Message
            </label>
            <textarea
              id="message"
              value={message}
              className="border w-full border-gray-300 rounded-md px-2 py-2"
              rows="4"
              placeholder="Please type your message…. "
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              onClick={clearMessageHistory}
              className="rounded-full mt-3 px-6 border-[#1D1A4E] border-[1px] py-2 text-[#1D1A4E]"
            >
              Clear History
            </button>
            <button
              className="bg-[#1893F8] rounded-full mt-3 px-6 font-bold py-2 text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
