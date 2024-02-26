const router = require("express").Router();
const {
  login,
  register,
  updateUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.patch("/update/:id", updateUser);

module.exports = router;
