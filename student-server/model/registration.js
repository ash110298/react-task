const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({

Fullname:{
  type: String,
  required: true
},

email:{
  type: String,
  required: true,
  unique : true,
  match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},

 password:{
   type: String,
   required: true
 },

 phone:{
   type: Number,
   required: true
 }
}, {timestamps: true})



module.exports = mongoose.model("Registration", RegistrationSchema);
