"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Travelers({
  occupancies,
  setOccupancies,
  isHomePage = false,
}) {
  const formDataRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ occupancies });
  const adultsInitialValue = formData.occupancies.reduce((total, occupancy) => {
    return total + occupancy.numOfAdults;
  }, 0);
  const [adults, setAdults] = useState(adultsInitialValue);
  const numOfChildrenInitialValue = formData.occupancies.reduce(
    (total, occupancy) => {
      return total + occupancy.childAges.length;
    },
    0
  );
  const [numOfChildren, setNumOfChildren] = useState(numOfChildrenInitialValue);

  const addRoom = () => {
    if (formData.occupancies.length < 4) {
      setFormData({
        ...formData,
        occupancies: [
          ...formData.occupancies,
          {
            numOfAdults: 2,
            childAges: [],
          },
        ],
      });
      setAdults(adults + 2);
    }
  };
  const removeRoom = (index) => {
    const newOccupancies = [...formData.occupancies];
    newOccupancies.splice(index, 1);
    setFormData({
      ...formData,
      occupancies: newOccupancies,
    });
    setAdults(adults - formData.occupancies[index].numOfAdults);
    setNumOfChildren(
      numOfChildren - formData.occupancies[index].childAges.length
    );
  };
  const incrementAdults = (index) => {
    if (formData.occupancies[index].numOfAdults < 6) {
      const newOccupancies = [...formData.occupancies];
      newOccupancies[index].numOfAdults++;
      setFormData({
        ...formData,
        occupancies: newOccupancies,
      });
      setAdults(adults + 1);
    }
  };
  const decrementAdults = (index) => {
    if (formData.occupancies[index].numOfAdults > 1) {
      const newOccupancies = [...formData.occupancies];
      newOccupancies[index].numOfAdults--;
      setFormData({
        ...formData,
        occupancies: newOccupancies,
      });
      setAdults(adults - 1);
    }
  };
  const incrementChildren = (index) => {
    const newOccupancies = [...formData.occupancies];
    if (newOccupancies[index].childAges.length < 4) {
      newOccupancies[index].childAges.push("");
      setFormData({
        ...formData,
        occupancies: newOccupancies,
      });

      setNumOfChildren(numOfChildren + 1);
    }
  };
  const decrementChildren = (index) => {
    const newOccupancies = [...formData.occupancies];
    if (newOccupancies[index].childAges.length > 0) {
      newOccupancies[index].childAges.pop();
      setFormData({
        ...formData,
        occupancies: newOccupancies,
      });
      setNumOfChildren(numOfChildren - 1);
    }
  };
  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    const newOccupancies = [...formData.occupancies];
    newOccupancies[roomIndex].childAges[childIndex] = parseInt(age);
    setFormData({
      ...formData,
      occupancies: newOccupancies,
    });
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Close if clicked outside of dropdown
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowModal(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(formDataRef);

  return (
    <div
      id="hotel-search-travelers"
      className={`${
        isHomePage ? "h-[52px]" : "h-9"
      } w-full flex flex-1 flex-col relative`}
    >
      {isHomePage ? (
        <label
          htmlFor="roomInput"
          className="-mb-[4px] lg:block text-[13px] font-semibold leading-6"
        >
          Travelers
        </label>
      ) : (
        <label htmlFor="roomInput" className="visually-hidden">
          Travelers
        </label>
      )}

      <input
        type="text"
        id="roomInput"
        className={`${
          isHomePage ? "" : "h-9 px-3 lg:px-4 py-2 lg:py-3 rounded-full"
        } text-[14px] lg:text-[12px] lg:text-[14px] bg-#fff] text-sm  focus:outline-none flex-1`}
        onClick={() => setShowModal(true)}
        readOnly
        value={`${formData.occupancies.length} Rooms , ${adults} Adults  , ${numOfChildren} Children`}
      />
      {showModal && (
        <div
          ref={formDataRef}
          className={`travelers-modal flex gap-3 border absolute ${
            isHomePage ? "-top-1" : "-top-5"
          } ${
            formData.occupancies.length > 2
              ? "h-[500px] lg:h-[575px] overflow-y-scroll"
              : "h-auto"
          }   lg:absolute shadow-2xl bg-white p-4 w-[262px] lg:w-80 rounded-2xl flex-col z-10`}
        >
          {formData.occupancies.map((occupancy, index) => (
            <div
              key={index}
              className="room flex flex-col gap-2 border-b-[1px] border-gray-200 pb-4"
            >
              <h2 className="font-bold text-[16px] justify-center text-center flex mb-3">
                Room {index + 1}
              </h2>
              <div className="flex flex-row items-center justify-between w-full">
                <span className="w-2/4">Adults</span>
                <div className="flex justify-between space-x-6">
                  <button
                    className={`decrement-adults border-[1px] h-6 w-6 rounded-full flex items-center justify-center ${
                      occupancy.numOfAdults > 1
                        ? "border-[#1893F8] text-[#1893F8]"
                        : "text-[#838688] opacity-50 border-[#838688]"
                    }`}
                    onClick={() => decrementAdults(index)}
                  >
                    -
                  </button>
                  <span>{occupancy.numOfAdults}</span>
                  <button
                    className={`increment-adults border-[1px] h-6 w-6 rounded-full flex items-center justify-center ${
                      occupancy.numOfAdults < 6
                        ? "border-[#1893F8] text-[#1893F8]"
                        : "text-[#838688] opacity-50 border-[#838688]"
                    }`}
                    onClick={() => incrementAdults(index)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <span className="w-2/4">Children</span>
                <div className="flex justify-between space-x-6">
                  <button
                    className={`decrement-children border-[1px] h-6 w-6 rounded-full flex items-center justify-center ${
                      occupancy.childAges.length > 0
                        ? "border-[#1893F8] text-[#1893F8]"
                        : "text-[#838688] opacity-50 border-[#838688]"
                    }`}
                    onClick={() => decrementChildren(index)}
                  >
                    -
                  </button>
                  <span>{occupancy.childAges.length}</span>
                  <button
                    className={`increment-children border-[1px] h-6 w-6 rounded-full flex items-center justify-center ${
                      occupancy.childAges.length < 4
                        ? "border-[#1893F8] text-[#1893F8]"
                        : "text-[#838688] opacity-50 border-[#838688]"
                    }`}
                    onClick={() => incrementChildren(index)}
                  >
                    +
                  </button>
                </div>
              </div>

              {occupancy.childAges.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-start mt-2">
                  {occupancy.childAges.map((age, childIndex) => (
                    <div
                      key={childIndex}
                      className="flex flex-col space-y-3 items-center justify-between odd:ml-2"
                    >
                      <select
                        value={age}
                        onChange={(e) =>
                          handleChildAgeChange(
                            index,
                            childIndex,
                            e.target.value
                          )
                        }
                        className=" border-[2px] font-bold rounded-full px-5 py-1"
                      >
                        <option value="">Age</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="4">4 Years</option>
                        <option value="5">5 Years</option>
                        <option value="6">6 Years</option>
                        <option value="7">7 Years</option>
                        <option value="8">8 Years</option>
                        <option value="9">9 Years</option>
                        <option value="10">10 Years</option>
                        <option value="11">11 Years</option>
                        <option value="12">12 Years</option>
                        <option value="13">13 Years</option>
                        <option value="14">14 Years</option>
                        <option value="15">15 Years</option>
                        <option value="16">16 Years</option>
                        <option value="17">17 Years</option>
                      </select>
                    </div>
                  ))}{" "}
                </div>
              ) : (
                <></>
              )}

              {index > 0 && (
                <button
                  className="text-[#1893F8] flex justify-end items-end font-semibold mt-2"
                  onClick={() => removeRoom(index)}
                >
                  Remove room
                </button>
              )}
            </div>
          ))}
          {formData.occupancies.length < 4 && (
            <button
              className="add-room text-[#1893F8] flex justify-end items-end font-semibold"
              onClick={addRoom}
            >
              Add another room
            </button>
          )}
          <button
            onClick={() => {
              // Check if any child ages are empty
              const hasEmptyChildAges = formData.occupancies.some((occupancy) =>
                occupancy.childAges.some((age) => age === "")
              );

              if (hasEmptyChildAges) {
                toast.error(
                  "Please fill in the ages for all children.", // Display an error notification when the input field is left empty.
                  {
                    position: toast.POSITION.TOP_RIGHT,
                  }
                );
              } else {
                setOccupancies(formData.occupancies);
                setShowModal(false);
              }
            }}
            className="bg-[#1893F8] rounded-full py-2 text-white "
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
