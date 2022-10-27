const { Dog } = require("../db.js");

const postDog = async ({
  name,
  height,
  weight,
  life_span,
  image,
  temperament,
}) => {
  try {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    await newDog.addTemps(temperament);

    return newDog;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  postDog,
};
