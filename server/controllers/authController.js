// Login
const login = async("/users/login", (req, res) => {
  res.json({ success: true, msg: "login" });
});

module.exports = { login };
