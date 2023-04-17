const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Task = require('../models/Task');

exports.createEmployee = async(req, res) => {
    try {
        const department = await Department.findById(req.body.department);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        let tasks = [];
        if (req.body.tasks) {
            tasks = req.body.tasks.map(task => new Task({
                taskTitle: task.taskTitle,
                description: task.description,
            }));
            await Task.insertMany(tasks); // save the tasks to the database
        }

        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            department: department._id,
            tasks: tasks.map(task => task._id), // map the tasks to their IDs
        });

        const result = await employee.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}