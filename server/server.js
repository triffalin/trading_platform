const express = require('express');
const app = express();
const userAuthRoutes = require('./routes/userAuth');
const cors = require('cors');

// Middleware for parsing JSON and handling CORS
app.use(express.json()); // for parsing application/json
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Adjust the CORS policy as needed

// Use routes
app.use('/api/auth', userAuthRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Other middleware can be set up here, such as helmet for security

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
