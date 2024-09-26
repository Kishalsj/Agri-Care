import Image from "next/image";
import Subscribe from '@/components/sections/footer/Subscribe'
import american from "@/public/img/payments/american.png";
import master from "@/public/img/payments/master.png";
import visa from "@/public/img/payments/visa.png";
import googlepay from "@/public/img/payments/googlepay.webp";
import applepay from "@/public/img/payments/applepay.webp";
import stripe from "@/public/img/payments/stripe.png";
import Klarna from "@/public/img/payments/Klarna.png";
import Affirm from "@/public/img/payments/Affirm.png";

export default function Footer() {
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <footer className="bg-[#002248] footer bottom-0 mt-[110px] pt-20 items-center">
      <div className="start-learning">
        <div className="footer-start gap-3 lg:gap-0 w-full flex flex-col lg:flex-row">
          <div className="texts lg:w-1/2 text-center w-full text-white ">
            <h2 className="section-title text-[20px] lg:text-[28px] font-bold">
              Join Our Newsletter
            </h2>
            <h3 className="section-sub-title text-[10px] lg:text-[12px] 2xl:text-[17px]">
              Sign up and we’ll send the best deals to you
            </h3>
          </div>
          <Subscribe />
          <div className="absolute top-0  hidden md:block left-2 opacity-50">
            <svg
              width="133"
              height="89"
              viewBox="0 0 227 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M53.7624 141.876C24.6517 123.1 5.82143 95.5545 1.41411 65.2983C-2.9932 35.0422 7.38345 4.55415 30.2613 -19.4588C53.1392 -43.4718 86.6442 -59.0426 123.406 -62.7459C160.167 -66.4492 197.174 -57.9816 226.285 -39.2059L194.799 -6.15828C176.314 -18.0808 152.815 -23.4577 129.471 -21.1061C106.128 -18.7545 84.8522 -8.86707 70.3248 6.38112C55.7974 21.6293 49.2083 40.9891 52.0069 60.2017C54.8055 79.4143 66.7627 96.9058 85.2479 108.828L53.7624 141.876Z"
                fill="#F3FCFB"
              />
            </svg>
          </div>
          <div className="absolute top-0 hidden md:block right-44 opacity-50">
            <svg
              width="133"
              height="89"
              viewBox="0 0 224 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M206.325 -75.0863C222.762 -52.0352 227.708 -24.7062 220.076 0.888377C212.443 26.483 192.857 48.2468 165.626 61.392C138.395 74.5371 105.75 77.9868 74.8716 70.9822C43.9937 63.9777 17.4124 47.0925 0.975521 24.0414L40.274 5.071C50.4197 19.2994 66.8271 29.7218 85.8866 34.0454C104.946 38.369 125.097 36.2397 141.905 28.1258C158.713 20.0119 170.803 6.57811 175.514 -9.22028C180.226 -25.0187 177.173 -41.8875 167.027 -56.1159L206.325 -75.0863Z"
                fill="#F3FCFB"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 hidden md:block left-80 opacity-50">
            <svg
              width="133"
              height="89"
              viewBox="0 0 196 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M147.469 176.337C173.033 159.849 189.812 135.915 194.116 109.801C198.419 83.6857 189.894 57.5291 170.417 37.085C150.939 16.6409 122.104 3.58394 90.2547 0.786495C58.4057 -2.01095 26.1516 5.68026 0.58788 22.1682L28.6971 51.672C44.4764 41.4948 64.3853 36.7474 84.0443 38.4741C103.703 40.2008 121.502 48.2603 133.524 60.8795C145.547 73.4987 150.809 89.6439 148.153 105.763C145.497 121.883 135.14 136.656 119.36 146.833L147.469 176.337Z"
                fill="white"
                fillOpacity="0.42"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="pb-10">
        <div className=" flex flex-col md:flex-row lg:space-x-0 md:space-x-7 space-x-0 space-y-3 lg:w-10/12 mx-auto flex-wrap items-center justify-center md:items-start">
          <div className="pt-2 flex flex-col items-center md:items-start lg:w-1/3 space-y-4">
            <div className="flex flex-row items-center space-x-2">
              <Image
                src="/img/navbarlogo.png"
                className="object-cover nowhitebackground"
                height={75}
                width={300}
                alt="navbarlogo"
                priority
              />
            </div>
            <div className="text-white lg:text-start text-center flex flex-col gap-2">
              <span>
              Discover the groundbreaking difference with Checkins - the
                world's first commission-free hotel booking platform,
                revolutionizing the industry by offering direct access to
                wholesale rates without any additional fees or commissions!
              </span>
            </div>
            {/* <div className="flex flex-col space-y-1">
                <div className="flex flex-row space-x-1">
                  <Image
                    src={visa}
                    alt="visa"
                    className="rounded-md h-11 object-cover w-[76px]"
                  />
                  <Image
                    src={american}
                    alt="american"
                    className="rounded-md h-11 object-cover w-[82px]"
                  />
                  <Image
                    src={master}
                    alt="master"
                    className="rounded-md h-11 object-cover w-[76px]"
                  />
                  <Image
                    src={Klarna}
                    alt="Klarna"
                    className="rounded-md h-11 object-cover w-[70px]"
                  />
                </div>
                <div className=" space-x-1 flex flex-row">
                  <Image
                    src={stripe}
                    alt="stripe"
                    className="rounded-md h-11 object-cover w-[76px]"
                  />
                  <Image
                    src={applepay}
                    alt="applepay"
                    className="rounded-md h-11 object-cover w-[80px]"
                  />
                  <Image
                    src={googlepay}
                    alt="googlepay"
                    className="rounded-md h-11 object-cover w-[79px]"
                  />
                  <Image
                    src={Affirm}
                    alt="Affirm"
                    className="rounded-md h-11 object-cover w-[70px]"
                  />
                </div>
              </div> */}
          </div>
          <div className="flex flex-row lg:w-2/3 justify-around lg:space-x-0 space-x-16">
              <div className="flex flex-col text-center lg:text-left space-y-3 text-[12px] 2xl:text-[17px] text-white">
                <span className="font-bold text-[22px] 2xl:text-[25px]">
                  Checkins
                </span>
                <a href="/AboutUs" className="hover:text-[#1893F8]">
                  About Us
                </a>
                <a href="/PriceGuarantee" className="hover:text-[#1893F8]">
                  Price Guarantee
                </a>
              
                <a href="/FAQ" className="hover:text-[#1893F8]">
                  FAQ's
                </a>
              
              </div>
              <div className="w-[1px] bg-[#FFFFFF] lg:hidden "></div>

              <div className="flex text-[12px] 2xl:text-[17px] text-center lg:text-left flex-col space-y-3 text-white">
                <span className="font-bold text-[22px] 2xl:text-[25px]">
                  Support
                </span>

                {/* <a href="/HelpCenter" className="hover:text-[#1893F8]">
                  Help Center
                </a> */}
                <a href="/my-trips" className="hover:text-[#1893F8]">
                  My Trip
                </a>
                
               
                <a href="/contact-us" className="hover:text-[#1893F8]">
                  
                  Contact Us
                </a>
              </div>
              <div className="lg:flex flex-col hidden  space-y-3 text-[12px] 2xl:text-[17px] text-white">
                <span className="font-bold text-[22px] 2xl:text-[25px]">
                  
                  Resources
                </span>

                {/* <a
                  href="https://blogs.Checkins.ai"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:text-[#1893F8]"
                >
                  Official Blog
                </a> */}
              
                <a href="/Reviews" className="hover:text-[#1893F8]">
                  Read Reviews
                </a>
                <a href="/Careers" className="hover:text-[#1893F8]">
                  Careers
                </a>
               
              </div>
            </div>
        </div>
      </div>
      <div className="bg-[#1893F8] ml-3 items-center lg:ml-8 w-11/12 h-[1px]"></div>

      <div className="w-11/12 ml-3 lg:ml-8 pt-6 pb-5">
  <div className="flex justify-between items-center text-white text-[10px] lg:text-[15px]">
    <div>
      Copyright &copy; {currentYear} All Rights Reserved
    </div>
    <a href="/TermsAndConditions" className="hover:text-[#1893F8]">
      Terms & Conditions
    </a>
  </div>
</div>

    </footer>
  );
}
