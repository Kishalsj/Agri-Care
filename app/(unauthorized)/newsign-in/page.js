// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import cookieCutter from "cookie-cutter";

// import Loader from "@/components/common/Loader";
// // import {
// //   GoogleRecaptcha,
// //   isVerified,
// //   isTest,
// // } from "@/components/common/GoogleRecaptcha";

// const NewSignUpSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Firstname is required"),

//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Lastname is required"),

//   phoneNumber: Yup.string().optional(),

//   email: Yup.string().email().required("Email is required"),
// });


// export default function RegisterPage() {
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [verificationCode, setVerificationCode] = useState("");
//   const [header, setHeader] = useState("");
//   const [error, setError] = useState("");
//   const [isVerification, setIsVerification] = useState(false);
//   const [initialSignUpValues, setInitialSignUpValues] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//   });

//   /* Event Handlers */
//   let checkUserAvalibilityCount = 0;

//   const checkUserAvalibility = async (event, { resetForm } = {}) => {
//     // if (!isTest && !isVerified) {
//     //   alert("Make sure recaptcha is checked");
//     //   return;
//     // }

//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/avalibility`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: event.email }),
//         }
//       );
//       const { status } = await response.json();

//       if (status === 0) {
//         handleSendCode(event);
//       } else if (status === 1) {
//         toast.info(
//           `The provided email ${event.email} is already registered. Either login or register with a new email`,
//           { disableTimeOut: true }
//         );

//         setIsLoading(false);
//       }
//     } catch (err) {
//       if (checkUserAvalibilityCount < 3) {
//         checkUserAvalibilityCount++;
//         checkUserAvalibility(event);
//       }
//     }
//   };

//   const handleSendCode = async (e) => {
//     setInitialSignUpValues(e);
//     await axios
//     .post(process.env.NEXT_PUBLIC_AUTH_PASSWORDLESS_START_API, {
//       client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//       connection: "email",
//       email: e.email,
//       send: "code",
//     })
//     .then((response) => {
//       // Handle successful email sending (e.g., show success message)
//       setIsVerification(true);
//       setError("");
//       setIsLoading(false);
//       newUserCreation(e)
//     })
//     .catch((error) => {
//       console.error("Error sending verification code:", error);
//       setError("Error sending verification code. Please try again.");
//       setIsLoading(false);
//     });
//   };

//   const newUserCreation = async (event) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/avalibility/new`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(event),
//         }
//       );

//       const { status , id } = await response.json();

//       if (status === 1) {
//         cookieCutter.set("id", id);
//         setIsVerification(true);
//         setError("");
//         setIsLoading(false);
//       }
//     } catch (err) {
//       toast.info(
//         "Something Went Wrong.Please Contact Checkins.ai Support Team"
//       );
//     }
//   };

//   const handleVerifyCode = async () => {
//     console.log(initialSignUpValues);
//     setIsLoading(true);
//     await axios
//       .post(process.env.NEXT_PUBLIC_AUTH_TOKEN_API, {
//         grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
//         client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//         client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//         username: initialSignUpValues.email,
//         otp: verificationCode,
//         realm: "email",
//         audience: process.env.NEXT_PUBLIC_AUDIENCE,
//         scope: "openid profile email",
//       })
//       .then((response) => {
//         const expirationTimeInSeconds = 17280;
//         const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1000);
//         cookieCutter.set("email", initialSignUpValues.email, { expires: expirationDate });
//         cookieCutter.set("isAuthenticated", true, { expires: expirationDate });
//         cookieCutter.set("access_token", response.data.access_token, { expires: expirationDate });
//         localStorage.setItem('isAuthenticated', true);
//         localStorage.setItem("timer", Date.now() + 86400 * 1000);
//         setError("");
//         setIsLoading(false);
//         window.location.href = '/'
      
//       })
//       .catch((error) => {
//         console.log("Error verifying code:", error);
//         setError(error.response.data.error_description);
//         setIsLoading(false);
//       });
//   };

//   const handleVerificationCodeChange = (e) => {
//     setVerificationCode(e.target.value);
//   };

//   const resendTheloginCode = async () => {
//     setIsLoading(true);
//     await axios
//     .post(process.env.NEXT_PUBLIC_AUTH_PASSWORDLESS_START_API, {
//       client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//       connection: "email",
//       email: initialSignUpValues.email,
//       send: "code",
//     })
//     .then((response) => {
//       // Handle successful email sending (e.g., show success message)
//       setIsVerification(true);
//       setError("");
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       setError("Error sending verification code. Please try again.");
//       setIsLoading(false);
//     });
// };

// return (
//   <>
//     <div
//       style={{
//         zIndex: 9999,
//       }}
//       className="fixed overflow-x-hidden h-screen w-screen bg-gray-800 bg-opacity-100 pb-4 inset-0 sm:flex sm:items-center sm:justify-center"
//     >
//       <div className="relative w-full lg:w-[850px] rounded-xl overflow-y-auto shadow-xl pt-[75px] pb-6 flex flex-col lg:flex-row">
        
//         {/* Left Side - Image Section */}
//         <div className="relative w-full lg:w-[50%] rounded-tl-xl rounded-bl-xl overflow-y-auto">
//           <div className="absolute top-0 -z-10 h-full w-full bg-white">
//             <div className="absolute bottom-0 left-6 right-0 top-36 h-[200px] w-[350px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(72,65,156,0.51)] opacity-60 blur-[60px]"></div>
//             <div className="absolute bottom-0 left-5 right-0 top-10 h-[200px] w-[200px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(243,230,114,0.7)] opacity-80 blur-[50px]"></div>
//             <div className="absolute bottom-28 left-auto right-0 top-auto h-[200px] w-[200px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(143,235,241,0.7)] opacity-80 blur-[50px]"></div>
//           </div>
//             {/* <span className="text-3xl text-homeBlue font-bold font-[Fraunces] text-left flex justify-center items-center relative top-7 -left-9">
//                     Create an Account
//             </span> */}
//           <div className="flex justify-end p-4 mt-36">
            
//             <img src="/img/RegisterFormImg.png" alt="" className="w-[100%]" />
//           </div>
          
//         </div>

//         {/* Right Side - Form Section */}
//         <div className="bg-[#fff] overflow-y-auto shadow-xl overflow-x-hidden w-full lg:w-[60%] h-screen lg:h-auto rounded-tr-xl rounded-br-xl">
//           <div className="pt-3.5 pb-9 flex flex-col justify-center px-9 space-y-4">
//             <div className="space-y-2">
//               <a href="/" className="flex justify-center items-center">
//                 <Image
//                   src="/img/navbarlogo.png"
//                   alt="Logo"
//                   className="h-[74px]"
//                   height={52}
//                   width={208}
//                   priority
//                 />
//               </a>
//             </div>
//             {isVerification ? (
//               <>
//                 <span className="text-[#1B1B1B] text-[20px] text-center">
//                   Welcome
//                 </span>
//                 <span className="text-[14px] text-center">
//                   A verification code has been sent.
//                 </span>
//                 {error !== "" && (
//                   <>
//                     <span className="text-[#af3232] text-[12px] text-center">
//                       {error} Please try again.
//                     </span>
//                   </>
//                 )}
//                 <input
//                   type="text"
//                   value={verificationCode}
//                   onChange={handleVerificationCodeChange}
//                   placeholder="Verification Code"
//                   className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm`}
//                 />
//                 <button
//                   className={`bg-[#1893F8] rounded-md font-bold py-3 w-full text-white `}
//                   onClick={handleVerifyCode}
//                   disabled={isLoading} // Disable the button while loading
//                 >
//                   {isLoading ? "Verifying..." : "Verify Code"}
//                 </button>
//                 <div className="flex justify-center items-center">
//                   <span
//                     onClick={resendTheloginCode}
//                     className="text-[#1893F8] text-[14px] cursor-pointer"
//                   >
//                     Resend the login code
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <>
                
//                 <div className="flex flex-col text-gray-900 gap-6">
//                   <div className="w-full">
//                     <Formik
//                       initialValues={initialSignUpValues}
//                       validationSchema={NewSignUpSchema}
//                       onSubmit={checkUserAvalibility}
//                     >
//                       {(formik) => {
//                         const { errors, touched, isValid, dirty } = formik;
//                         return (
//                           <Form>
//                           <div className="space-y-6">
//                             <div className="relative">
//                               <Field
//                                 id="firstName"
//                                 name="firstName"
//                                 type="text"
//                                 autoComplete="firstName"
//                                 required
//                                 className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-transparent focus:ring-0 focus:outline-none sm:text-sm peer ${
//                                   errors.firstName && touched.firstName ? "border-red-500" : ""
//                                 }`}
//                                 placeholder=" " // Keep this space to trigger the effect
//                               />
//                               <label
//                                 htmlFor="firstName"
//                                 className="absolute text-[15px] bg-white text-gray-600 duration-300 transform -translate-y-4 scale-75 top-0 left-3 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
//                               >
//                                 First Name
//                               </label>
//                               <ErrorMessage
//                                 name="firstName"
//                                 component="span"
//                                 className="text-red-500"
//                               />
//                             </div>

//                             <div className="relative">
//                               <Field
//                                 id="lastName"
//                                 name="lastName"
//                                 type="text"
//                                 autoComplete="lastName"
//                                 required
//                                 className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-transparent focus:ring-0 focus:outline-none sm:text-sm peer ${
//                                   errors.lastName && touched.lastName ? "border-red-500" : ""
//                                 }`}
//                                 placeholder=" " // Keep this space to trigger the effect
//                               />
//                               <label
//                                 htmlFor="lastName"
//                                 className="absolute text-[15px] bg-white text-gray-600 duration-300 transform -translate-y-4 scale-75 top-0 left-3 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
//                               >
//                                 Last Name
//                               </label>
//                               <ErrorMessage
//                                 name="lastName"
//                                 component="span"
//                                 className="text-red-500"
//                               />
//                             </div>

//                             <div className="relative">
//                               <Field
//                                 id="phone-number"
//                                 name="phoneNumber"
//                                 type="text"
//                                 autoComplete="phoneNumber"
//                                 required
//                                 className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-transparent focus:ring-0 focus:outline-none sm:text-sm peer`}
//                                 placeholder=" " // Keep this space to trigger the effect
//                               />
//                               <label
//                                 htmlFor="phone-number"
//                                 className="absolute text-[15px] bg-white text-gray-600 duration-300 transform -translate-y-4 scale-75 top-0 left-3 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
//                               >
//                                 Phone Number
//                               </label>
//                               <ErrorMessage
//                                 name="phoneNumber"
//                                 component="span"
//                                 className="text-red-500"
//                               />
//                             </div>

//                             <div className="relative">
//                               <Field
//                                 id="email-address"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 required
//                                 className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-transparent focus:ring-0 focus:outline-none sm:text-sm peer ${
//                                   errors.email && touched.email ? "border-red-500" : ""
//                                 }`}
//                                 placeholder=" " // Keep this space to trigger the effect
//                               />
//                               <label
//                                 htmlFor="email-address"
//                                 className="absolute text-[15px] bg-white text-gray-600 duration-300 transform -translate-y-4 scale-75 top-0 left-3 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-3"
//                               >
//                                 Email
//                               </label>
//                               <ErrorMessage
//                                 name="email"
//                                 component="span"
//                                 className="text-red-500"
//                               />
//                             </div>

//                             <div className="flex flex-col gap-2 mt-2 space-y-3">
//                               <span className="text-[12px]">
//                                 {`By clicking "Join for Free" you agree to Checkins Terms of Service and Privacy Policy.`}
//                               </span>
//                               <button
//                                 className={`bg-[#1893F8] rounded-md font-bold py-3 w-full text-white ${
//                                   !(dirty && isValid) ? "cursor-not-allowed" : null
//                                 }`}
//                                 type="submit"
//                               >
//                                 {isLoading ? "Validating..." : "Join for Free"}
//                               </button>
//                             </div>
//                           </div>
//                         </Form>
//                         );
//                       }}
//                     </Formik>
//                   </div>

//                   <div className="flex items-center justify-center space-x-3 -my-2">
//                     <div className="border-t border-gray-400 w-full"></div>
//                     <span className="text-gray-500">or</span>
//                     <div className="border-t border-gray-400 w-full"></div>
//                   </div>

//                   <button className="bg-[#c7c5c580] hover:bg-[#81839280] rounded-md font-bold py-3 w-full text-black flex items-center justify-center">
//                     <div className="mr-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         x="0px"
//                         y="0px"
//                         width="25"
//                         height="25"
//                         viewBox="0 0 48 48"
//                       >
//                         <path
//                           fill="#FFC107"
//                           d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.66-6.073,8-11.303,8 c-6.627,0-12-5.373-12-12s5.373-12,12-12c2.938,0,5.624,1.044,7.742,2.952l6.364-6.364C34.693,6.67,29.556,4,24,4 C12.954,4,4,12.954,4,24s8.954,20,20,20c10.493,0,19.268-8.21,19.94-18.5C43.98,24.669,44,22.34,44,20.5 C44,20.361,43.984,20.221,43.973,20.083z"
//                         ></path>
//                         <path
//                           fill="#FF3D00"
//                           d="M6.306,14.691l7.313,5.362C15.048,17.157,18.292,15,22,15c2.938,0,5.624,1.044,7.742,2.952l6.364-6.364 C34.693,6.67,29.556,4,24,4C15.979,4,9.011,8.767,6.306,14.691z"
//                         ></path>
//                         <path
//                           fill="#4CAF50"
//                           d="M24,44c5.407,0,10.287-2.057,13.98-5.422l-6.612-5.688C29.788,34.955,26.983,36,24,36 c-5.231,0-9.66-3.335-11.313-8L5.973,33.431C8.667,39.346,15.251,44,24,44z"
//                         ></path>
//                         <path
//                           fill="#1976D2"
//                           d="M43.611,20.083H42V20H24v8h11.303c-0.794,2.247-2.243,4.181-4.083,5.588 c-0.021,0.015-0.04,0.032-0.061,0.047l6.612,5.688c-0.466,0.426,6.505-4.756,6.505-14.322 C44,20.361,43.984,20.221,43.973,20.083z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <span className="text-[15px]">Continue with Google</span>
//                   </button>
//                   <span className="text-[14px] flex justify-center items-center">
//                     Already have an account?{" "}
//                     <a
//                       href="/sign-in"
//                       className=" hover:underline text-[#1893F8] ml-1 cursor-pointer"
//                     >
//                       Log in
//                     </a>
//                   </span>
//                   <span className="text-[14px] flex justify-center items-center">
//                     Already have an account?{" "}
//                     <a
//                       href=""
//                       className=" hover:underline text-[#1893F8] ml-1 cursor-pointer"
//                     >
//                       Sign up
//                     </a>
//                   </span>
                  
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// );


// }
