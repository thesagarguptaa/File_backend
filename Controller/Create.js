const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

//image upload handler

function ifFileTypeSupported(fileType, supportedTypes) {
  return supportedTypes.includes(fileType);
}

async function uploadFileTOCloudinary(file, folder) {
  const option = { folder };

  console.log("temp file path", file.tempFilePath);

  option.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, option);
}

exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    console.log("in a image upload controller");
    const { imageName, email, imageDescription } = req.body;
    console.log("fetch data ", imageName, email, imageDescription);
    console.log(req);

    const file = req.files.image;

    console.log("fetch file", file);
    console.log("API_SECRET", process.env.API_SECRET);

    //Validation
    const supportedTypes = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type: ", fileType);

    if (!ifFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: true,
        message: "File format is not supported",
      });
    }

    console.log("Type is supported");

    //Uploading in cloud

    const response = await uploadFileTOCloudinary(file, "HubX");
    console.log(response);
    console.log("upload on cloudinary complete");

    //db entry ;`
    const entry = await File.create({
      imageName,
      email,
      imageDescription,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "image is successfully uploaded in cloudinary",
      entry: entry,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: "error in code ",
      error: err,
    });
  }
};
