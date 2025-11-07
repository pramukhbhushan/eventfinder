import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './EventMap.css';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define event types
export type EventCategory = 'Academic' | 'Social' | 'UMD Sponsored';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  category: EventCategory;
  position: [number, number]; // [latitude, longitude]
}

// Custom marker icons for different event categories
const academicIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const socialIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const umdSponsoredIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Sample events data centered around UMD campus
const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Computer Science Seminar',
    date: '2024-11-15',
    time: '2:00 PM',
    description: 'Guest lecture on Machine Learning and AI applications in modern software development.',
    category: 'Academic',
    position: [38.9869, -76.9426] // Near Computer Science Building
  },
  {
    id: 2,
    title: 'Campus Fall Festival',
    date: '2024-11-20',
    time: '5:00 PM',
    description: 'Join us for food, music, and fun activities on the mall. Free for all students!',
    category: 'Social',
    position: [38.9869, -76.9389] // McKeldin Mall
  },
  {
    id: 3,
    title: 'UMD Career Fair',
    date: '2024-11-18',
    time: '10:00 AM',
    description: 'Meet with top employers and explore career opportunities. Bring your resume!',
    category: 'UMD Sponsored',
    position: [38.9896, -76.9378] // Stamp Student Union
  },
  {
    id: 4,
    title: 'Mathematics Workshop',
    date: '2024-11-22',
    time: '3:00 PM',
    description: 'Advanced calculus workshop for undergraduate students.',
    category: 'Academic',
    position: [38.9853, -76.9417] // Mathematics Building
  },
  {
    id: 5,
    title: 'Student Game Night',
    date: '2024-11-16',
    time: '7:00 PM',
    description: 'Board games, video games, and snacks. All students welcome!',
    category: 'Social',
    position: [38.9889, -76.9397] // Near Eppley Recreation Center
  },
  {
    id: 6,
    title: 'UMD Alumni Networking',
    date: '2024-11-25',
    time: '6:00 PM',
    description: 'Network with UMD alumni from various industries. Reception and dinner included.',
    category: 'UMD Sponsored',
    position: [38.9871, -76.9431] // Near Hornbake Library
  }
];

const EventMap: React.FC = () => {
  // State for managing filter visibility
  const [visibleCategories, setVisibleCategories] = useState<Set<EventCategory>>(
    new Set<EventCategory>(['Academic', 'Social', 'UMD Sponsored'])
  );

  // Toggle category visibility
  const toggleCategory = (category: EventCategory) => {
    setVisibleCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Get marker icon based on category
  const getMarkerIcon = (category: EventCategory): L.Icon => {
    switch (category) {
      case 'Academic':
        return academicIcon;
      case 'Social':
        return socialIcon;
      case 'UMD Sponsored':
        return umdSponsoredIcon;
      default:
        return academicIcon;
    }
  };

  // Filter events based on selected categories
  const filteredEvents = sampleEvents.filter(event => 
    visibleCategories.has(event.category)
  );

  // UMD Campus coordinates
  const umdCenter: [number, number] = [38.9869, -76.9426];

  return (
    <div className="event-map-container">
      <div className="map-header">
        <h1>UMD Campus Events</h1>
        <p>Discover events happening around the University of Maryland campus</p>
      </div>
      
      <div className="filter-controls">
        <button
          className={`filter-btn academic ${visibleCategories.has('Academic') ? 'active' : ''}`}
          onClick={() => toggleCategory('Academic')}
        >
          <span className="color-indicator blue"></span>
          Academic
        </button>
        <button
          className={`filter-btn social ${visibleCategories.has('Social') ? 'active' : ''}`}
          onClick={() => toggleCategory('Social')}
        >
          <span className="color-indicator green"></span>
          Social
        </button>
        <button
          className={`filter-btn umd-sponsored ${visibleCategories.has('UMD Sponsored') ? 'active' : ''}`}
          onClick={() => toggleCategory('UMD Sponsored')}
        >
          <span className="color-indicator red"></span>
          UMD Sponsored
        </button>
      </div>

      <MapContainer
        center={umdCenter}
        zoom={15}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredEvents.map(event => (
          <Marker
            key={event.id}
            position={event.position}
            icon={getMarkerIcon(event.category)}
          >
            <Popup>
              <div className="event-popup">
                <h3>{event.title}</h3>
                <p className="event-category">
                  <strong>Category:</strong> {event.category}
                </p>
                <p className="event-date">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="event-time">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="event-description">
                  {event.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventMap;
