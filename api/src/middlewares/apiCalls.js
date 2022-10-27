const axios = require("axios");

const apiCallAll = async () => {
  const response = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiDogs = response.data.map((d) => {
    let obj = {
      id: d.id,
      name: d.name,
      weight: `${d.weight.imperial} imperial`,
      image: d.image.url,
      temps: d.temperament,
    };
    return obj;
  });
  return apiDogs;
};

const apiCallId = async (id) => {
  const response = await axios.get("https://api.thedogapi.com/v1/breeds");
  const filtered = response.data.filter((d) => d.id === parseInt(id));
  const apiDog = filtered.map((d) => {
    let obj = {
      id: d.id,
      name: d.name,
      weight: d.weight.imperial,
      image: d.image.url,
      temps: d.temperament,
      height: `${d.height.imperial} imperial`,
      life_span: d.life_span,
    };
    return obj;
  });

  return apiDog.shift();
};

module.exports = {
  apiCallId,
  apiCallAll,
};
