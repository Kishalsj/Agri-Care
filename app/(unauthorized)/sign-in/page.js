"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cookieCutter from "cookie-cutter";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Loader from "@/components/common/Loader";
// import {
//   GoogleRecaptcha,
//   isVerified,
//   isTest,
// } from "@/components/common/GoogleRecaptcha";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

export default function SignInPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerification, setIsVerification] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
  });

  const close = () => {
    setShowModal(false);
  };

  let checkUserAvalibilityCount = 0;

  const checkUserAvailability = async (event) => {
    // if (!isTest && !isVerified) {
    //   alert("Make sure captcha is checked");
    //   return;
    // }

    setInitialValues(event);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/avalibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: event.email }),
        }
      );

      const { status, id } = await response.json();

      if (status === 0) {
        setShowModal(true);
        setHeader("Wrong Email");
        setError(
          `We couldn’t find a registered account with ${event.email}. Please register as a new member or check the email address again.`
        );
        setIsLoading(false);
      } else if (status === 1) {
        cookieCutter.set("id", id);
        loginUser(event);
        getIPAddress();
        setError("Please wait until we are verifying your email");
        setIsLoading(false);
      }
    } catch (error) {
      if (checkUserAvalibilityCount < 3) {
        checkUserAvalibilityCount++;
        checkUserAvailability(event);
      }
    }
  };

  const loginUser = async (e) => {
      await axios
      .post(process.env.NEXT_PUBLIC_AUTH_PASSWORDLESS_START_API, {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        connection: "email",
        email: e.email,
        send: "code",
      })
      .then((response) => {
        // Handle successful email sending (e.g., show success message)
        setIsVerification(true);
        setError("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error sending verification code:", error);
        setError("Error sending verification code. Please try again.");
        setIsLoading(false);
      });
  };



  const handleVerifyCode = async () => {
    console.log(initialValues);
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_AUTH_TOKEN_API, {
        grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        username: initialValues.email,
        otp: verificationCode,
        realm: "email",
        audience: process.env.NEXT_PUBLIC_AUDIENCE,
        scope: "openid profile email",
      })
      .then((response) => {
        const expirationTimeInSeconds = 17280;
        const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1000);
        cookieCutter.set("email", initialValues.email, { expires: expirationDate });
        cookieCutter.set("isAuthenticated", true, { expires: expirationDate });
        cookieCutter.set("access_token", response.data.access_token, { expires: expirationDate });
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem("timer", Date.now() + 86400 * 1000);
        setError("");
        setIsLoading(false);
        window.location.href = '/'
      
      })
      .catch((error) => {
        console.log("Error verifying code:", error);
        setError(error.response.data.error_description);
        setIsLoading(false);
      });
  };

  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();

      cookieCutter.set("ipAddress", data.ip);
    } catch (err) {
      const defaultIpAddress = "112.135.77.54";

      cookieCutter.setItem("ipAddress", defaultIpAddress);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const resendTheloginCode = async () => {
    setIsLoading(true);
    await axios
    .post(process.env.NEXT_PUBLIC_AUTH_PASSWORDLESS_START_API, {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      connection: "email",
      email: initialValues.email,
      send: "code",
    })
    .then((response) => {
      // Handle successful email sending (e.g., show success message)
      setIsVerification(true);
      setError("");
      setIsLoading(false);
    })
    .catch((error) => {
      setError("Error sending verification code. Please try again.");
      setIsLoading(false);
    });
};

return (
  <div style={{ zIndex: 999999 }} className="fixed overflow-hidden h-screen w-screen bg-gray-800 bg-opacity-100 pb-4 inset-0 sm:flex sm:items-center sm:justify-center">
    <div className="relative w-full lg:w-[850px]  rounded-xl overflow-y-auto shadow-xl pt-[75px] pb-6 flex flex-col lg:flex-row-reverse"> {/* Changed to lg:flex-row-reverse */}
      {/* Right Side - Image Section */}
      <div className="relative w-full lg:w-[50%] rounded-tr-xl rounded-br-xl overflow-y-auto right-3">
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-0 left-24 right-0 top-60 h-[200px] w-[350px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(72,65,156,0.51)] opacity-60 blur-[60px]"></div>
          <div className="absolute bottom-0 left-48 right-0 top-20 h-[200px] w-[200px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(243,230,114,0.7)] opacity-80 blur-[50px]"></div>
          <div className="absolute bottom-28 left-auto right-0 top-auto h-[200px] w-[200px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(143,235,241,0.7)] opacity-80 blur-[50px]"></div>
        </div>
        <div className="flex justify-end p-4 mt-36">
          <img src="/img/RegisterFormImg.png" alt="" className="w-[100%] transform scale-x-[-1]" />
        </div>
      </div>

      {/* Left Side - Form Section */} 
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative justify-center items-center rounded-2xl sm:w-6/12 lg:w-[39%] w-full bg-[#fff] my-6">
              <div className="w-full flex justify-end items-end px-3 pt-2">
                <div
                  className="bg-[#F5F5F6] cursor-pointer border-none rounded-full w-8 py-2 mt-1"
                  onClick={() => close()}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    className="ml-2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3327 1.1665L1.66602 12.8332"
                      stroke="#282C3F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.66602 1.1665L13.3327 12.8332"
                      stroke="#282C3F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="px-4 justify-center xl:justify-start py-4 flex flex-col xl:flex-row space-x-0 xl:space-x-5">
                <div className="w-full">
                  <div className="flex space-y-5 right-0 mr-0 justify-end items-end flex-col"></div>
                  <div className="pb-4 xl:justify-start xl:items-start items-center justify-center">
                    <div className="text-[#5C6A7A] xl:justify-start xl:items-start items-center justify-center text-[15px] font-[500] flex flex-col space-y-3">
                      <div className="space-y-2 xl:justify-start xl:items-start justify-center items-center ">
                        <span
                          id="userauth-error"
                          className="text-[#002248] text-[28px] font-bold"
                        >
                          {header}
                        </span>
                        <div className="bg-[#1893F8] items-center justify-center w-12 h-[6px] rounded-full"></div>
                      </div>
                      <div className="flex items-start justify-start flex-col">
                        <span className="text-start">
                          {error !== "" && (
                            <span className="text-[#af3232] text-[12px] text-center">
                              {error}
                            </span>
                          )}
                        </span>
                        {header === "Wrong Password" && (
                          <span className="text-start">
                            <a
                              href="/forgot-password"
                              className="rounded-sm hover:underline text-blue-600 "
                            >
                              Or Click Here to Forget your Password
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-[#1893F8]"></div>
        </>
      ) : (
        <></>
      )}

      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all "
        role="dialog"
        aria-modal="true"
        aria-label="modal-headline"
      ></div>
      <div className="bg-[#fff] shadow-xl w-full lg:h-auto lg:w-[450px] rounded-xl ">
        <div className="pt-3.5 pb-9 flex flex-col justify-center px-9 space-y-4">
          <div className="space-y-2">
            <a href="/" className="flex justify-center items-center">
              <Image
                src="/img/navbarlogo.png"
                alt="Logo"
                className="h-[74px]"
                height={52}
                width={208}
                priority
              />
            </a>
          </div>
          {isVerification ? (
            <>
              <span className="text-[#1B1B1B] text-[20px] text-center">
                Welcome
              </span>
              <span className="text-[14px] text-center">
                A verification code has been sent.
              </span>
              {error !== "" && (
                <>
                  <span className="text-[#af3232] text-[12px] text-center">
                    {error} Please try again.
                  </span>
                </>
              )}
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="Verification Code"
                className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm`}
              />
              <button
                className={`bg-[#1893F8] rounded-md font-bold py-3 w-full text-white `}
                onClick={handleVerifyCode}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
              <div className="flex justify-center items-center">
                <span
                  onClick={resendTheloginCode}
                  className="text-[#1893F8] text-[14px] cursor-pointer"
                >
                  Resend the login code
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="text-homeBlue text-[20px] font-bold font-[Fraunces] text-center ">
                Welcome
              </span>
              <span className="text-[14px] font-[Fraunces] text-center">
                Please use your registered email to login
              </span>

              <Formik
                initialValues={initialValues}
                validationSchema={SignInSchema}
                onSubmit={checkUserAvailability}
              >
                {(formik) => {
                  const { errors, touched, isValid, dirty } = formik;
                  return (
                    <Form>
                      <div className="space-y-3">
                        <div>
                          <span className="text-[15px]">Email</span>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm ${
                              errors.email && touched.email
                                ? "border-red-500"
                                : null
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="span"
                            className="text-red-500"
                          />
                        </div>
                        {/* {!isTest && dirty && isValid && <GoogleRecaptcha />} */}
                        <button
                          className={`bg-[#1893F8] rounded-md font-bold py-3 w-full text-white ${
                            !(dirty && isValid) ? "cursor-not-allowed" : null
                          }`}
                          // disabled={!(dirty && isValid)}
                          type="submit"
                        >
                          {isLoading ? "Sending the code..." : "Continue"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <div className="flex items-center justify-center space-x-3 -my-2">
                <div className="border-t border-gray-400 w-full"></div>
                <span className="text-gray-500">or</span>
                <div className="border-t border-gray-400 w-full"></div>
              </div>

              <button className="bg-[#c7c5c580] hover:bg-[#81839280] rounded-md font-bold py-3 w-full text-black flex items-center justify-center">
                <div className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                </div>
                Continue with Google
              </button>
              <span className="text-[14px] flex justify-center items-center">
                Already have an account?{" "}
                <a
                  href="/register"
                  className="hover:underline text-[#1893F8] ml-1 cursor-pointer"
                >
                  Register
                </a>
              </span>
            </>
          )}
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  </div>
);

}
