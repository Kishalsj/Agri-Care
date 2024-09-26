'use client'
import Destinations from "@/components/sections/home/Destinations";
import Hero from "@/components/sections/home/Hero";
import PopularLocations from "@/components/sections/home/PopularLocations";
import Offers from "@/components/sections/home/Offers";
import MobileSec from "@/components/sections/home/MobileSec";
import { Beforeunload } from 'react-beforeunload';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Reviews from "@/components/sections/home/Reviews";

const removeApplicationData = () => {
  if (typeof window !== 'undefined') {
    const lastTimeLogin = localStorage.getItem("timer");
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTimeLogin;
    const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

    if (timeDifferenceInHours > 14) {
      localStorage.removeItem("timer");
      localStorage.removeItem("isAuthenticated");
    }
  }
};
export default function HomePage() {
  return (
    <Beforeunload onBeforeunload={removeApplicationData()}>
      <div className="space-y-8 ">
        <Hero />
        <Offers />
        <PopularLocations />
        <Destinations />
        <Reviews />
        <MobileSec/>
      </div>
    </Beforeunload>
  );
}
