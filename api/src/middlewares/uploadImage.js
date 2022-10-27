const axios = require("axios");

const uploadImage = async () => {
  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append("upload_preset", "appDogs");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dh6u7q4gw/image/upload",
      formData
    );
    return response.data.url;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  uploadImage,
};
