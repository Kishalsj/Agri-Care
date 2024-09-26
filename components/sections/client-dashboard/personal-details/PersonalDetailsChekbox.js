"use client";

import { useState } from "react";

export default function PersonalDetailsCheckbox({
  id,
  label,
  initialValue = false,
  disabled = false,
}) {
  const [checked, setChecked] = useState(initialValue);

  return (
    <div className=" flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        className={`w-[29px] h-[19px] cursor-pointer ${
          !disabled ? "cursor-pointer" : ""
        }`}
        checked={checked}
        disabled={disabled}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={id} className={!disabled ? "cursor-pointer" : ""}>
        {label}
      </label>
    </div>
  );
}
