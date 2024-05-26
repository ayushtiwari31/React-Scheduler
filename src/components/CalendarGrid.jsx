
import React from 'react';
import CalendarCell from './CalendarCell';

const CalendarGrid = ({ days, events, onDayClick, onDeleteEvent, onDropEvent, month, year }) => {
  const getWeekday = (day) => {
    const date = new Date(year, month, day);
    return date.toLocaleString('default', { weekday: 'short' });
  };

  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? 'AM' : 'PM';
    return `${hour} ${period}`;
  });

  const weekdays = days.map(day => getWeekday(day));

  return (
    <div className="calendar-grid-container">
      <div className="calendar-grid">
        <div className="calendar-row">
          <div className="calendar-cell header"></div>
          {weekdays.map((weekday, index) => (
            <div key={index} className="calendar-cell header">
              {weekday} {days[index]}
            </div>
          ))}
        </div>
        {times.map((time, timeIndex) => (
          <div className="calendar-row" key={timeIndex}>
            <div className="calendar-time-slot" >{time}</div>
            {days.map((day) => (
              <CalendarCell
                key={`${day}-${time}`}
                day={day}
                time={timeIndex}
                events={events[day]?.[timeIndex] || []}
                onDayClick={onDayClick}
                onDeleteEvent={onDeleteEvent}
                onDropEvent={onDropEvent}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
