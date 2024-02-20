
var cloudinary = require("cloudinary").v2;

const cloud_name = "dckp3ubkg";
const api_key = 954137826352828;
const api_secret = "lF3OAF50khe4Qwn4gbhtlm34xns";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  timeout:60000,
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log({"uploadImage":result.secure_url});
        return resolve({ secure_url: result.secure_url, url: result.url });
      }
      console.log({"uploadImage":error.message});
      return reject({ message: error.message });
    }); 
  });
};

module.exports = uploadImage;
