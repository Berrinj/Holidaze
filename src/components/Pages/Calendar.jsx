import { useState } from "react";
import { StyledCalendar } from "./Calender.styles";

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
