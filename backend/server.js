const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Health Data Storage
let healthData = [];

// API Endpoint to Store Health Data
app.post('/api/healthdata', (req, res) => {
  const newData = {
    id: Date.now(),
    parameter: req.body.parameter,
    value: req.body.value,
  };
  healthData.push(newData);
  res.json(newData);
});

// Dummy medication data
const medications = [
    { id: 1, name: 'Medication A', dosage: '10mg', frequency: 'Twice a day' },
    { id: 2, name: 'Medication B', dosage: '5mg', frequency: 'Once a day' },
    { id: 3, name: 'Medication C', dosage: '20mg', frequency: 'Three times a day' },
  ];
  
  // GET endpoint for fetching medication list
  app.get('/api/medications', (req, res) => {
    res.json(medications);
  });
  
  //POST request to add medications
  app.post('/api/medications', (req, res) => {
    const newMedication = req.body;
    const id = medications.length + 1;
    newMedication.id = id;
    medications.push(newMedication);
    res.status(201).json(newMedication);
  });

// API Endpoint to Retrieve Health Data
app.get('/api/healthdata', (req, res) => {
  res.json(healthData);
});

// Start the Server
const port = 3005; // Choose your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
