/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { success, handleAsyncError } from '../helpers';

const EventContext = createContext();
/* eslint react/prop-types: 0 */
const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        handleAsyncError(err);
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      // Check to make sure we don't get a 404 or some crap
      if (!response.ok) throw Error(response.statusText);

      // We're good, let's do this:
      const savedEvent = await response.json();
      const updatedEvents = [...events, savedEvent];
      setEvents(updatedEvents);
      success('Event Added, you beautiful human!');
      navigate(`/events/${savedEvent.id}`);
    } catch (err) {
      handleAsyncError(err);
    }
  };

  const deleteEvent = async (eventId) => {
    const confirm = window.confirm('Are you sure you want to delete this event?');

    if (confirm) {
      try {
        const response = await window.fetch(`/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('Bye Felicia!');
        navigate('/events');
        setEvents(events.filter((event) => event.id !== eventId));
      } catch (err) {
        handleAsyncError(err);
      }
    }
  };

  const updateEvent = async (updatedEvent) => {
    console.log('here!');
    try {
      const response = await window.fetch(`/api/events/${updatedEvent.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(response.statusText);

      const updatedEvents = events.map((event) => {
        if (event.id !== updatedEvent.id) {
          return event;
        }
        return updatedEvent;
      });
      setEvents(updatedEvents);
      success('Event Updated!');
      navigate(`/events/${updatedEvent.id}`);
    } catch (err) {
      handleAsyncError(err);
    }
  };

  return (
    <EventContext.Provider value={{
      isLoading,
      events,
      setEvents,
      addEvent,
      deleteEvent,
      updateEvent,
    }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventProvider };

export const useEventContext = () => useContext(EventContext);
