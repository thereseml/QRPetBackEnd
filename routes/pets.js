const router = require("express").Router();
let Pets = require("../models/pets.model");

router.route("/").get((req, res) => {
  Pets.find()
    .then((pets) => res.json(pets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const breed = req.body.breed;
  const color = req.body.color;
  const image = req.body.image;
  const chipNr = req.body.chipNr;
  const details = req.body.details;

  const newPet = new Pets({
    name,
    breed,
    color,
    image,
    chipNr,
    details,
  });

  newPet
    .save()
    .then(() => res.json("Pet added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Pets.findById(req.params.id)
    .then((pet) => res.json(pet))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
