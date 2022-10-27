const { Dog, Temp } = require("../db.js");
const { apiCallAll } = require("./apiCalls.js");

const getDogsByRace = async (race) => {
  try {
    const dbDogs = await Dog.findAll({
      include: [
        {
          model: Temp,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const apiDogs = await apiCallAll();
    const result = await Promise.all([dbDogs, apiDogs]); // resuelvo
    const allDogs = result
      .flat(1)
      .filter((r) => r.name.toLowerCase().includes(race.toLowerCase())); // concateno y busco

    if (allDogs.length) return allDogs;
    throw new Error("Breed not found");
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getDogsByRace,
};
