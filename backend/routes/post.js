const express = require("express");
const { addPost, getAllPosts } = require("../controllers/postControlller");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/", isAuth, addPost);
router.get("/", isAuth, getAllPosts);

module.exports = router;
