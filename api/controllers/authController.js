const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json("not found");

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) return res.status(422).json("pass not ok");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.cookie("token", token).json(user);
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.logout = (req, res) => {
  res.cookie("token", "").json(true);
};
