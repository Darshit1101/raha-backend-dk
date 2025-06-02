const { User } = require('../model');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    console.log("Email already exists");
    return res.status(500).json({ message: "Email Already Exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered', userId: user.userId });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    // Now you can use generateToken anywhere in this file
    const token = generateToken(user);

    // Update the user's token in the database
    await user.update({ token });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
