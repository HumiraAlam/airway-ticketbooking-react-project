import React from "react";
import DatePicker from "react-datepicker";

export default function Dates({
  label,
  selectedDate,
  onDateChange,
  placeholder,
}) {
  return (
    <div>
      <label>{label}</label>

      <div className="date-input">
        <DatePicker
          className="date-value"
          selected={selectedDate}
          onChange={onDateChange}
          placeholderText={placeholder}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()} // Disable past dates
        />
      </div>
    </div>
  );
}
