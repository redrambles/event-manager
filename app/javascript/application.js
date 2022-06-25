// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { EventProvider } from './context/context';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <Router>
        <EventProvider>
          <App />
        </EventProvider>
      </Router>
    </StrictMode>,
  );
});
