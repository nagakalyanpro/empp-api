const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    tasks: [{
        taskTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['not-completed', 'completed'],
            default: 'not-completed',
        },
    }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;