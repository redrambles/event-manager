export const validateEvent = () => {
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

export const joke = () => "I don't know, you tell a joke";
