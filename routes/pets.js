const router = require("express").Router();
let Pets = require("../models/pets.model");

router.route("/").get((req, res) => {
  Pets.find()
    .then((pets) => res.json(pets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const useremail = req.body.useremail;
  const name = req.body.name;
  const petType = req.body.petType;
  const breed = req.body.breed;
  const color = req.body.color;
  const image = req.body.image;
  const chipNr = req.body.chipNr;
  const details = req.body.details;

  const newPet = new Pets({
    useremail,
    name,
    petType,
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

router.route("/:id").delete((req, res) => {
  Pets.findByIdAndDelete(req.params.id)
    .then(() => res.json("Pet deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Pets.findById(req.params.id)
    .then((pet) => {
      pet.useremail = req.body.useremail;
      pet.name = req.body.name;
      pet.petType = req.body.petType;
      pet.breed = req.body.breed;
      pet.color = req.body.color;
      pet.image = req.body.image;
      pet.chipNr = req.body.chipNr;
      pet.details = req.body.details;

      pet
        .save()
        .then(() => res.json("Pet updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
