const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, status } = req.body;
  const newTask = new Task({ title, status });
  await newTask.save();
  res.status(201).json(newTask);
});

router.put('/:id', async (req, res) => {
  const { title, status } = req.body;
  const updated = await Task.findByIdAndUpdate(req.params.id, { title, status }, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
