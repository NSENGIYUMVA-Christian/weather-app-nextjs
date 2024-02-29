const router = require("express").Router();
const { uploadProductImage } = require("../controllers/uploadController");

router.post("/upload", uploadProductImage);

module.exports = router;
