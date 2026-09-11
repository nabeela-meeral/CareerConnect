const express = require('express');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Start listening for requests immediately so that the frontend doesn't get "Failed to fetch"
  // Mongoose will automatically buffer database operations until the connection is established.
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Connecting to database... Please wait.');
  });

  try {
    const fs = require('fs');
    const path = require('path');
    const dbPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath);
    }

    const mongoServer = await MongoMemoryServer.create({
      instance: {
        dbPath: dbPath,
        storageEngine: 'wiredTiger'
      }
    });
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    
    console.log(`MongoDB successfully connected to in-memory server: ${mongoUri}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
