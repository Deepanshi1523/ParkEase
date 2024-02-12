// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  // Dummy data for parking lots
  const parkingLots = [
    { id: 1, name: 'Main Street Parking Garage', location: '123 Main St' },
    { id: 2, name: 'Downtown Plaza Parking', location: '456 Elm St' },
  ];

  return (
    <div>
      <h1>Parking Lots</h1>
      <ul>
        {parkingLots.map(parkingLot => (
          <li key={parkingLot.id}>
            <Link to={`/parking-lots/${parkingLot.id}`}>
              {parkingLot.name} - {parkingLot.location}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
