import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Event from './Event';
import EventList from './EventList';
import EventForm from './EventForm';
import PlaceHolderEvent from './PlaceHolderEvent';
import { useEventContext } from '../context/context';

const Editor = () => {
  const {
    isLoading, events, addEvent, deleteEvent, updateEvent,
  } = useEventContext();
  return (
    <>
      <Header />
      <div className="grid">
        {' '}
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <EventList events={events} />
            <Routes>
              <Route path="/" element={<PlaceHolderEvent />} />
              <Route path="/new" element={<EventForm onSave={addEvent} />} />
              <Route path="/:id" element={<Event events={events} onDelete={deleteEvent} />} />
              <Route path="/:id/edit" element={<EventForm events={events} onSave={updateEvent} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};
export default Editor;
