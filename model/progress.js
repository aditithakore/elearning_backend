const mongoose = require('mongoose');

// Define the Progress schema
const progressSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to a User document
    ref: 'User',
    required: true,
  },
  gameName: {
    type: String,  
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,  // Ensure non-negative score
  },
  timestamp: {
    type: Date,
    default: Date.now,  // Automatically store the current date and time
  },
}, { timestamps: true });  // Adds createdAt and updatedAt

// Create the Progress model
const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
