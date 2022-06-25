import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventList = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);

  const matchSearchTerm = (event) => {
    const {
      // eslint-disable-next-line camelcase
      id, published, created_at, updated_at, ...rest
    } = event;
    // console.log(JSON.stringify(rest));
    return Object.values(rest).some(
      (value) => value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <section className="eventList">

      <h2>
        Events
        {' '}
        <Link to="/events/new">New Event</Link>
      </h2>
      <input className="search" placeholder="Search for event" type="text" ref={searchInput} onKeyUp={updateSearchTerm} />
      <ul>
        {events.filter((evt) => matchSearchTerm(evt))
          .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
          .map((event) => (
            <li key={event.id}>
              <NavLink to={`/events/${event.id}`}>
                {event.event_date}
                {' - '}
                {event.event_type}
              </NavLink>
            </li>
          ))}
      </ul>

    </section>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    event_type: PropTypes.string,
    event_date: PropTypes.string,
    title: PropTypes.string,
    speaker: PropTypes.string,
    host: PropTypes.string,
    published: PropTypes.bool,
  })).isRequired,
};

export default EventList;
