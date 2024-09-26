import Modal from "@/components/common/Modal";
import LoyaltyProgramModalBody from "./LoyaltyProgramModalBody";

export default function LoyaltyProgramAddProgramModal({
  addProgram,
  loyaltyId,
  loyaltyProgramname,
  setLoyaltyId,
  setLoyaltyProgramname,
}) {
  return (
    <Modal
      headerText="Save hotel loyalty program number"
      confirmationText="Save"
      cancelText="Cancel"
      onConfirm={addProgram}
      trigger={
        <button
          className="bg-[#1893F8] rounded-full px-6 font-bold py-2 text-white"
          suppressHydrationWarning={true}
        >
          Add Program
        </button>
      }
    >
      <LoyaltyProgramModalBody
        loyaltyId={loyaltyId}
        loyaltyProgramname={loyaltyProgramname}
        setLoyaltyId={setLoyaltyId}
        setLoyaltyProgramname={setLoyaltyProgramname}
      />
    </Modal>
  );
}
