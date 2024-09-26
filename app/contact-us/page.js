'use client'
import React from "react";
import Location from "@/public/svg/Location";
import Email from "@/public/svg/Email";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [location, setLocation] = React.useState(
    "651 N Broad St, Suite #201, Middletown, New Castle, Delaware 19709"
  );
  const [emailAddress, setEmailAddress] = React.useState("support@Checkins.ai");
  const [phoneNumber, setPhoneNumber] = React.useState("+1-650-308-8202");

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    message: message,
  };

  let noofCalling = 0;

  const handleSubmit = async (e) => {
    //console.log(data);
    // await axios
    //   .post(`${process.env.REACT_APP_AXIOS_URL}/api/v1/contactUs`, data)
    //   .then((res) => {
    //     setMessage("");
    //     setEmail("");
    //     setLastName("");
    //     setFirstName("");
    //     toast.info(
    //       "Thank you for your message. We will revert within 24 hours with comments and feedback to you query."
    //     );
    //   })
    //   .catch((err) => {
    //     if(noofCalling  < 3 ){
    //         noofCalling++;
    //         handleSubmit(e);
    //     }
    //     toast.error(err.response.data.message);
    //   });
  };

  return (
    <>
      <section id="hero" className="bg-white font-homepage">
        <div className="container flex flex-col gap-4 px-4 w-full lg:w-10/12 mx-auto mt-10 space-y-12 md:space-y-0 ">
          <h2 className=" text-4xl font-bold text-center text-bluedark md:text-left">
            {"Contact us"}
          </h2>
          <div className="flex text-[#5C6A7A] flex-col text-[15px] gap-3">
            <span>
              Thank you for visiting Checkins.ai.! We are here to assist you
              with any questions or concerns you may have. Before reaching out
              to our customer support team, we recommend checking our Frequently
              Asked Questions (FAQs) and Help Center pages, as they provide
              answers to many common inquiries. However, if you have an
              unresolved question or need further assistance, we offer several
              options to connect with our customer services team.
            </span>
          </div>
          <div className="flex text-[#5C6A7A] flex-col text-[15px] gap-3">
            <span className="text-[#002248] font-bold text-[19px]">
              Contact Methods
            </span>
            <div className="pl-4 flex flex-col gap-3">
              <span>
                1.{" "}
                <span className="font-bold text-[#002248]">Email Support:</span>{" "}
                Send us an email at support@Checkins.ai to reach our customer
                support team. Please provide detailed information about your
                query or concern, including any relevant booking or account
                details. We strive to respond to emails within 24 hours.
              </span>
              <span>
                2.{" "}
                <span className="font-bold text-[#002248]">Phone Support:</span>{" "}
                For immediate assistance, you can contact our customer support
                team by phone. Call us at 1-650-308-8202 during our working
                hours, Monday to Friday, 9 am to 5 pm (PST). Our friendly
                representatives will be ready to help you with your inquiries.
              </span>
              <span>
                3. <span className="font-bold text-[#002248]">Live Chat:</span>{" "}
                If you prefer real-time support, our live chat feature allows
                you to connect with a customer support representative instantly.
                Look for the chat icon in the bottom right corner of our website
                to initiate a chat session. Live chat support is available
                during our working hours.
              </span>
              <span>
                4.{" "}
                <span className="font-bold text-[#002248]">Social Media:</span>{" "}
                You can also reach out to us through our official social media
                channels. Send us a message on Facebook, Twitter, or Instagram,
                and our social media support team will assist you as quickly as
                possible. Find us at @CheckinsSupport.
              </span>
              <span>
                5.{" "}
                <span className="font-bold text-[#002248]">Feedback Form:</span>{" "}
                If you have feedback or suggestions, we would love to hear from
                you! Fill out our feedback form here to share your thoughts,
                ideas, or concerns. Your feedback helps us improve our services
                and enhance your experience.
              </span>
            </div>
          </div>
          <div className="flex text-[#5C6A7A] flex-col text-[15px] gap-3">
            <span>
              Remember, our FAQs and Help Center pages cover a wide range of
              topics and can often provide quick solutions to common questions.
              We encourage you to explore these resources before reaching out to
              us, as they may address your query and save you time. We are
              constantly updating our FAQs and Help Center to ensure they
              reflect the most relevant and up-to-date information.
            </span>
          </div>
          <div className="flex text-[#5C6A7A] flex-col text-[15px] gap-3">
            <span>
              At Checkins.ai, we are dedicated to providing exceptional customer
              service and ensuring your satisfaction. Our support team is ready
              to assist you and make your experience with us as smooth as
              possible. Don&#39;t hesitate to contact us if you need any
              assistance or have any unresolved questions. We are here to help!
            </span>
          </div>
          <div className="flex text-[#5C6A7A] flex-col text-[15px] gap-3">
            <span>
              <span className="font-bold">Note:</span>For media inquiries,
              partnership opportunities, or other non-customer service-related
              matters, please visit our Press or Partnership pages on the
              Checkins.ai website.
            </span>
          </div>
        </div>
        <div className="container flex flex-col-reverse md:flex-row px-4 gap-4 w-full lg:w-10/12 mx-auto mt-10 space-y-12 md:space-y-0 ">
          <div className="bg-[#002248] rounded-xl flex flex-col justify-between shadow-lg w-full md:w-1/3 px-3 py-3">
            {/* contactdetails */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center gap-2">
                <Location />
                <div className="flex text-[11px] flex-col text-[#fff]">
                  <span className="text-[15px] font-bold">Location</span>
                  <span className="opacity-50">{location}</span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Email />
                <div className="flex text-[11px] flex-col text-[#fff]">
                  <span className="text-[15px] font-bold">Email</span>
                  <span className="opacity-50">{emailAddress}</span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Location />
                <div className="flex text-[11px] flex-col text-[#fff]">
                  <span className="text-[15px] font-bold">Phone</span>
                  <span className="opacity-50">{phoneNumber}</span>
                </div>
              </div>
            </div>
     
          </div>
          <div className="bg-[#fff] shadow-xl w-full md:w-2/3 rounded-lg px-3 py-3">
            <span className="font-bold text-[20px]">Get In Touch</span>
            <div>
              <div>
                <div className="flex justify-around w-full gap-3.5 flex-col md:flex-row ">
                  <div className="flex flex-col w-full md:w-1/2 space-y-2">
                    <label className="text-[#697687] text-[12px]">
                      First Name
                    </label>
                    <input
                      value={firstName}
                      type="text"
                      className="border w-full border-gray-300 rounded-md px-2 py-2"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2 space-y-2">
                    <label className="text-[#697687] text-[12px]">
                      Last Name
                    </label>
                    <input
                      value={lastName}
                      type="text"
                      className="border w-full border-gray-300 rounded-md px-2 py-2"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-2.5 flex-col md:flex-row">
                  <div className="flex w-full flex-col space-y-2">
                    <label className="text-[#697687] text-[12px]">Email</label>
                    <input
                      value={email}
                      type="text"
                      className="border w-full border-gray-300 rounded-md px-2 py-2"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#697687] text-[12px]">Message</label>
                  <textarea
                    value={message}
                    className="border w-full border-gray-300 rounded-md px-2 py-2"
                    rows="4"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    className={`bg-[#1893F8] rounded-full mt-3 px-6 font-bold py-2  text-white
                            `}
                    type="submit"
                    onClick={() => message !== "" && email !== "" && firstName !== "" && lastName !== "" ? handleSubmit() : toast.error("Please fill all the fields")}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
