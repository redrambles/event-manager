import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { useParams, Link } from 'react-router-dom';
import { validateEvent, formatDate } from '../helpers';
import EventNotFound from './EventNotFound';
import 'pikaday/css/pikaday.css';

// We could either be passed a specific event
const EventForm = ({ onSave, events }) => {
  // We'll only get this if we are editing and the url is /events/:id
  const { id } = useParams();

  const initialEventState = useCallback(() => {
    const defaults = {
      event_type: '',
      event_date: '',
      title: '',
      speaker: '',
      host: '',
      published: false,
    };

    const currentEvent = id ? events.find((evt) => evt.id === Number(id)) : {};

    return { ...defaults, ...currentEvent };
  }, [events, id]);

  // These will begin as either empty if creating new event, or pre-populated if editing

  const [formElements, setFormElements] = useState(initialEventState);

  const [formErrors, setFormErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const dateInput = useRef(null);

  const updateEvent = (key, value) => {
    setFormElements((prevElements) => ({ ...prevElements, [key]: value }));
  };

  useEffect(() => {
    const dateFieldInit = new Pikaday({
      field: dateInput.current,
      toString: (date) => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('event_date', formattedDate);
      },
    });

    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => dateFieldInit.destroy();
  }, []);

  useEffect(() => {
    // Clear fields when user clicks on New Event after editing an event
    setFormElements(initialEventState);
  }, [initialEventState]);

  const onFormChange = (e) => {
    const { name, value, checked } = e.target;
    setFormElements((prevElements) => ({ ...prevElements, [name]: checked || value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(formElements);
    if (!(Object.keys(errors).length === 0)) {
      setFormErrors(errors);
      setShowError(true);
    } else {
      setShowError(false);
      onSave(formElements);
      console.log('Submitted', formElements);
    }
  };

  const cancelURL = id ? `events/${id}` : '/events';
  const title = id ? `${formElements.event_date} - ${formElements.event_type}` : 'New Event';

  if (id && !formElements.id) return <EventNotFound />;

  return (
    <section>
      <h2>{title}</h2>

      {showError && (

      <div className="errors">
        <h3>Oops! The following need to be fixed up so that we can save this event:</h3>
        <ul>
          {Object.values(formErrors).map((error) => (
            <li key={error}>
              {error}
            </li>
          ))}
        </ul>
      </div>

      )}

      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input type="text" id="event_type" name="event_type" value={formElements.event_type} onChange={onFormChange} />
          </label>
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input
              type="text"
              id="event_date"
              name="event_date"
              ref={dateInput}
              value={formElements.event_date}
              onChange={onFormChange}
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>title:</strong>
            <textarea cols="30" rows="10" id="title" name="title" value={formElements.title} onChange={onFormChange} />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input type="text" id="speaker" name="speaker" value={formElements.speaker} onChange={onFormChange} />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input type="text" id="host" name="host" value={formElements.host} onChange={onFormChange} />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input type="checkbox" id="published" name="published" value={formElements.published} onChange={onFormChange} />
          </label>
        </div>
        <div className="form-actions">
          <button className="btn" type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </section>
  );
};

EventForm.propTypes = {
  onSave: PropTypes.func,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      event_type: PropTypes.string,
      event_date: PropTypes.string,
      title: PropTypes.string,
      speaker: PropTypes.string,
      host: PropTypes.string,
      published: PropTypes.bool,
    }),
  ),
};

EventForm.defaultProps = {
  events: [],
  onSave: () => {},
};

export default EventForm;
