import Image from "next/image";
import Navbar from "./Navbar";
import User from "./User";
import LoginIcon from '@/components/icons/loginIcon'
import LoginIcon2 from '@/components/icons/loginIcon2'
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value || false;

  const isAuthenticated = cookieStore.get("isAuthenticated")?.value || false
  
  return (
    <nav className="relative top-0 p-2 bg-white w-full lg:w-10/12 mx-auto lg:z-50 lg:higherIndexScroll shadow-sm">
      <div className="flex items-center justify-between">
        <div className="items-center">
          <a href="/" className="">
            <Image
              src="/img/navbarlogo.png"
              className="object-cover h-11 lg:h-[75px] w-[206px]"
              height={75}
              width={350}
              alt="navbarlogo"
              priority
            />
          </a>
        </div>
        <Navbar />
        <div className="flex gap-4 items-center">
        
        {isAuthenticated && isAuthenticated ? (
          <User />
        ) : (
          <>
          <a href="/sign-in"
                className="font-bold hidden text-[14px] flex-row  xl:block p-3 px-5 pt-1 text-center cursor-pointer text-black hover:bg-[#0729A0] hover:text-white hover:shadow-lg rounded-md baseline "
              >
                <span className="flex flex-row mr-1 items-center mt-1 font-Montserrat">
                  <LoginIcon2 />
                  {"Log in"}{" "}
                </span>
              </a>
              <a href="/register"
                className="hidden text-[14px] flex-row  xl:block p-3 px-5 pt-1 text-center cursor-pointer text-white bg-[#0729A0] hover:shadow-lg font-bold rounded-md baseline "
              >
                <span className="flex flex-row mr-1 items-center mt-1 font-Montserrat">
                  <LoginIcon />
                  {"Sign up"}{" "}
                </span>
              </a>
          </> 
              )}
              </div>
      </div>
    </nav>
  );
}
