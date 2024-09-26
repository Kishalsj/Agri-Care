"use client";

import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "@/components/contexts/AuthContext";
import PolicyManagementUpdatePolicyModal from "./PolicyManagementUpdatePolicyModal";
import PolicyManagementDeletePolicyModal from "./PolicyManagementDeletePolicyModal";

export default function PolicyManagement() {
  const [user, setUser] = useContext(AuthContext);
  const [policy, setPolicy] = useState("max_price_policy");
  const [max_price_policy, setMaxPricePolicy] = useState(
    user?.max_price_policy
  );
  const [star_rating_policy, setStarRating] = useState(
    user?.star_rating_policy
  );

  const handlePolicySubmit = async (policy, close) => {
    console.log("handlePolicySubmit", user.email);
    console.log("handlePolicySubmit", policy);
    console.log("handlePolicySubmit", max_price_policy);
    console.log("handlePolicySubmit", star_rating_policy);

    try {
      const value =
        policy === "max_price_policy" ? max_price_policy : star_rating_policy;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/policy/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
            policy: policy,
            value: value,
          }),
        }
      );

      const data = await response.json();
      const obj = Object.create(null, { [policy]: { value: Number(value) } });

      const policies = { ...data, ...obj };

      setUser({
        ...user,
        ...policies,
      });

      close();

      if (response.status === 200) {
        toast.info("Policy Updated Successfully");
      } else {
        toast.error(response.status);
      }
    } catch (error) {
      toast.error(error.response.data.status);
    }
  };

  const deletePolicy = async (policy, close) => {
    try {
      const value = 0;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AXIOS_URL}/api/v1/auth/user/policy/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
            policy: policy,
            value: 0,
          }),
        }
      );

      const data = await response.json();
      const obj = Object.create(null, { [policy]: { value: Number(0) } });

      const policies = { ...data, ...obj };
      setUser({
        ...user,
        ...policies,
      });

      close();

      if (policy === "max_price_policy") setMaxPricePolicy(0);
      else setStarRating(0);

      if (response.status === 200) {
        toast.info("Policy Deleted Successfully");
      } else {
        toast.error(response.status);
      }
    } catch (error) {
      toast.error(error.response.data.status);
    }
  };

  return (
    <>
      <div
        id="policy-management"
        className="space-y-4 flex flex-col bg-white rounded-2xl shadow p-4"
      >
        <div className="flex justify-end">
          <PolicyManagementUpdatePolicyModal
            policy={policy}
            setPolicy={setPolicy}
            handlePolicySubmit={handlePolicySubmit}
            max_price_policy={max_price_policy}
            setMaxPricePolicy={setMaxPricePolicy}
            star_rating_policy={star_rating_policy}
            setStarRating={setStarRating}
          />
        </div>

        <table className="flex flex-col rounded-2xl overflow-hidden border mb-[30px] w-full text-[#5C6A7A]">
          <thead>
            <tr className="flex flex-row bg-[#5C6A7A] px-3 py-2 bg-opacity-10 justify-between text-[#002248] font-bold flex-1">
              <th className="w-2/5 text-left">Policy</th>
              <th className="w-2/5 text-left">Opted Value</th>
              <th className="w-1/5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="flex flex-col max-h-[200px]">
            {max_price_policy > 0 && (
              <tr className="flex flex-row text-left justify-between items-center border-b-[1px] last-of-type:border-b-0 p-3">
                <td className="w-2/5 text-left">Maximum Price Limit</td>
                <td className="w-2/5 text-left">{`${max_price_policy} USD`}</td>
                <td className="w-1/5 text-center justify-center flex">
                  <PolicyManagementDeletePolicyModal
                    deletePolicy={deletePolicy}
                    policy="max_price_policy"
                  />
                </td>
              </tr>
            )}
            {star_rating_policy > 0 && (
              <tr className="flex flex-row text-left justify-between items-center border-b-[1px] last-of-type:border-b-0 p-3">
                <td className="w-2/5 text-left">Star Rating</td>
                <td className="w-2/5 text-left">{star_rating_policy}</td>
                <td className="w-1/5 text-center justify-center flex">
                  <PolicyManagementDeletePolicyModal
                    deletePolicy={deletePolicy}
                    policy="star_rating_policy"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
