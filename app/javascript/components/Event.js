import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Event = ({ events }) => {
  const { id } = useParams(); // This is a string!
  const event = events.find((evt) => evt.id === parseInt(id, 10));
  return <p>{event.title}</p>;
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
