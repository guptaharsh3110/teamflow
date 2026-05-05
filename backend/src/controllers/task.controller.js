const Task = require('../models/Task');
const Project = require('../models/Project');

// GET /api/tasks?projectId=xxx
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.projectId) filter.project = req.query.projectId;
    if (req.user.role !== 'Admin') filter.assignee = req.user._id;

    const tasks = await Task.find(filter)
      .populate('assignee', 'name email')
      .populate('project', 'name')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tasks
exports.create = async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId, assigneeId } = req.body;
    if (!title || !projectId)
      return res.status(400).json({ error: 'Title aur project zaroori hai.' });

    const task = await Task.create({
      title,
      description,
      status: status || 'todo',
      dueDate,
      project: projectId,
      assignee: assigneeId || null,
      createdBy: req.user._id,
    });

    await task.populate('assignee', 'name email');
    await task.populate('project', 'name');
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/tasks/:id
exports.update = async (req, res) => {
  try {
    const { title, description, status, dueDate, assigneeId, done } = req.body;

    const updateData = { title, description, status, dueDate };
    if (assigneeId !== undefined) updateData.assignee = assigneeId;
    if (done !== undefined) {
      updateData.done = done;
      if (done) updateData.status = 'done';
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('assignee', 'name email')
      .populate('project', 'name');
    if (!task) return res.status(404).json({ error: 'Task nahi mila.' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/tasks/:id
exports.remove = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task delete ho gaya.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tasks/dashboard
exports.dashboard = async (req, res) => {
  try {
    const filter = req.user.role !== 'Admin' ? { assignee: req.user._id } : {};
    const tasks = await Task.find(filter);

    const now = new Date();
    const stats = {
      total: tasks.length,
      done: tasks.filter((t) => t.done).length,
      inProgress: tasks.filter((t) => t.status === 'progress').length,
      overdue: tasks.filter((t) => !t.done && t.dueDate && new Date(t.dueDate) < now).length,
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
