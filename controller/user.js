const passwordHelper = require('../service/passwordService');

const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = await modalForUser.findOne({ where: { email } });
  if (existingUser) {
    return res.status(500).json({ message: "Email Already Exists" });
  }

  try {
    const hashedPassword = passwordHelper.createHashPwd(password);

    const user = await modalForUser.create({
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
    const user = await modalForUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordMatch = await passwordHelper.comparePwd(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    await user.update({ token });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
