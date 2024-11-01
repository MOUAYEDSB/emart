const express = require('express');
const { register, getUsers, login, getUserById, updateUserProfile, deleteUser } = require('../controllers/authController');

const router = express.Router();

// Register User
router.post('/register', register);


router.get('/users', getUsers); // Add this line

// Login User
router.post('/login', login);

// Get User by ID (Admin or User)
router.get('/:id', getUserById);

// Update User Profile (User can update their own profile; Admin can update any user's profile)
router.put('/update/:id', updateUserProfile);

// Delete User (Admin)
router.delete('/:id', deleteUser);

module.exports = router;
