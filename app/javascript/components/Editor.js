import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Event from './Event';
import EventList from './EventList';

const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setIsError(true);
        console.error(err);
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      {isError && <p>Something went wrong, bitch! Check out the console and cry.</p>}
      {isLoading ? <p>Loading...</p>
        : (
          <>
            <EventList events={events} />

            <Routes>
              <Route path=":id" element={<Event events={events} />} />
            </Routes>
          </>
        )}
    </>
  );
};

export default Editor;
