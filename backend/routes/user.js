const express = require("express");
const { uploadProfile } = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const upload = require("../middleware/upload");
const router = express.Router();

router.put("/upload", isAuth, upload.single("myImage"), uploadProfile);

module.exports = router;
