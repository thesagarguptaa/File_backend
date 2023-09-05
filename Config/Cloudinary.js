const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "dmty4imf8",
      api_key: "521146249345483",
      api_secret: "9JdlHNaEd0XRhqj4PcPVMHSZ4aQ",
    });
  } catch (err) {
    console.log(err);
  }
};
