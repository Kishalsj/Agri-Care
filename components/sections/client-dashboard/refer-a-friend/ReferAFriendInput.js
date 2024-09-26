"use client";

export default function ReferAFriendInput({ id, label, value, setValue }) {
  return (
    <div className="flex flex-col w-full space-y-2">
      <label htmlFor={id} className="text-[#697687] text-[12px]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="border w-full border-gray-300 rounded-md px-2 py-2"
      />
    </div>
  );
}
