const mongoose = require('mongoose');

const colorsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});



const Colors= mongoose.model("Colors", colorsSchema);

module.exports = Colors;