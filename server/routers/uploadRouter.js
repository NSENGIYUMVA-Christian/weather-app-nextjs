const router = require("express").Router();
const { uploadProductImage } = require("../controllers/uploadController");

router.get("/upload", uploadProductImage);

module.exports = router;
