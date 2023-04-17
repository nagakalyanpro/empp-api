const Employee = require('../models/Employee');
const Task = require('../models/Task');

exports.addTaskToEmployee = async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const task = new Task({
            taskTitle: req.body.taskTitle,
            description: req.body.description,
        });

        employee.tasks.push(task);

        const result = await employee.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};