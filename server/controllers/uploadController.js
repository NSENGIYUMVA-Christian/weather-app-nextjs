const path = require("path");

const uploadProductImage = async (req, res) => {
  console.log(req.files.image);
  const images = req.files.image;
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${images.name}`
  );

  await images.mv(imagePath);
  res.send("upload image");
};

module.exports = { uploadProductImage };
