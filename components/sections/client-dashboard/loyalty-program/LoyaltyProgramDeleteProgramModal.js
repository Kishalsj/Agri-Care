import Modal from "@/components/common/Modal";
import TrashIcon from "@/components/icons/TrashIcon";

export default function LoyaltyProgramDeleteProgramModal({
  deleteProgram,
  loyaltyId,
}) {
  return (
    <Modal
      headerText="Delete Hotel Loyalty Program"
      bodyText="Are you sure you want to delete this hotel loyalty program? This cannot be undone."
      confirmationText="Delete"
      cancelText="Cancel"
      onConfirm={(close) => deleteProgram(close, loyaltyId)}
      trigger={
        <div
          id="delete"
          className="cursor-pointer"
          suppressHydrationWarning={true}
        >
          <TrashIcon />
        </div>
      }
    />
  );
}
