const mongoose = require('mongoose');

const bodypartSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Bodypart = mongoose.model("Bodypart", bodypartSchema);

module.exports = Bodypart;
