import { useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

function CalendarComponent({ onDateChange }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  return (
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={date} selectRange={true} />
    </div>
  );
}

export default CalendarComponent;
