const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  doUrl:{
    type: String,
    required: true
  },
  statement:{
    type: String,
    required: true
  },
  dontUrl: {
    type: String,
    required: true
  }
});

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
