import Modal from "@/components/common/Modal";
import TrashIcon from "@/components/icons/TrashIcon";

export default function PolicyManagementDeletePolicyModal({
  deletePolicy,
  policy,
}) {
  return (
    <Modal
      headerText="Delete Selected Policy"
      bodyText={`Are you sure you want to delete this Policy? This cannot be undone.`}
      confirmationText="Delete"
      cancelText="Cancel"
      onConfirm={(close) => {
        deletePolicy(policy, close);
      }}
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
