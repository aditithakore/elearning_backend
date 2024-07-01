const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
contactNumber: {
  type: String,
  required: true,
},
childage:{
  type:Number,
  required: true,
},
childname:{
  type:String,
  required: true,
},
childdisability:{
  type:String,
  required: true,
},
createdAt: {
  type: Date,
  default: Date.now,
},
updatedAt: {
  type: Date,
  default: Date.now,
}
},
{  timestamps: true });

const User= mongoose.model("User",userSchema);

module.exports = User;