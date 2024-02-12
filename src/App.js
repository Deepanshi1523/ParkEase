// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import ParkingLotDetails from './components/ParkingLotDetails';
import AllocateSlot from './components/AllocateSlot';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/parking-lots/:id" element={<ParkingLotDetails />} />
          <Route path="/allocate-slot" element={<AllocateSlot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
