const User = require('../models/User');

// GET /api/team
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/team/:id/role  (Admin only)
exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['Admin', 'Member'].includes(role))
      return res.status(400).json({ error: 'Role Admin ya Member hona chahiye.' });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User nahi mila.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/team/:id  (Admin only)
exports.remove = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ error: 'Khud ko delete nahi kar sakte.' });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User remove ho gaya.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
