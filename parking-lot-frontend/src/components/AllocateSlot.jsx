import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllocateSlot = () => {
  const [numberPlate, setNumberPlate] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');
  const [allocatedSlot, setAllocatedSlot] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform form validation here if needed
    if (!numberPlate || !selectedSize) {
      setMessage('Please enter your number plate and select a size.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/allocate-slot', {
        numberPlate,
        selectedSize,
      });

      // If slot is allocated successfully, set the allocated slot number
      setAllocatedSlot(response.data.slotNumber);
      alert(`Slot allocated successfully!\nNumber Plate: ${numberPlate}\nSize: ${selectedSize}\nSlot Number: ${response.data.slotNumber}`);
    } catch (error) {
      console.error('Error allocating slot:', error);
      alert('Error allocating slot. Please try again later.');
    }
    // Clear form fields after submission
    setNumberPlate('');
    setSelectedSize('');
    setMessage('');
  };

  return (
    <div>
      <h1>Allocate Parking Slot</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numberPlate">Number Plate:</label>
        <input
          type="text"
          id="numberPlate"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
        />
        <label htmlFor="size">Select Size:</label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Large">xlarge</option>
        </select>
        <button type="submit">Allocate Slot</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default AllocateSlot;
