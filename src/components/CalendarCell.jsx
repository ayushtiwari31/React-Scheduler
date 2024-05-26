

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  EVENT: 'event',
};

const CalendarCell = ({ day, time, events, onDayClick, onDeleteEvent, onDropEvent }) => {
  
  const [{isOver}, drop] = useDrop({
    accept: ItemTypes.EVENT,
    drop: (item,monitor) => {
      if(item.day!==day || item.time!==time)
      onDropEvent(item.id, day, time)},
    collect:(monitor)=>({
      isOver:monitor.isOver(),
    })
  });



  const isToday = () => {
    const today = new Date();
    return (
      day === today.getDate() &&
      today.getMonth() === new Date().getMonth() &&
      today.getFullYear() === new Date().getFullYear()
    );
  };
  

  return (
    <div ref={drop} className={`calendar-cell ${isToday() ? 'today' : ''}  ${isOver?'over':''} `} onClick={() => onDayClick(day, time)}>
      <div className="cell-date"></div>
      {Array.isArray(events) && (events).map(event => (
        <DraggableEvent
          key={event.id}
          event={event}
          
          onDeleteEvent={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this event?')) {
              onDeleteEvent(day, time, event.id);
            }
          }}
        />
      ))}
    </div>
  );
};

const DraggableEvent = ({ event, onDeleteEvent }) => {
 
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.EVENT,
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="event"
      style={{
        backgroundColor: event.color,
        opacity: isDragging ? 0.5 : 1,
        left: event.start * 100 + 'px',
        // width: (event.end - event.start) * 100 + 'px'
      }}
    >
      {event.title}
      <button onClick={onDeleteEvent}>Delete</button>
    </div>
  );
};

export default CalendarCell;
