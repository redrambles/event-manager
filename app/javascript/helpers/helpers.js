import { error } from './notifications';

const isValidDate = (dateObj) => !Number.isNaN(Date.parse(dateObj));

export const validateEvent = (formElements) => {
  const errors = {};

  if (formElements.event_type === '') {
    errors.event_type = 'Please enter an event type';
  }
  if (formElements.event_date === '') {
    errors.event_date = 'You must enter a valid date';
  }

  if (formElements.title === '') {
    errors.title = 'You must enter a title';
  }

  if (formElements.speaker === '') {
    errors.speaker = 'You must enter at least one speaker';
  }

  if (formElements.host === '') {
    errors.host = 'You must enter at least one host';
  }

  if (!isValidDate(formElements.event_date)) {
    errors.event_date = 'You must enter a valid date';
  }

  return errors;
};

export const formatDate = (inputDate) => {
  const YYYY = inputDate.getFullYear();
  const MM = `0${inputDate.getMonth() + 1}`.slice(-2);
  const DD = `0${inputDate.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAsyncError = (err) => {
  error('Something went wrong, yikes.');
  console.error(err);
};
