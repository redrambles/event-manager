import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { validateEvent, formatDate } from '../helpers';
import 'pikaday/css/pikaday.css';

const EventForm = ({ addEvent }) => {
  const [formElements, setFormElements] = useState({
    event_type: '',
    event_date: '',
    title: '',
    speakers: '',
    host: '',
    published: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const dateInput = useRef(null);

  const updateEvent = (key, value) => {
    setFormElements((prevElements) => ({ ...prevElements, [key]: value }));
  };

  useEffect(() => {
    const dateFieldInit = new Pikaday({
      field: dateInput.current,
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
      addEvent(formElements);
      console.log('Submitted', formElements);
    }
  };

  return (
    <section>

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
      <h2>New Event</h2>
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
          <label htmlFor="speakers">
            <strong>Speakers:</strong>
            <input type="text" id="speakers" name="speakers" value={formElements.speakers} onChange={onFormChange} />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input type="text" id="host" name="host" value={formElements.hosts} onChange={onFormChange} />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input type="checkbox" id="published" name="published" value={formElements.published} onChange={onFormChange} />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
};

export default EventForm;
