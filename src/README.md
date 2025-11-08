# UMD Event Map

An interactive web-based event map application for University of Maryland (UMD) campus, built with React and Vite. Create, edit, filter, and manage campus events with an intuitive interface.

## Features

### Interactive Map
- **Leaflet.js** powered map centered on UMD College Park campus
- **Click-to-Place**: Press + button, select event type, then click on the map to create
- **Draggable Markers**: Reposition events by dragging markers on the map
- **Custom Markers**: Color-coded pin markers with category icons (A, S, U)

### Event Management
- **Create Events**: Press the + button → Select A, S, or U → Click on map to place
- **Edit Events**: Click any marker to view details, then click "Edit" to modify
- **Delete Events**: Remove events through the edit form
- **Editable Fields**:
  - Event Title
  - Date & Time
  - Location
  - Capacity
  - Description

### Security & Authentication
- **TerpMail Verification**: Users must verify their UMD TerpMail before creating events
- **Email Validation**: Accepts only @umd.edu and @terpmail.umd.edu addresses
- **Session-based**: Authentication persists during the current session
- **User-friendly**: Only prompted once per session

### Filtering System
- **Real-time Filtering**: Toggle checkboxes to show/hide event categories
- **Visual Feedback**: Filtered-out icons appear dimmed and grayscale
- **Independent Controls**: Filter what you see without deleting events

### Event Categories
1. **Academic Events (Blue - A)**: Lectures, workshops, seminars, research symposiums
2. **Social Events (Green - S)**: Parties, sports, networking, game nights
3. **UMD Sponsored Events (Red - U)**: Official university events, campus tours, career fairs

### User Interface
- **Compact Sidebar**: Minimalist 80px sidebar with:
  - Vertical "UMD" branding
  - Category display icons (A, S, U)
  - Filter checkboxes below icons
  - Plus (+) button for adding events
- **Category Selection Menu**: Popup menu appears when + is clicked
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Changes appear instantly without page reload

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Leaflet** - Interactive maps
- **OpenStreetMap** - Map tile provider
- **Vanilla CSS** - Component styling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

### Creating a New Event
1. Click the **+** button at the bottom of the sidebar
2. **TerpMail Verification**: (First time only)
   - A modal will appear asking for your UMD TerpMail
   - Enter a valid email ending in `@umd.edu` or `@terpmail.umd.edu`
   - Click **Verify & Continue**
   - Once verified, you won't be asked again during this session
3. A menu will appear with three options: Academic Event, Social Event, or UMD Sponsored
4. Click your desired event type
5. The menu closes and an instruction appears: "📍 Click anywhere on the map to place..."
6. Click on the map where you want to place the event
7. A popup form will appear - fill in event details
8. Click **Save** to create the event, or **Cancel** to discard

### Editing an Existing Event
1. Click any marker on the map to view event details
2. Click the blue **Edit** button in the popup
3. Modify any fields in the form
4. Click **Save** to update, **Delete** to remove, or **Cancel** to discard changes

### Moving an Event
- Click and drag any marker to reposition it on the map
- The location updates automatically

### Filtering Events
1. Use the checkboxes in the **FILTERS** section below the icons
2. Uncheck a category to hide those events from the map
3. Icons will appear dimmed when their category is filtered out
4. Check the box again to show those events

### Visual Feedback
- **+ Button**: Rotates 45° when the menu is open
- **Icons**: Become dimmed and grayscale when filtered out
- **Instruction Banner**: Appears at top of map when in placement mode

## Project Structure

```
eventfinder/
├── src/
│   ├── components/
│   │   ├── MapComponent.jsx    # Map with click-to-place & edit functionality
│   │   └── Sidebar.jsx         # Compact sidebar with filters and + menu
│   ├── data/
│   │   └── eventsData.js       # Event data and category config
│   ├── styles/
│   │   ├── App.css             # Main app layout
│   │   ├── MapComponent.css    # Map, markers, and popup styles
│   │   └── Sidebar.css         # Sidebar, filters, and menu styles
│   ├── App.jsx                 # Main app with state management
│   └── main.jsx                # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Features Coming Soon

- Custom category creation with color picker
- Event search by name/keyword
- Event export (iCal, CSV)
- Multi-day event support
- Event reminders and notifications
- User authentication and permissions
- Import events from external sources

## License

MIT
