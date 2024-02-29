const path = require("path");
const pool = require("../dbConfig");
const { uploadImageInDb } = require("../queries/users");

const uploadProductImage = async (req, res) => {
  const { id } = req.params;
  //console.log(req.files.image);
  //const { id } = req.body;
  const images = req.files.image;
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${images.name}`
  );
  /// move image to the correct path
  await images.mv(imagePath);
  const imgUrl = `http://localhost:8080/uploads/${images.name}`;
  const imgName = images.name;
  // save in image info in DB
  pool.query(uploadImageInDb, [imgUrl, imgName, id], (error, response) => {
    if (error) throw error;
    res.json({
      msg: "Image uploaded success",
      image: { src: imgUrl },
      id,
      resp: response.rows,
    });
  });
};

module.exports = { uploadProductImage };
