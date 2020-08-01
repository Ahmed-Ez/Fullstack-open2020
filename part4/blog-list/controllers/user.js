const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

usersRouter.post('/', async (req, res) => {
  const { name, username } = req.body;
  if (req.body.password.length < 3)
    return res
      .status(400)
      .json({ error: 'password must atleast be 3 characters' });
  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name,
    username,
    password,
  });
  const savedUser = await user.save();
  res.status(200).json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');
  res.status(200).json(users);
});

module.exports = usersRouter;
