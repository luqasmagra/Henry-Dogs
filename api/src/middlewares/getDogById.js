const { Dog, Temp } = require("../db.js");
const { apiCallId } = require("./apiCalls.js");

const getDogById = async (id) => {
  try {
    if (id.length > 30) {
      const dbDog = await Dog.findByPk(id, {
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
      if (dbDog) return dbDog;
      throw new Error("Breed not found");
    } else {
      const apiDog = await apiCallId(id);

      if (apiDog) return apiDog;
      throw new Error("Breed not found");
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getDogById,
};
