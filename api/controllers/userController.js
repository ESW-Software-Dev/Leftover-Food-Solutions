const asyncHandler = require("express-async-handler");
const User = require('../models/user');

// Create new user profile
exports.create_user = asyncHandler(async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ googleId: req.body.googleId });
    
    if (existingUser) {
      // Update last login time
      existingUser.lastLogin = new Date();
      await existingUser.save();
      return res.status(200).json({ 
        success: true, 
        message: 'User already exists', 
        user: existingUser 
      });
    }

    // Create new user
    const user = new User({
      googleId: req.body.googleId,
      email: req.body.email,
      displayName: req.body.displayName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePicture: req.body.profilePicture
    });

    await user.save();
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully', 
      user: user 
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create user profile' 
    });
  }
});

// Get user profile
exports.get_user = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('posts');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      user: user 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve user profile' 
    });
  }
});

// Update user profile
exports.update_user = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    // Update fields
    if (req.body.displayName) user.displayName = req.body.displayName;
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;
    
    user.lastLogin = new Date();
    
    await user.save();
    res.status(200).json({ 
      success: true, 
      message: 'User updated successfully', 
      user: user 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user profile' 
    });
  }
}); 