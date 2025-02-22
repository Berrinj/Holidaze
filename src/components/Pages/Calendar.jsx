import { useState } from "react";
import { StyledCalendar } from "./Calender.styles";

/**
 * a calendar component that allows users to select a date range
 * @param {*} onDateChange - the function that handles the date change
 * @param {*} bookedDates - the array of booked dates
 * @returns the CalendarComponent
 */

function CalendarComponent({ onDateChange, bookedDates }) {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  const isDateBooked = (date) => {
    return bookedDates.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return date >= fromDate && date <= toDate;
    });
  };

  return (
    <div className="calendar-container">
      <StyledCalendar
        onChange={handleDateChange}
        value={date}
        selectRange={true}
        minDate={new Date()}
        tileDisabled={({ date }) => isDateBooked(date)}
      />
    </div>
  );
}

export default CalendarComponent;
