import React, { useState } from 'react';

const DateInputForm = () => {
  // Define state variables for year, month, and day
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // Function to handle changes in the year dropdown
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Function to handle changes in the month dropdown
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Function to handle changes in the day dropdown
  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  return (
    <div>
     
      <form>
        <h3>Set Campaign validity</h3>
        <label>Year:</label>
        <select value={year} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {/* You can generate years dynamically */}
          {Array.from({ length: 100 }, (_, i) => {
            const yearValue = new Date().getFullYear() - i;
            return (
              <option key={yearValue} value={yearValue}>
                {yearValue}
              </option>
            );
          })}
        </select>
        <label>Month:</label>
        <select value={month} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          {/* You can add all 12 months */}
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <label>Day:</label>
        <select value={day} onChange={handleDayChange}>
          <option value="">Select Day</option>
          {/* You can generate days dynamically based on the selected month and year */}
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default DateInputForm;
