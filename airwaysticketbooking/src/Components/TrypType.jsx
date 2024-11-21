import React, { useState } from 'react'



export default function TripType({ tripType, onTripTypeChange }) {
  const tripTypes = [
    { value: 'return', label: 'Return' },
    { value: 'oneway', label: 'One way' },
    { value: 'multicity', label: 'Multi-city' }
  ];
  return (
    <div className='trip-types'>
    {tripTypes.map(({ value, label }) => (
      <label key={value} className='trip-type'>
        <input
          type='radio'
          name='tripType'
          value={value}
          checked={tripType === value}
          onChange={() => onTripTypeChange(value)}
        />
        <span>{label}</span>
      </label>
    ))}
  </div>
);
};