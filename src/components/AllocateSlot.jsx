// AllocateSlot.js
import React from 'react';
import { Link } from 'react-router-dom';

const AllocateSlot = () => {
  // Dummy form submission function
  const handleSubmit = e => {
    e.preventDefault();
    alert('Slot allocated successfully!');
  };

  return (
    <div>
      <h1>Allocate Parking Slot</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form inputs here */}
        <button type="submit">Allocate Slot</button>
      </form>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default AllocateSlot;
