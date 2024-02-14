const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Deepanshi123!',
  database: 'parking_lot_management'
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

const sql = 'SELECT * FROM parking_slots';

  // Execute the SQL query
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching records: ' + err.message);
      return;
    }
    // Log the entire table to the console
    console.log('Entire table:', result);

    // Close the database connection
    connection.end();
  });

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint to handle update request
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  // SQL query to update table
  const sql = 'UPDATE your_table SET ? WHERE id = ?';

  // Execute the SQL query
  connection.query(sql, [newData, id], (err, result) => {
    if (err) {
      console.error('Error updating record: ' + err.message);
      res.status(500).send('Error updating record');
      return;
    }
    console.log('Record updated successfully');
    res.status(200).send('Record updated successfully');
  });
});

// Start the Express server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
