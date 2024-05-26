# React Drag-and-Drop Calendar

A React-based calendar application with drag-and-drop functionality for scheduling events. The application allows users to add, delete, and drag events across different days and times within a monthly view. It also highlights the current date and persists event data using local storage.

## Features

- **Monthly Calendar View**: Displays days and times in a scrollable grid format.
- **Event Management**: Add, delete, and drag-and-drop events.
- **Highlight Today's Date**: Automatically highlights the current date.
- **State Persistence**: Saves and retrieves events from local storage.
- **Responsive Design**: Calendar grid adjusts to different screen sizes.
- **Material UI**: Utilizes Material UI for the event form dialog.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayushtiwari31/react-drag-and-drop-calendar.git
   cd react-drag-and-drop-calendar


2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

4. **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the calendar application.

## Usage

### Adding an Event

1. Click on any calendar cell corresponding to a day and time.
2. Fill in the event title in the popup form.
3. Click "Submit" to add the event to the calendar.

### Deleting an Event

1. Click on an event within the calendar cell.
2. Confirm the deletion in the popup dialog.

### Dragging and Dropping an Event

1. Click and hold an event to drag it.
2. Move the event to the desired day and time cell.
3. Release the mouse button to drop the event in the new cell.
