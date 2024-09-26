"use client";

import Popup from "reactjs-popup";

export default function Modal({
  trigger,
  headerText = "",
  bodyText = "",
  children,
  confirmationText,
  cancelText,
  onConfirm,
  onOpen,
}) {
  return (
    <Popup
      trigger={trigger}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      contentStyle={{ height: "70%" }}
      suppressHydrationWarning={true}
      aria-describedby={headerText.toLowerCase()}
      closeOnDocumentClick
      modal
      onOpen={onOpen}
    >
      {(close) => (
        <div
          id={headerText.toLowerCase().split(" ").join("-")}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative justify-center items-center rounded-2xl  sm:w-6/12 lg:w-[35%] w-full  bg-[#fff] my-6">
            <div className="px-4 justify-center xl:justify-start py-7 flex flex-col xl:flex-row space-x-0 xl:space-x-5">
              <div className="w-full">
                <div className="text-[#5C6A7A] xl:justify-start xl:items-start items-center justify-center flex flex-col space-y-6">
                  {headerText && (
                    <span className="text-[#002248]  text-[18px] font-bold">
                      {headerText}
                    </span>
                  )}
                  {bodyText && <span className="w-full">{bodyText}</span>}
                  {children}
                  {(confirmationText || cancelText) && (
                    <div className="w-full flex justify-end">
                      {confirmationText && (
                        <button
                          id="confirm"
                          onClick={() => onConfirm(close)}
                          className="bg-[#c3c4c5] hover:bg-[#1893F8] rounded-full px-3 py-2 text-white mr-4 outline-none"
                        >
                          {confirmationText}
                        </button>
                      )}
                      {cancelText && (
                        <button
                          id="cancel"
                          onClick={close}
                          className="bg-[#1893F8] rounded-full px-3 py-2 text-white outline-none"
                          ml="3"
                        >
                          {cancelText}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
