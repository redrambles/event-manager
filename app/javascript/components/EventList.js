import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventList = ({ events }) => (

  <section className="eventList">

    <h2>
      Events
      {' '}
      <Link to="/events/new">New Event</Link>
    </h2>

    <ul>
      {events.sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
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
