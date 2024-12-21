import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchData();
  }, []);

  // Set axios default baseURL to avoid repeating the full URL
  axios.defaults.baseURL = 'http://localhost:5000/api';

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get('/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form submission to add new data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/data', formData);
      fetchData();
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  // Handle deleting data by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/data/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="App">
      <h1>REACT 499 Final Project</h1>
      <h2>สิรวิชญ์ รุ่งนิศากร 6006772</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อ"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="อีเมล์"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit">เพิ่ม</button>
      </form>

      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name} - {item.email}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
