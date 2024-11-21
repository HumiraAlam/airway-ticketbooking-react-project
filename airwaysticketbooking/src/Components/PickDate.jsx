import React from 'react'
import DatePicker from 'react-datepicker';

export default function PickDate() {

     // state to manage the selected departure and return dates
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  //   Creating 2 Handlers for Date Selection:  to handle the departure date and return date selection:

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };


  return (
    <div>
      {/* Date picker for departure */}
      <DatePicker
        selected={departureDate}
        onChange={handleDepartureDateChange}
        placeholderText="Select Departure Date"
        dateFormat="dd MMM yyyy"
        minDate={new Date()} // Prevent selecting past dates
      />

      {/* Date picker for return */}

      <DatePicker
        selected={returnDate}
        onChange={handleReturnDateChange}
        placeholderText="Select Return Date"
        dateFormat="dd MMM yyyy"
        minDate={departureDate} // Ensure return date is after the departure date
      />
    </div>
  );
}
