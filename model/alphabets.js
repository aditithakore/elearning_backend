const mongoose = require('mongoose');

const AlphabetSchema = new mongoose.Schema({
  alphabetUrl:{
    type: String,
    required: true
  },
  word:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Alphabet = mongoose.model("Alphabet", AlphabetSchema);

module.exports = Alphabet;
