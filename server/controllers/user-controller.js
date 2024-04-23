const { user: User } = require("../models/User");

const addUser = async (req, res) => {
  try {
    let exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.status(200).json("User already exists");
      return;
    }
    const newUser = new User({ ...req.body, lastSeen: new Date() });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  addUser,
  getUsers,
};
