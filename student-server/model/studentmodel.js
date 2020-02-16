const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

  Fullname:{
     type: String,
     required: true
   },

  school:{
    type: String,
    required: true
  },

  standards:{
    type: String,
    required: true
  },

  division:{
    type: String,
    required: true
  },

  dob:{
    type: Date,
    required: true
  },

  status:{
    type: Boolean,
    required: true
  }
}, {timestamps: true})


  module.exports = mongoose.model("Student", StudentSchema);
