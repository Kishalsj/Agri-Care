import Modal from "@/components/common/Modal";
import formatDate from "@/utils/format-date";
import { getCurrencySymbol } from "@/utils/hotel-detail-helper";

import InfoIcon from "@/components/icons/InfoIcon";

export default function HotelDetailsRoomsAvailableRoomCancellationPolicyModal({
  policies,
  currency,
}) {
  return (
    <Modal
      headerText="Cancellation Policy"
      cancelText="Cancel"
      trigger={
        <span className="cursor-pointer flex justify-center" suppressHydrationWarning={true}>
          <span>
            <InfoIcon width={18} height={18} />
          </span>
        </span>
      }
    >
      <div className="hotel-details-cancellation-policy-modal w-full gap-3 mt-3">
        <table className="flex flex-col rounded-lg overflow-hidden border mb-[30px] w-full text-[#5C6A7A]">
          <thead>
            <tr className="flex flex-row bg-[#5C6A7A] px-3 py-2 bg-opacity-10 justify-between text-[#002248] font-bold">
              <th className="w-1/3 text-center">From</th>
              <th className="w-1/3 text-center">To</th>
              <th className="w-1/3 text-center">Amount</th>
            </tr>
          </thead>
          <tbody className="flex flex-col max-h-[200px] overflow-y-scroll">
            {policies[0]?.rules &&
              policies[0]?.rules.map((policy, index) => {
                const startDate = formatDate(policy?.start, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                });
                const endDate = formatDate(policy?.end, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                });
                const rate = policy && policy.value && Math.ceil(policy.value);
                const estimatedValue =
                  policy && policy.estimatedValue && Math.ceil(policy.estimatedValue);

                return (
                  <tr
                    key={index}
                    className="flex flex-row text-left justify-between items-center border-b-[1px] last-of-type:border-b-0 p-3"
                  >
                    <td className="w-1/3 text-center">{startDate}</td>
                    <td className="w-1/3 text-center">{endDate}</td>
                    <td className="w-1/3 text-center">
                      {rate === 0 ? (
                        "Free"
                      ) : (
                        <>
                          {getCurrencySymbol(currency)}
                          {policy && policy.valueType === "Amount"
                            ? rate
                            : policy.valueType === "Percentage"
                            ? `${estimatedValue} (${rate}%)`
                            : ""}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
