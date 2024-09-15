router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
  
    try {
      const resetToken = await Token.findOne({ token, expires: { $gt: Date.now() } });
      if (!resetToken) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      const user = await User.findOne({ email: resetToken.email });
      user.password = password; // You should hash the password before saving
      await user.save();
  
      await Token.deleteOne({ token });
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  