const express = require('express');
const app = express();
const userAuthRoutes = require('./routes/userAuth');

app.use(express.json()); // for parsing application/json

// Set up other middleware like CORS, helmet, etc. as needed

// Use routes
app.use('/api/auth', userAuthRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
