const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Schema and Model
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const DataModel = mongoose.model('Data', DataSchema);

// API Routes
// Endpoint to check server status
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Add new data
app.post('/api/data', async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    res.json(newData);
  } catch (error) {
    res.status(400).send('Error saving data');
  }
});

// Delete data by id
app.delete('/api/data/:id', async (req, res) => {
  try {
    await DataModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
