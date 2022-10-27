const axios = require("axios");
const { Temp } = require("../db.js");

const getTemps = async () => {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const array = [];
    for (let i = 0; i < response.data.length; i++) {
      if (!array.includes(response.data[i].temperament))
        array.push(response.data[i].temperament);
    }
    const data = array.join(", ").split(", ");
    const temps = [...new Set(data.sort())];
    temps.shift();
    temps.forEach(async (temp) => {
      await Temp.findOrCreate({
        where: { name: temp },
      });
    });
    return temps;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getTemps,
};
