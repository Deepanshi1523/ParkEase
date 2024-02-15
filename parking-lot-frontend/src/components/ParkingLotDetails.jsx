// ParkingLotDetails.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ParkingLotDetails = () => {
  const { id } = useParams();

  const [LotDetails, setLotDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/parking-lots/${id}`)
      .then(response => {
        setLotDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching parking lot details:', error);
      });
  }, [id]); // Trigger effect when ID changes

  if (!LotDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Parking Lot Details</h1>
      <h2>{LotDetails.name}</h2>
      <p>Location: {LotDetails.address}</p>
      <p>Capacity: {LotDetails.total_spaces}</p>
      <p>Occupancy: {LotDetails.occupancy}</p>
      <p>Total floors: {LotDetails.total_floors}</p>
      <Link to="/allocate-slot">Allocate Slot</Link>
    </div>
  );
};

export default ParkingLotDetails;
