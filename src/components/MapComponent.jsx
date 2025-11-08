import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapComponent.css';
import { categoryConfig } from '../data/eventsData';

const MapComponent = ({ events, onUpdateEvent, onDeleteEvent, selectedCategory, filters }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [placingEvent, setPlacingEvent] = useState(null);

  // Create custom marker icon
  const createCustomIcon = (category) => {
    const config = categoryConfig[category];
    const iconHtml = `
      <div class="custom-marker" style="background-color: ${config.color}">
        <span class="marker-icon">${config.icon}</span>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'custom-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Create editable popup content
  const createEditablePopup = (event, isNew = false) => {
    const formattedDate = event.date || new Date().toISOString().split('T')[0];
    const formattedTime = event.time || '12:00';

    return `
      <div class="custom-popup editable-popup">
        <div class="popup-header">
          <div class="popup-category ${event.category}">${categoryConfig[event.category].name}</div>
        </div>
        <form class="event-form" data-event-id="${event.id}">
          <div class="form-group">
            <label>Event Title</label>
            <input type="text" name="title" value="${event.title || ''}" placeholder="Event Name" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Date</label>
              <input type="date" name="date" value="${formattedDate}" required />
            </div>
            <div class="form-group">
              <label>Time</label>
              <input type="time" name="time" value="${formattedTime}" required />
            </div>
          </div>

          <div class="form-group">
            <label>Location</label>
            <input type="text" name="location" value="${event.location || ''}" placeholder="Building/Room" required />
          </div>

          <div class="form-group">
            <label>Capacity</label>
            <input type="number" name="capacity" value="${event.capacity || 50}" min="1" required />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Event details..." required>${event.description || ''}</textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save">Save</button>
            ${!isNew ? '<button type="button" class="btn-delete">Delete</button>' : ''}
            <button type="button" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    `;
  };

  // Create view-only popup content
  const createViewPopup = (event) => {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `
      <div class="custom-popup view-popup">
        <div class="popup-header">
          <div class="popup-title">${event.title}</div>
          <button class="btn-edit" data-event-id="${event.id}">Edit</button>
        </div>
        <div class="popup-info">
          <strong>Date:</strong>
          <span>${formattedDate}</span>
        </div>
        <div class="popup-info">
          <strong>Time:</strong>
          <span>${formattedTime}</span>
        </div>
        <div class="popup-info">
          <strong>Location:</strong>
          <span>${event.location}</span>
        </div>
        <div class="popup-info">
          <strong>Capacity:</strong>
          <span>${event.capacity} attendees</span>
        </div>
        <div class="popup-info" style="flex-direction: column; align-items: flex-start;">
          <strong>Description:</strong>
          <span>${event.description}</span>
        </div>
        <div class="popup-category ${event.category}">${categoryConfig[event.category].name}</div>
      </div>
    `;
  };

  // Handle form submission
  const handleFormSubmit = (e, eventId, marker) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedEvent = {
      id: eventId,
      title: formData.get('title'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location'),
      capacity: parseInt(formData.get('capacity')),
      description: formData.get('description'),
      latitude: marker.getLatLng().lat,
      longitude: marker.getLatLng().lng,
      category: marker.eventData.category
    };

    onUpdateEvent(updatedEvent);
    marker.eventData = updatedEvent;
    marker.setPopupContent(createViewPopup(updatedEvent));
    marker.openPopup();
  };

  // Initialize map
  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [38.9897, -76.9378],
        zoom: 15,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Handle map click to place new event
  useEffect(() => {
    if (!mapInstance.current) return;

    const handleMapClick = (e) => {
      if (selectedCategory) {
        const newEvent = {
          id: Date.now(),
          category: selectedCategory,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          title: '',
          date: new Date().toISOString().split('T')[0],
          time: '12:00',
          location: '',
          capacity: 50,
          description: ''
        };

        const marker = L.marker([e.latlng.lat, e.latlng.lng], {
          icon: createCustomIcon(selectedCategory),
          draggable: true
        });

        marker.eventData = newEvent;
        marker.bindPopup(createEditablePopup(newEvent, true), {
          maxWidth: 350,
          className: 'custom-popup-wrapper'
        });

        marker.addTo(mapInstance.current);
        markersRef.current.push({ marker, event: newEvent });

        marker.openPopup();

        // Clear selectedCategory to hide instruction banner
        onUpdateEvent({ ...newEvent, _clearSelection: true });

        // Setup form handlers after popup opens
        setTimeout(() => {
          const form = document.querySelector(`form[data-event-id="${newEvent.id}"]`);
          if (form) {
            form.addEventListener('submit', (e) => handleFormSubmit(e, newEvent.id, marker));

            const cancelBtn = form.querySelector('.btn-cancel');
            if (cancelBtn) {
              cancelBtn.addEventListener('click', () => {
                mapInstance.current.removeLayer(marker);
                markersRef.current = markersRef.current.filter(m => m.marker !== marker);
              });
            }
          }
        }, 100);

        mapInstance.current.once('click', () => {}); // Prevent immediate re-trigger
      }
    };

    mapInstance.current.on('click', handleMapClick);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.off('click', handleMapClick);
      }
    };
  }, [selectedCategory, onUpdateEvent]);

  // Update markers when events or filters change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    markersRef.current.forEach(({ marker }) => {
      mapInstance.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for filtered events only
    const filteredEvents = events.filter(event => filters[event.category]);

    filteredEvents.forEach(event => {
      const marker = L.marker([event.latitude, event.longitude], {
        icon: createCustomIcon(event.category),
        draggable: true
      });

      marker.eventData = event;
      marker.bindPopup(createViewPopup(event), {
        maxWidth: 350,
        className: 'custom-popup-wrapper'
      });

      marker.on('popupopen', () => {
        setTimeout(() => {
          const editBtn = document.querySelector(`button[data-event-id="${event.id}"]`);
          if (editBtn) {
            editBtn.addEventListener('click', () => {
              marker.setPopupContent(createEditablePopup(event, false));
              marker.openPopup();

              setTimeout(() => {
                const form = document.querySelector(`form[data-event-id="${event.id}"]`);
                if (form) {
                  form.addEventListener('submit', (e) => handleFormSubmit(e, event.id, marker));

                  const cancelBtn = form.querySelector('.btn-cancel');
                  if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                      marker.setPopupContent(createViewPopup(event));
                      marker.openPopup();
                    });
                  }

                  const deleteBtn = form.querySelector('.btn-delete');
                  if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => {
                      if (confirm('Delete this event?')) {
                        onDeleteEvent(event.id);
                        mapInstance.current.removeLayer(marker);
                        markersRef.current = markersRef.current.filter(m => m.marker !== marker);
                      }
                    });
                  }
                }
              }, 100);
            });
          }
        }, 100);
      });

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        const updatedEvent = {
          ...event,
          latitude: pos.lat,
          longitude: pos.lng
        };
        onUpdateEvent(updatedEvent);
        marker.eventData = updatedEvent;
      });

      marker.addTo(mapInstance.current);
      markersRef.current.push({ marker, event });
    });
  }, [events, filters]);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      {selectedCategory && (
        <div className="map-instruction">
          📍 Click anywhere on the map to place a {categoryConfig[selectedCategory].name}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
