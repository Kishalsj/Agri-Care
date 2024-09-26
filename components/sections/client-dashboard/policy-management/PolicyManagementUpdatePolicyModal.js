import Modal from "@/components/common/Modal";
import PolicyManagementModalBody from "./PolicyManagementModalBody";
import { useState } from "react";

export default function PolicyManagementUpdatePolicyModal({
  policy,
  setPolicy,
  handlePolicySubmit,
  max_price_policy,
  setMaxPricePolicy,
  star_rating_policy,
  setStarRating,
}) {
  return (
    <Modal
      headerText="Which Policy do you need to update ?"
      confirmationText="Save"
      cancelText="Cancel"
      onConfirm={(close) => handlePolicySubmit(policy, close)}
      trigger={
        <button
          className="bg-[#1893F8] rounded-full px-6 font-bold py-2 text-white"
          suppressHydrationWarning={true}
        >
          Update Policy
        </button>
      }
    >
      <PolicyManagementModalBody
        setPolicy={setPolicy}
        max_price_policy={max_price_policy}
        setMaxPricePolicy={setMaxPricePolicy}
        star_rating_policy={star_rating_policy}
        setStarRating={setStarRating}
      />
    </Modal>
  );
}
