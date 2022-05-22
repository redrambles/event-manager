import { error } from './notifications';

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

  if (formElements.speakers === '') {
    errors.speaker = 'You must enter at least one speaker';
  }

  if (formElements.host === '') {
    errors.host = 'You must enter at least one host';
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
