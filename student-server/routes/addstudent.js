const express = require('express');
const router = express.Router();
const Students = require("./../model/studentmodel");


router.post('/', (req, res, next)=>{

  let newstudent = new Students({
    Fullname: req.body.Fullname,
    school: req.body.school,
    standards: req.body.standards,
    division: req.body.division,
    dob: req.body.dob,
    status: req.body.status
  });

  newstudent.save().then(result=> {
    return res.status(200).send("New Student has been added");
  }).catch(error=>{
    return res.status(500).send({error: "Error while saving data"})
       });
})


router.get('/', (req, res, next)=>{
  Students.find( (err, stud)=>{
  if(err) res.status(500).json({error: 'error while fetching students data'})
  res.status(200).send(stud);

});
})

router.get('/:id', (req, res, next)=>{
  Students.findById(req.params.id, (err, stud)=>{
  if(err) res.status(500).json({error: 'error while fetching student data'})
  res.status(200).send(stud);

});
})

router.put("/:id", (req, res) => {
  Students.findByIdAndUpdate(req.params.id, {Fullname: req.body.Fullname, school: req.body.school, standard: req.body.standard, division: req.body.division, status: req.body.status, dob: req.body.dob} , {new: true}, (err, stud) =>  {
    if (err) res.status(500).send({error: 'error while updating Student data'});
    res.status(200).send("Student Data Updated");
  });
});

router.delete('/:id', (req, res, next)=>{
  Students.findByIdAndRemove(req.params.id, (err, Stud) =>  {
    if (err) res.status(500).send({error: 'error while deleting Student data'});
    res.status(200).send('Student data deleted');
  });
})

module.exports = router;
