const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
  res.status(200).json({ message: "connection successful" });
});
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);

mongoose.connect('mongodb+srv://hasanshanto:hasanshanto@cluster0.dwfgjcr.mongodb.net/role-permission', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(5000, () => console.log('Server started on port 5000'));
