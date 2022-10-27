const { Router } = require("express");
const router = Router();

const { getAllDogs } = require("../middlewares/getAllDogs.js");
const { getDogsByRace } = require("../middlewares/getDogsByRace.js");
const { getDogById } = require("../middlewares/getDogById.js");
const { postDog } = require("../middlewares/postDog.js");
const { getTemps } = require("../middlewares/getTemps.js");

router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const dogs = await getDogsByRace(name);
      return res.status(200).send(dogs);
    }
    const dogs = await getAllDogs();
    res.status(200).send(dogs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/dogs/:idRaza", async (req, res) => {
  try {
    const { idRaza } = req.params;
    const dog = await getDogById(idRaza);
    res.status(200).send(dog);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/dogs", async (req, res) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    image,
    temperament,
  } = req.body;
  try {
    const newDog = {
      name,
      height: `${heightMin} - ${heightMax} imperial`,
      weight: `${weightMin} - ${weightMax} imperial`,
      life_span: `${life_span} years`,
      image: image ? image : "https://i.ibb.co/SmyYjkt/dog.png",
      temperament,
    };
    const createDog = await postDog(newDog);
    res.status(200).send(createDog);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const temps = await getTemps();
    res.status(200).send(temps);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
