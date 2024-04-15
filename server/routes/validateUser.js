const express = require('express');
const router = express.Router();
const validateUser = require('./validateData'); // Adjust the path as necessary
const userController = require('../controllers/userController'); // Assuming you have a controllers directory

// Example of a user registration route
router.post('/register', validateUser, (req, res) => {
  // Use your controller function for registration
  userController
    .registerUser(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err.message));
});

// Example of a user update route
router.put('/update', validateUser, (req, res) => {
  // Use your controller function for updating user details
  userController
    .updateUserDetails(req.body)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
