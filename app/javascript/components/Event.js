import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Event = ({ events }) => {
  const { id } = useParams(); // This is a string!
  const event = events.find((evt) => evt.id === parseInt(id, 10));
  return (
    <div className="eventContainer">
      <h2>
        {event.event_date}
        {' - '}
        {event.event_type}
      </h2>
      <ul>
        <li>
          <strong>Type:</strong>
          {' '}
          {event.event_type}
        </li>
        <li>
          <strong>Date:</strong>
          {' '}
          {event.event_date}
        </li>
        <li>
          <strong>Title:</strong>
          {' '}
          {event.title}
        </li>
        <li>
          <strong>Speaker:</strong>
          {' '}
          {event.speaker}
        </li>
        <li>
          <strong>Host:</strong>
          {' '}
          {event.host}
        </li>
        <li>
          <strong>Published:</strong>
          {' '}
          {event.published ? 'yes' : 'no'}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
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

export default Event;