//server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 8000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

const sql = 'SELECT * FROM parkinglot';

app.use(bodyParser.json());
app.use(cors());

app.get('/parking-lots', (req, res) => {
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching parking lots: ' + err.message);
      res.status(500).send('Error fetching parking lots');
      return;
    }
    res.json(result);
  });
});

app.get('/parking-lots/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM parkinglot WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching parking lot details: ' + err.message);
      res.status(500).send('Error fetching parking lot details');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Parking lot not found');
      return;
    }
    res.json(result[0]);
  });
});

// app.get('/check-slot', (req, res) => {
//   const size = req.query.size;
//   const sql = 'SELECT p.id FROM parkingslot p INNER JOIN floor f ON p.floor_id = f.id WHERE p.status = "vacant" AND p.size = ? LIMIT 1';

//   connection.query(sql, [size], (err, result) => {
//     if (err) {
//       console.error('Error checking slot availability: ' + err.message);
//       res.status(500).send('Error checking slot availability');
//       return;
//     }
//     if (result.length > 0) {
//       res.json({ available: true, slotId: result[0].id });
//     } else {
//       res.json({ available: false });
//     }
//   });
// });

app.post('/allocate-slot', (req, res) => {
  const { numberPlate, selectedSize } = req.body;
  const sql = `
    SELECT p.id 
    FROM parkingslot p 
    INNER JOIN floor f ON p.floor_id = f.id 
    WHERE p.status = "vacant" AND p.size = ? 
    ORDER BY FIELD(p.size, ?, 'Small', 'Medium', 'Large', 'XLarge')
    LIMIT 1`;

  connection.query(sql, [numberPlate, selectedSize], (err, result) => {
    if (err) {
      console.error('Error allocating slot: ' + err.message);
      res.status(500).send('Error allocating slot');
      return;
    }
    if (result.length > 0) {
      // Slot is available, update the database
      const slotId = result[0].id;
      const slotNumber = `[${slotId.split(':')[0]}:${slotId.split(':')[1]}]`;
      const updateQuery = 'UPDATE parkingslot SET status = "occupied", license_plate = ?, size = ? WHERE id = ?';
      
      connection.query(updateQuery, [numberPlate, selectedSize, slotId], (err, result) => {
        if (err) {
          console.error('Error updating slot status: ' + err.message);
          res.status(500).send('Error allocating slot');
          return;
        }
        console.log('Slot allocated successfully');
        res.status(200).json({ slotNumber });
      });
    } else {
      // No available slots
      console.log('No available slots of this size');
      res.status(404).send('No available slots of this size');
    }
  });
});

// app.put('/update/:id', (req, res) => {
//   const id = req.params.id;
//   const newData = req.body;

//   const sql = 'UPDATE your_table SET ? WHERE id = ?';

//   connection.query(sql, [newData, id], (err, result) => {
//     if (err) {
//       console.error('Error updating record: ' + err.message);
//       res.status(500).send('Error updating record');
//       return;
//     }
//     console.log('Record updated successfully');
//     res.status(200).send('Record updated successfully');
//   });
// });

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
