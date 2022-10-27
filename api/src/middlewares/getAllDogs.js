const { Dog, Temp } = require("../db.js");
const { apiCallAll } = require("./apiCalls.js");

const getAllDogs = async () => {
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
    const allDogs = result.flat(1); // concateno

    if (allDogs.length) return allDogs;
    throw new Error("Dogs not found");
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllDogs,
};
