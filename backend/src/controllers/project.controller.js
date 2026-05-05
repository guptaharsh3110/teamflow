const Project = require('../models/Project');
const Task = require('../models/Task');

// GET /api/projects
exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user._id })
      .populate('members', 'name email role')
      .populate('createdBy', 'name');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/projects
exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Project ka naam dalo.' });

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
    });
    await project.populate('members', 'name email role');
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/projects/:id
exports.getOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email role')
      .populate('createdBy', 'name');
    if (!project) return res.status(404).json({ error: 'Project nahi mila.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/projects/:id
exports.update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    ).populate('members', 'name email role');
    if (!project) return res.status(404).json({ error: 'Project nahi mila.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/projects/:id
exports.remove = async (req, res) => {
  try {
    await Task.deleteMany({ project: req.params.id });
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project aur uske tasks delete ho gaye.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/projects/:id/members
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('members', 'name email role');
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/projects/:id/members/:userId
exports.removeMember = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.userId } },
      { new: true }
    ).populate('members', 'name email role');
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
