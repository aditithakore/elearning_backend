const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Number = mongoose.model("Number", numberSchema);

module.exports = Number;
