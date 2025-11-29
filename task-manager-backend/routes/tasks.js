const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const authorize = require('../middleware/roles');

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status, createdBy: req.user._id });
    await task.save();
    res.json(task);
  } catch(err){ res.status(500).send('Server error'); }
});

// List tasks (with simple pagination)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // optional: only show user's tasks or all tasks for admin
    let filter = {};
    if (req.user.role !== 'admin') filter = { createdBy: req.user._id };
    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    res.json({ tasks, total, page, pages: Math.ceil(total/limit) });
  } catch(err){ res.status(500).send('Server error'); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: 'Not found' });
    // normal users can only update their own tasks
    if(req.user.role !== 'admin' && !task.createdBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch(err){ res.status(500).send('Server error'); }
});

// Delete - only admin
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch(err){ res.status(500).send('Server error'); }
});

module.exports = router;
