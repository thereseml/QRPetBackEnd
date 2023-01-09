const router = require('express').Router();
let Users = require('../models/users.model');

router.route('/').get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const country = req.body.country;
  const pets = req.body.pets;

  const newUser = new Users({
    firstname,
    lastname,
    email,
    password,
    phone,
    address,
    city,
    zip,
    country,
    pets,
  });

  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
