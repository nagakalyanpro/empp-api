const Employee = require('../models/Employee');

const createEmployee = async(req, res) => {
    try {
        const { name, email, department } = req.body;
        const employee = new Employee({
            name,
            email,
            department
        });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async(req, res) => {
    try {
        const { taskTitle, description } = req.body;
        const employee = await Employee.findById(req.params.employeeId);
        employee.tasks.push({ taskTitle, description });
        await employee.save();
        res.status(201).json(employee.tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createEmployee,
    createTask,
};