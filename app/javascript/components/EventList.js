import React from 'react';

const EventList = ({events}) => {
  console.log(events)
  return (
    <p>{JSON.stringify(events)}</p>
  )
}

export default EventList