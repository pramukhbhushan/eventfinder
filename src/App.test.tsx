import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock the EventMap component to avoid leaflet dependencies in tests
jest.mock('./EventMap', () => {
  return function MockEventMap() {
    return <div data-testid="event-map">Event Map Component</div>;
  };
});

test('renders App component', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
