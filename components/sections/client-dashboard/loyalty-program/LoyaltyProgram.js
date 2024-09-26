"use client";

import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "@/components/contexts/AuthContext";
import InfoIcon from "@/components/icons/InfoIcon";
import LoyaltyProgramAddProgramModal from "./LoyaltyProgramAddProgramModal";
import LoyaltyProgramDeleteProgramModal from "./LoyaltyProgramDeleteProgramModal";

export default function LoyaltyProgram({ programs = [] }) {
  const [user] = useContext(AuthContext);
  const [loyaltyId, setLoyaltyId] = useState("");
  const [loyaltyProgramname, setLoyaltyProgramname] = useState("");
  const [loyaltyPrograms, setLoyaltyPrograms] = useState(programs);

  async function addProgram(close) {
    if (loyaltyId === "" || loyaltyProgramname === "") {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/loyaltyPrograms/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
            loyaltyProgramname,
            loyaltyId,
          }),
        }
      );

      setLoyaltyId("");
      setLoyaltyProgramname("");

      close();

      toast.info("Program added successfully");

      const data = await fetchLoyaltyPrograms();

      setLoyaltyPrograms(data?.result);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  async function deleteProgram(close, loyaltyId) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/loyaltyPrograms/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
            id: loyaltyId,
          }),
        }
      );

      close();

      toast.info("Program deleted successfully");

      const data = await fetchLoyaltyPrograms();

      setLoyaltyPrograms(data?.result);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  async function fetchLoyaltyPrograms() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/loyaltyPrograms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
          }),
        }
      );

      return response.json();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <>
      <div>
        {loyaltyPrograms?.length === 0 ? (
          <div className="w-full px-[25%] py-10 bg-white rounded-2xl shadow ">
            <div className=" text-[#c0d0e1] justify-center items-center px-0 md:px-2 flex flex-col gap-2 py-3 mt-4 space-y-2">
              <InfoIcon color="#000" width={35} height={35} />
              <div className="justify-center font-bold flex text-[#002248]">
                No Programs yet
              </div>
              <div className="text-[#5C6A7A] flex justify-center">
                Add a Program and it will show up here.
              </div>
              <LoyaltyProgramAddProgramModal
                addProgram={addProgram}
                loyaltyId={loyaltyId}
                loyaltyProgramname={loyaltyProgramname}
                setLoyaltyId={setLoyaltyId}
                setLoyaltyProgramname={setLoyaltyProgramname}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col bg-white rounded-2xl shadow p-4">
            <div className="flex justify-end">
              <LoyaltyProgramAddProgramModal
                addProgram={addProgram}
                loyaltyId={loyaltyId}
                loyaltyProgramname={loyaltyProgramname}
                setLoyaltyId={setLoyaltyId}
                setLoyaltyProgramname={setLoyaltyProgramname}
              />
            </div>

            <table className="flex flex-col rounded-2xl overflow-hidden border mb-[30px] w-full text-[#5C6A7A]">
              <thead>
                <tr className="flex flex-row bg-[#5C6A7A] px-3 py-2 bg-opacity-10 justify-between text-[#002248] font-bold">
                  <th className="w-2/5 text-left">Program</th>
                  <th className="w-2/5 text-left">Loyalty ID</th>
                  <th className="w-1/5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="flex flex-col max-h-[200px] overflow-y-scroll">
                {loyaltyPrograms?.map((loyaltyProgram, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex flex-row text-left justify-between items-center border-b-[1px] last-of-type:border-b-0 p-3"
                    >
                      <td className="w-2/5 text-left">
                        {loyaltyProgram.loyaltyProgramname}
                      </td>
                      <td className="w-2/5 text-left">
                        {loyaltyProgram.loyalty_id}
                      </td>
                      <td className="w-1/5 text-center justify-center flex">
                        <LoyaltyProgramDeleteProgramModal
                          deleteProgram={deleteProgram}
                          loyaltyId={loyaltyProgram.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
