const mongoose = require("mongoose");

const moduleProgressSchema = new mongoose.Schema({
  moduleName: { 
    type: String, 
    required: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  score: { 
    type: Number, 
    default: 0 
  },
  timeSpent: { 
    type: Number, 
    default: 0 
  }, 
});

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modules: { 
      type: [moduleProgressSchema], 
      default: [] 
    },
    overallProgress: { 
      type: Number, 
      default: 0 
    },
    lastUpdated: { 
      type: Date, 
      default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
