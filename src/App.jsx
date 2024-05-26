
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import EventForm from './components/EventForm';
import './App.css';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleNext = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const handlePrev = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const handleAddEvent = (day, time, title) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const newEvent = {
      id: new Date().getTime(),
      title,
      color: getRandomColor(),
      day,
      start: time,
      end: time + 1,
    };

    setEvents(prevEvents => {
      const monthEvents = prevEvents[year]?.[month] || {};
      const dayEvents = monthEvents[day] || {};
      return {
        ...prevEvents,
        [year]: {
          ...prevEvents[year],
          [month]: {
            ...monthEvents,
            [day]: {
              ...dayEvents,
              [time]: [...(dayEvents[time] || []), newEvent],
            },
          },
        },
      };
    });
  };

  const handleDeleteEvent = (day, time, eventId) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    setEvents(prevEvents => {
      const monthEvents = prevEvents[year]?.[month] || {};
      const dayEvents = monthEvents[day] || {};
      return {
        ...prevEvents,
        [year]: {
          ...prevEvents[year],
          [month]: {
            ...monthEvents,
            [day]: {
              ...dayEvents,
              [time]: dayEvents[time].filter(event => event.id !== eventId),
            },
          },
        },
      };
    });
  };

  const handleDayClick = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setIsEventFormOpen(true);
  };

  const handleDropEvent = (eventId, newDay, newTime) => {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
  
      for (const day in newEvents[year][month]) {
        for (const time in newEvents[year][month][day]) {
          const dayEvents = newEvents[year][month][day][time];
          
          // Ensure dayEvents is an array before using findIndex
          if (Array.isArray(dayEvents)) {
            const eventIndex = dayEvents.findIndex((event) => event.id === eventId);
            
            if (eventIndex > -1) {
              const [movedEvent] = dayEvents.splice(eventIndex, 1);
              movedEvent.day = newDay;
              movedEvent.start = newTime;
              movedEvent.end = newTime + 1;
              
              // Initialize newDay and newTime arrays if they don't exist
              if (!newEvents[year][month][newDay]) {
                newEvents[year][month][newDay] = {};
              }
              if (!newEvents[year][month][newDay][newTime]) {
                newEvents[year][month][newDay][newTime] = [];
              }
              
              newEvents[year][month][newDay][newTime].push(movedEvent);
  
              return newEvents; 
            }
          }
        }
      }
      
      return newEvents;
    });
  };
  

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const days = Array.from({ length: new Date(year, date.getMonth() + 1, 0).getDate() }, (_, i) => i + 1);
  const currentMonthEvents = events[year]?.[date.getMonth()] || {};

  const getRandomColor = () => {
    // const colors = ['#ffeb3b', '#ff5722', '#4caf50', '#2196f3', '#e91e63', '#FF9933', '#9FE2BF','#FF0000 ',];
    const colors = [
      '#ffeb3b', '#ff5722', '#4caf50', '#2196f3', '#e91e63', 
      '#FF9933', '#9FE2BF', '#FF0000', '#00CED1', '#9400D3', 
      '#FFD700', '#ADFF2F', '#FF69B4', '#CD5C5C', '#8A2BE2', 
      '#20B2AA', '#FF4500', '#DAA520', '#FF6347', '#4682B4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar">
        <h1 className='heading'>Mark Your Monthly Schedule</h1>
        <CalendarHeader month={month} year={year} onNext={handleNext} onPrev={handlePrev} />
        <CalendarGrid
          days={days}
          events={currentMonthEvents}
          onDayClick={handleDayClick}
          onDeleteEvent={handleDeleteEvent}
          onDropEvent={handleDropEvent}
          month={date.getMonth()}
          year={year}
        />
        {selectedDay !== null && selectedTime !== null && (
          
          
          // <EventForm day={selectedDay} time={selectedTime} onAddEvent={handleAddEvent} />
          
         
            <EventForm
              open={isEventFormOpen}
              onClose={() => setIsEventFormOpen(false)}
              day={selectedDay}
              time={selectedTime}
              onAddEvent={handleAddEvent}
            />
         
        )}
      </div>
    </DndProvider>
  );
};

export default App;
