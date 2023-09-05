const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

// Post middleware

fileSchema.post("save", async function (doc) {
  try {
    console.log("doc", doc);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `Sagar Gupta `,
      to: doc.email,
      subject: "New File uploaded in cloudinary",
      html: `<h2>Hello jee</h2> <br/>
      <p>File Name is :-  ${doc.imageName}</p> <br/>
      <p>File Description is :- ${doc.imageDescription}</p> <br/>
      <p>File Uploaded View here: <img src={${doc.imageUrl}}/> <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
    });

    console.log("info", info);
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("File", fileSchema);
