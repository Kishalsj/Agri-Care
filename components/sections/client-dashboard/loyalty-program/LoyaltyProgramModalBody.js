const programOptions = [
  "Program Name",
  "Accor Live Limitless",
  "Best Western Rewards",
  "Choice Privileges",
  "Drury Rewards",
  "IHG Rewards Club",
  "Hilton Honors",
  "Hello Rewards",
  "Redi Rewards",
  "Radisson Rewards",
  "Wyndham Rewards",
  "M Life Rewards",
  "Extended Perks",
  "Marriott Bonvoy",
  "Sonesta Travel Pass",
];

export default function LoyaltyProgramModalBody({
  loyaltyId,
  loyaltyProgramname,
  setLoyaltyId,
  setLoyaltyProgramname,
}) {
  return (
    <div className="space-y-4">
      <div className="">
        Save your hotel loyalty program numbers to automatically populate at
        checkout for any eligible hotel room.
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="program-name" className="text-[#697687] text-[12px]">
          Program Name
        </label>
        <select
          className="border m-0 flex-1 border-gray-300 rounded-md px-2 py-2"
          id="program-name"
          name="program-name"
          value={loyaltyProgramname}
          onChange={(event) => setLoyaltyProgramname(event.target.value)}
        >
          {programOptions.map((value, key) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="program-name" className="text-[#697687] text-[12px]">
          Program Number
        </label>
        <input
          id="program-number"
          name="program-number"
          type="text"
          value={loyaltyId}
          onChange={(event) => setLoyaltyId(event.target.value)}
          className="border w-full border-gray-300 rounded-md px-2 py-2"
        />
      </div>
    </div>
  );
}
