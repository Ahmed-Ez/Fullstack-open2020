const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'invalid username' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res.status(401).json({ error: 'invalid username or password' });
  const token = jwt.sign(
    {
      username,
      id: user.id,
    },
    config.SECRET
  );
  return res.status(200).json({ token, username });
});

module.exports = loginRouter;
