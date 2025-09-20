const AppAdmin = require('./Admin.Login.Models');
const jwt = require('jsonwebtoken');

// Helper to generate JWT token
function generateToken(userId) {
  // Use a secret key from env or fallback
  const secret = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.sign({ id: userId }, secret, { expiresIn: '1d' });
}

const appAdminSignIn = async (req, res) => {
  try {
    console.log('--- Admin Login Debug ---');
    console.log('Request body:', req.body);

    const { email, phoneNumber, password } = req.body;
    // Build $or query only with provided fields
    const orQuery = [];
    if (email) orQuery.push({ email });
    if (phoneNumber) orQuery.push({ phoneNumber });
    if (orQuery.length === 0) {
      console.log('No email or phoneNumber provided');
      return res.status(400).json({ message: 'Email or phone number required' });
    }
    const user = await AppAdmin.findOne({ $or: orQuery });
    console.log('User found:', user);

    if (!user) {
      console.log('No user found for email/phone:', email, phoneNumber);
      return res
        .status(401)
        .json({ message: "Invalid email/phone number or password" });
    }

    if (password !== user.password) {
      console.log('Password mismatch for user:', user.email || user.phoneNumber);
      return res
        .status(401)
        .json({ message: "Invalid email/phone number or password" });
    }

    // If you have generateToken defined somewhere, make sure it's imported. Otherwise, log error.
    let token;
    try {
      token = generateToken(user._id);
      console.log('Token generated:', token);
    } catch (tokenErr) {
      console.error('Error generating token:', tokenErr);
      return res.status(500).json({ message: 'Token generation failed', error: tokenErr.toString() });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token,
    });
    console.log('Login successful for:', user.email || user.phoneNumber);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Error logging in", error: error.toString() });
  }
};

module.exports = { appAdminSignIn };