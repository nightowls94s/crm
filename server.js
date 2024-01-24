const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb+srv://nightowls94s:wNMQxxn$27i4YP.@cluster0.povgju3.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for events
const eventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

app.use(bodyParser.json());
app.use(cors());

// API endpoint to add an event
app.post('/api/events', async (req, res) => {
  try {
    const { date, name, address, phone } = req.body;
    const event = new Event({ date, name, address, phone });
    await event.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/events', async (req, res) => {
  try {
    const { date, name, address, phone } = req.body;
    console.log('Received event data:', { date, name, address, phone });

    const event = new Event({ date, name, address, phone });
    await event.save();
    console.log('Event saved successfully.');

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
