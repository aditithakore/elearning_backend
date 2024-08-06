const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});



const Shapes= mongoose.model("Shapes", shapeSchema);

module.exports = Shapes;