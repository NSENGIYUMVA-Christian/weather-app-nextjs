const router = require("express").Router();
const { uploadProductImage } = require("../controllers/uploadController");

router.post("/upload/:id", uploadProductImage);

module.exports = router;
