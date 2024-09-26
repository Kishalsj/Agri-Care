"use client";

import dynamic from "next/dynamic";

const Popup = dynamic(() => import("reactjs-popup"), { ssr: false });

export default function HotelListingStaleModal({ isOpen }) {
  return (
    <Popup
      open={isOpen}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      contentStyle={{ height: "70%" }}
      suppressHydrationWarning={true}
      closeOnDocumentClick
      modal
    >
      {(close) => (
        <div
          id="hotel-listing-stale-modal"
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative justify-center items-center rounded-2xl  sm:w-6/12 lg:w-[35%] w-full  bg-[#fff] my-6">
            <div className="px-4 justify-center xl:justify-start py-7 flex flex-col xl:flex-row space-x-0 xl:space-x-5">
              <div className="w-full">
                <div className="text-[#5C6A7A] xl:justify-start xl:items-start items-center justify-center flex flex-col space-y-6">
                  <div>
                    These rates are now stale by more than 15 minutes. Please
                    click refresh and we will renegotiate the prices
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      onClick={() => {
                        location.reload();
                        close();
                      }}
                      className="bg-[#c3c4c5] hover:bg-[#1893F8] rounded-full px-3 py-2 text-white mr-4 outline-none"
                    >
                      Refresh
                    </button>
                    <button
                      onClick={close}
                      className="bg-[#1893F8] rounded-full px-3 py-2 text-white outline-none"
                      ml="3"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
