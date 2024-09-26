'use client'
import React from 'react'
import { toast } from "react-toastify";

export default function Subscribe() {
    const [email, setEmail] = React.useState("");

    const handleSubmit = async () => {
        const data = {
          email: email,
        };
      
        if (email !== "") {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/emailSubscribe`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              // Successful response
            //   const result = await response.json();
              // Process the result or show a success message
              toast.info("Thank you for joining Checkins. Your membership request has been received. Please check your email for further instructions.");
            } else {
              // Error response
              // Handle the error or show an error message
              toast.info("You can't Subscribe right now");
            }
          } catch (error) {
            // Error while making the request
            // Handle the error or show an error message
            toast.info("An error occurred while subscribing");
          }
        } else {
          toast.info("Please enter your email");
        }
      };
      
  return (
    <div className="relative lg:w-1/2 w-full text-[12px] 2xl:text-[17px]">
    <input
      type="text"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      className="h-14 pl-7 w-full pr-20 rounded-full z-0 focus:shadow focus:outline-none"
      placeholder="Type your email here"
    />
    <div className="absolute top-2 right-2">
      <button
        onClick={() => handleSubmit()}
        className="h-10 px-3.5 text-white rounded-full bg-[#002248]"
      >
        Subscribe
      </button>
    </div>
  </div>
  )
}
