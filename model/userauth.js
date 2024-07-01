const mongoose = require('mongoose');

const userauthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    sparse:true
  },
  password:{
    type: String,
    required: true,
  }, 
  token: {
    type: String,
    default: '',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, 
{ timestamps: true }
);

const UserAuth= mongoose.model("UserAuth",userauthSchema);

module.exports = UserAuth;