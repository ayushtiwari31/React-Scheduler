
import React from 'react';

const CalendarHeader = ({ month, year, onNext, onPrev }) => {
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>{"<"}</button>
      <div>{month} {year}</div>
      <button onClick={onNext}>{">"}</button>
    </div>
  );
};

export default CalendarHeader;
