# EventFinder - UMD Campus Events Map

An interactive React application for discovering events happening around the University of Maryland campus. Features an interactive map with filterable event markers.

## Features

- 🗺️ **Interactive Map**: Built with react-leaflet, centered on UMD campus
- 📍 **Event Markers**: Three color-coded event categories:
  - **Academic** (Blue) - Lectures, seminars, workshops
  - **Social** (Green) - Student activities, game nights, festivals
  - **UMD Sponsored** (Red) - Official university events
- 🔍 **Category Filters**: Toggle buttons to show/hide event categories
- ℹ️ **Event Details**: Click markers to view event information (title, date, time, description)
- 📱 **Responsive Design**: Mobile-friendly layout with adaptive controls
- ⚡ **Modern Stack**: React with TypeScript and hooks (useState)

## Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/7fe8e983-c3c4-4e88-bee5-7b08225e5fa6)

### Event Popup
![Event Popup](https://github.com/user-attachments/assets/b29cc602-9615-4e51-b9c1-93eed3bbeb24)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/3f0767ea-6388-43d0-9b58-7717668294c2)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

```bash
# Clone the repository
git clone https://github.com/pramukhbhushan/eventfinder.git
cd eventfinder

# Install dependencies
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Technology Stack

- **React 18** with TypeScript
- **react-leaflet** - React components for Leaflet maps
- **Leaflet** - Open-source JavaScript library for interactive maps
- **Create React App** - Build tooling and development server
- **CSS3** - Responsive styling with media queries

## Project Structure

```
eventfinder/
├── public/
│   └── index.html          # HTML template with Leaflet CSS
├── src/
│   ├── EventMap.tsx        # Main map component with event logic
│   ├── EventMap.css        # Responsive styles for the map
│   ├── EventMap.test.tsx   # Unit tests for EventMap
│   ├── App.tsx             # Root application component
│   ├── App.css             # App layout styles
│   └── App.test.tsx        # App component tests
└── package.json            # Dependencies and scripts
```

## Component Overview

### EventMap Component

The main component that renders:
- Interactive Leaflet map centered on UMD campus (38.9869°N, 76.9426°W)
- Filter controls for event categories
- Event markers with custom colored icons
- Popup information for each event

**State Management:**
- `visibleCategories`: Set of currently visible event categories
- Uses `useState` hook for reactive UI updates

**Event Data:**
Sample events include locations around UMD campus:
- Computer Science Building
- McKeldin Mall
- Stamp Student Union
- Mathematics Building
- Eppley Recreation Center
- Hornbake Library

## Customization

### Adding New Events

Edit the `sampleEvents` array in `src/EventMap.tsx`:

```typescript
const newEvent: Event = {
  id: 7,
  title: 'Your Event Title',
  date: '2024-11-30',
  time: '6:00 PM',
  description: 'Event description here',
  category: 'Academic', // or 'Social' or 'UMD Sponsored'
  position: [38.9869, -76.9426] // [latitude, longitude]
};
```

### Changing Map Center

Update the `umdCenter` constant in `src/EventMap.tsx`:

```typescript
const umdCenter: [number, number] = [latitude, longitude];
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
