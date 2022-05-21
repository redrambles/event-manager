import React, { useState, useEffect } from 'react';
import Header from './Header';
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
      {isLoading ? <p>Loading...</p> : <EventList events={events} />}
    </>
  );
};

export default Editor;
