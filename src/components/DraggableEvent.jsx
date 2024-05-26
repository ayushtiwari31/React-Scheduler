// src/components/DraggableEvent.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableEvent = ({ event, onDeleteEvent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging:monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="event"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: event.color,
        cursor: 'move',
      }}
    >
      {event.title}
      <button onClick={() => onDeleteEvent(event.day, event.start, event.id)}>X</button>
    </div>
  );
};

export default DraggableEvent;
