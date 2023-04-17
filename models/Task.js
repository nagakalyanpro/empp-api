const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);