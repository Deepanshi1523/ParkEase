// Homepage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
  const [parkingLots, setParkingLots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/parking-lots')
      .then(response => {
        setParkingLots(response.data);
      })
      .catch(error => {
        console.error('Error fetching parking lots:', error);
      });
  }, []);

  console.log(parkingLots);

  return (
    <div>
      <h1>Parking Lots</h1>
      <ul>
        {parkingLots.map(parkingLot => (
          <li key={parkingLot.id}>
            <Link to={`/parking-lots/${parkingLot.id}`}>
              {parkingLot.name} - {parkingLot.address}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
