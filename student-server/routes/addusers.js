const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Registration = require("./../model/registration");
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next)=>{
  console.log("tunica", req.body)

Registration.findOne({email: req.body.email}, (err, email)=>{
  if(err) res.send(err);
  if(email){
    return res.status(500).send({error: "mail id already exists"})
  }

 bcrypt.hash(req.body.password, 10, (err, hash)=>{
   if(err){
     return res.status(500).send({error: "Error in Registration"})
   }
Registration.findOne({phone:req.body.phone}, (err, mob)=>{
if(err) res.send(err)
if(mob){
  return res.status(500).send({error: "mobile no exists"})
}

let newuser = new Registration({
  Fullname: req.body.Fullname,
  email: req.body.email,
  password: hash,
  phone: req.body.phone
});

newuser.save().then(result=> {
  return res.status(200).send("User Registered successfully");
}).catch(error=>{
  return res.status(500).send({error: "Error while saving data"})
     });
    });
   });
 });
});

router.post('/signin', async function (req, res, next) {
  let user = await Registration.findOne({email: req.body.email});
  if (!user) {
    return res.status(404).send('email not found');
  }
  bcrypt.compare(req.body.password, user.password, async function(err, result) {
    if (err) {
      return res.status(400).send('Credentials didn\'t match');
    }
    if (!result) {
      return res.status(400).send('Credentials didn\'t match');
    }

    try {
      let signed_token = jwt.sign({user: user._id, email: user.email}, 'sdfasdfasdfasdfasdfasdfasdf');
      return res.status(200).send({ data: user.Fullname});
    } catch (err) {
        return res.status(400).send('Something went wrong while signin the token');
    }


  });
});

module.exports = router;
