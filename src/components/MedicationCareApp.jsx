import React, { useState, useEffect } from 'react';
import './styles.css';


const MedicationCareApp = () => {
  const [medicationList, setMedicationList] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: ''
  });
  const [healthData, setHealthData] = useState([]);
  const [newHealthData, setNewHealthData] = useState({ parameter: '', value: '' });

  useEffect(() => {
    fetchMedicationList();
    fetchHealthData();
    scheduleAlert();
  }, []);

  const scheduleAlert = () => {
    // Get the current date and time
    const currentDate = new Date();
  
    // Set the desired time for the alert (e.g., 10:00 AM)
    const targetTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0);
  
    // Calculate the delay in milliseconds until the target time
    const delay = targetTime.getTime() - currentDate.getTime();
  
    // Set a timeout to trigger the alert at the target time
    setTimeout(() => {
      alert('Time for your medication!');
    }, delay);
  };
  const addMedication = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMedication),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setMedicationList([...medicationList, data]);
      setNewMedication({ name: '', dosage: '', frequency: '' });
    } catch (error) {
      console.log('Error adding medication:', error);
    }
  };

  const fetchMedicationList = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/medications');
      if (!response.ok) {
        throw new Error('Failed to fetch medication list');
      }
      const data = await response.json();
      setMedicationList(data);
    } catch (error) {
      console.log('Error fetching medication list:', error);
      setMedicationList([]); // Set an empty medication list in case of error
    }
  };

  const fetchHealthData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/healthdata');
      const data = await response.json();
      setHealthData(data);
    } catch (error) {
      console.log('Error fetching health data:', error);
    }
  };

  const addHealthData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/healthdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHealthData),
      });
      const data = await response.json();
      setHealthData([...healthData, data]);
      setNewHealthData({ parameter: '', value: '' });
    } catch (error) {
      console.log('Error adding health data:', error);
    }
  };

  return (
    <div className="container">
      <h1 >MedicationCare App</h1>
      <h2>Medication List</h2>
      <ul className="medication-list">
        {medicationList.map((medication) => (
          <li key={medication.id}>
            {medication.name} - Dosage: {medication.dosage}, Frequency: {medication.frequency}
          </li>
        ))}
      </ul>
      <h2>Add Medication</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={newMedication.name}
          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={newMedication.dosage}
          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
        />
        <input
          type="text"
          placeholder="Frequency"
          value={newMedication.frequency}
          onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
        />
        <button onClick={addMedication}>Add Medication</button>
      </div>

      <h2>Health Parameters Tracking</h2>
      <div className="form-container" >
        <input
          type="text"
          placeholder="Parameter"
          value={newHealthData.parameter}
          onChange={(e) => setNewHealthData({ ...newHealthData, parameter: e.target.value })}
        />
        <input
          type="text"
          placeholder="Value"
          value={newHealthData.value}
          onChange={(e) => setNewHealthData({ ...newHealthData, value: e.target.value })}
        />
        <button onClick={addHealthData}>Add Health Data</button>
      </div>

      <h2>Health Data</h2>
      <ul className="medication-list">
        {healthData.map((data) => (
          <li key={data.id}>
            Parameter: {data.parameter}, Value: {data.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationCareApp;
