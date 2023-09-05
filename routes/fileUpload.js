const express = require("express");
const router = express.Router();

//import controller
const { imageUpload } = require("../Controller/Create");
const { fetchData } = require("../Controller/getData");

//define routes
router.post("/imageUpload", imageUpload);
router.get("/getallImages", fetchData);
module.exports = router;
