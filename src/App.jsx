import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import { eventsData } from './data/eventsData';
import './styles/App.css';

function App() {
  const [events, setEvents] = useState(eventsData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    academic: true,
    social: true,
    'umd-sponsored': true
  });

  const handleAddEvent = (category) => {
    // Set selected category for placement mode
    setSelectedCategory(category);
  };

  const handleUpdateEvent = (updatedEvent) => {
    // Check if this is a signal to clear selection
    if (updatedEvent._clearSelection) {
      setSelectedCategory(null);
      // Don't add the event yet, it will be added when the form is submitted
      return;
    }

    setEvents(prevEvents => {
      const existingIndex = prevEvents.findIndex(e => e.id === updatedEvent.id);
      if (existingIndex !== -1) {
        // Update existing event
        const newEvents = [...prevEvents];
        newEvents[existingIndex] = updatedEvent;
        return newEvents;
      } else {
        // Add new event
        return [...prevEvents, updatedEvent];
      }
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app-container">
      <Sidebar
        onAddEvent={handleAddEvent}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <MapComponent
        events={events}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        selectedCategory={selectedCategory}
        filters={filters}
      />
    </div>
  );
}

export default App;
