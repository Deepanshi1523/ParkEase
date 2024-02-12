// ParkingLotDetails.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ParkingLotDetails = () => {
  // Get the id parameter from the URL
  const { id } = useParams();

  // Dummy data for parking lot details
  const parkingLotDetails = {
    id: 1,
    name: 'Main Street Parking Garage',
    location: '123 Main St',
    capacity: 500,
    occupancy: 350,
  };

  return (
    <div>
      <h1>Parking Lot Details</h1>
      <h2>{parkingLotDetails.name}</h2>
      <p>Location: {parkingLotDetails.location}</p>
      <p>Capacity: {parkingLotDetails.capacity}</p>
      <p>Occupancy: {parkingLotDetails.occupancy}</p>
      <Link to="/allocate-slot">Allocate Slot</Link>
    </div>
  );
};

export default ParkingLotDetails;
