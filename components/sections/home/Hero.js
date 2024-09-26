"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import HotelSearch from "@/components/common/HotelSearch";
import gsap from 'gsap';
import { useEffect } from 'react';

export default function Hero() {
  const router = useRouter();
  const occupancies = [{ numOfAdults: 2, childAges: [] }];
  const currentDate = new Date();
  const checkIn = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  const checkOut = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() + 7
  );

  function handleSearch(dateSelected, occupancies, location) {
    if (location === "") {
      toast.error("Please input your search criteria");
      return;
    }

    const params = new URLSearchParams({
      location: JSON.stringify(location),
      checkIn: dateSelected[0],
      checkOut: dateSelected[1],
      occupancies: JSON.stringify(occupancies),
    });

    router.push(`hotel-listing?${params.toString()}`);
  }

  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      ".hero-img",
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, }
    );

    gsap.fromTo(
      ".hotel-search",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <section id="hero" className="relative">
      {/* Blurred Circle Backgrounds */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-10 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[#6264e680] opacity-80 blur-[30px]"></div>
        <div className="absolute bottom-auto -left-40 right-0 top-[800px] h-[800px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-40 blur-[50px]"></div>
        <div className="absolute bottom-auto left-0 right-0 top-0 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-40 blur-[50px]"></div>
        <div className="absolute bottom-auto left-[800px] right-0 top-[600px] h-[300px] w-[800px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[#6264e680] opacity-40 blur-[60px]"></div>
        <div className="absolute bottom-auto left-50 right-0  top-[800px] h-[800px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(244,109,109,0.5)] opacity-40 blur-[50px]"></div>
        <div className="absolute bottom-auto left-50 right-0  top-[3000px] h-[800px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(244,109,109,0.5)] opacity-40 blur-[50px]"></div>
        <div className="absolute bottom-auto left-0 right-0  top-[2600px] h-[400px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(109,231,247,0.5)] opacity-40 blur-[50px]"></div>
        <div className="absolute bottom-auto left-0 right-0  top-[3500px] h-[800px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(102,94,218,0.5)] opacity-40 blur-[50px]"></div>
      </div>
  
      <div className="container bg-[#ffffff28] rounded-lg lg:w-10/12 flex flex-col mx-auto">
        <div className="w-full flex">
          <div className="hero-text flex flex-col pt-10 px-6 mt-10 mb-3 lg:mb-[44px] space-y-6 w-full lg:w-2/3">
            <h1 className="max-w-full font-header flex flex-col text-[60px] 2xl:text-[80px] font-[900] text-black text-center md:text-left font-[Fraunces]">
              The Whole World Is
            </h1>
            <h1 className="max-w-full font-header flex flex-col text-[50px] 2xl:text-[70px] font-[900] text-homeBlue text-center md:text-left font-[Fraunces]">
              In Your Hand
            </h1>
          </div>
  
          <div className="hero-img lg:flex w-1/3 flex-end justify-end items-end hidden">
            <img src="/img/NewHeroimg.png" alt="" className="w-[75%] " />
          </div>
        </div>
      </div>
  
      <div className="hotel-search flex justify-center items-center w-full -mt-10 z-10 absolute inset-x-0 top-[400px] lg:w-10/12 2xl:w-6/12 mx-auto">
        <HotelSearch
          checkIn={checkIn}
          checkOut={checkOut}
          occupanciesInitialValue={occupancies}
          isHomePage={true}
          handleSearch={handleSearch}
        />
      </div>
    </section>
  );
  
}
