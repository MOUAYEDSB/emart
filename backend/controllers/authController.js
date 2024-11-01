const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register User
exports.register = async (req, res) => {
	const { name, prenom, email, password, phone } = req.body;
  
	// Check if the user already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
	  return res.status(400).json({ message: 'User already exists' });
	}
  
	// Hash the password before saving
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new User({ name, prenom, email, password: hashedPassword, phone });
  
	try {
	  const savedUser = await newUser.save();
	  res.status(201).json({ message: 'User registered successfully', user: savedUser });
	} catch (error) {
	  res.status(500).json({ message: 'Server error', error });
	}
  };
  

// Get All Users
exports.getUsers = async (req, res) => {
	try {
	  const users = await User.find().select('-password'); // Exclude password from the result
	  res.status(200).json(users);
	} catch (error) {
	  res.status(500).json({ message: 'Server error', error });
	}
  };
  

// Get User by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password'); // Exclude password from response
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, prenom, email, password, phone } = req.body;

  const updateData = { name, prenom, email, phone };

  // Hash the password if it's provided in the request
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
exports.login = async (req, res) => {
	const { email, password } = req.body;
  
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ message: 'User not found' });
  
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
	const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
	res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  };
