const router = require("express").Router();
let Pets = require("../models/pets.model");

// hämtar alla djur
router.route("/").get((req, res) => {
  Pets.find()
    .then((pets) => res.json(pets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// lägger till djur i databasen
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const petType = req.body.petType;
  const breed = req.body.breed;
  const color = req.body.color;
  const details = req.body.details;
  const ownerId = req.body.ownerId;

  const newPet = new Pets({
    name,
    petType,
    breed,
    color,
    details,
    ownerId,
  });

  newPet
    .save()
    .then(() => res.json("Pet added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// hämta djur med eget id
router.route("/:id").get((req, res) => {
  Pets.findById(req.params.id)
    .then((pets) => res.json(pets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// hämta djuren som har samma id som ägaren
router.route("/owner/:id").get((req, res) => {
  Pets.find({ ownerId: req.params.id })
    .then((pets) => res.json(pets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ta bort djur med eget id
router.route("/owner/:id").delete((req, res) => {
  Pets.findOneAndDelete({ ownerId: req.params.id })
    .then(() => res.json("Pet deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// uppdatera djur med eget id
router.route("/update/:id").post((req, res) => {
  Pets.findById(req.params.id)
    .then((pets) => {
      pets.name = req.body.name;
      pets.petType = req.body.petType;
      pets.breed = req.body.breed;
      pets.color = req.body.color;
      pets.details = req.body.details;
      pets.ownerId = req.body.ownerId;

      pets
        .save()
        .then(() => res.json("Pet updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
