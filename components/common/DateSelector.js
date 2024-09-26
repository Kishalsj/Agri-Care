import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelector({
  dateSelected = [],
  setDateSelected,
  isHomePage = false,
}) {
  const [dateRange, setDateRange] = useState(() => {
    return dateSelected.length === 0 ? [null, null] : dateSelected;
  });
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      setDateSelected([startDate.toISOString(), endDate.toISOString()]);
    }
  }, [dateRange]);

  return (
    <div
      id="hotel-search-date-selector"
      className="widthcalendar flex flex-1 items-center flex-row"
    >
      <div className="flex flex-1 flex-col items-start">
        {isHomePage ? (
          <label
            htmlFor="dateInput"
            className="-mb-[4px] sticky text-[13px] font-semibold"
          >
            Dates
          </label>
        ) : (
          <label htmlFor="dateInput"></label>
        )}

        <div className="w-full">
          <div className="react-datepicker__input-container">
            <span
              role="alert"
              aria-live="polite"
              className="react-datepicker__aria-live"
            ></span>
            <DatePicker
              id="dateInput"
              className={`${
                isHomePage ? "" : "px-4 rounded-full"
              } -px-11 bg-[#fff] text-[14px] lg:text-[12px] xl:text-[14px] flex-initial h-9 font-base py-2 w-[100%] outline-none`}
              dayClassName={() => "custom-react-datepicker-day"}
              placeholderText="Check-in - Check-out"
              dateFormat="MMM d, yyyy"
              selectsRange={true}
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
