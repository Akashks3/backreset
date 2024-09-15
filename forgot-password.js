const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./User');
const Token = require('./Token');

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    await Token.create({ email, token, expires: Date.now() + 3600000 }); // 1 hour

    // Send email with reset link
    const transporter = nodemailer.createTransport(/* your SMTP settings */);
    const resetLink = `https://yourapp.com/reset-password?token=${token}`;
    
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`
    });

    res.status(200).json({ message: 'Reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
