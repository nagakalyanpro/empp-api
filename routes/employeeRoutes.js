const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const Employee = require('../models/Employee');


router.post('/add-emp', employeeController.createEmployee);
router.post('/:employeeId/tasks', employeeController.createTask);

router.get('/employees/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('department');
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:employeeId/tasks/:taskId/status', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId);
        const task = employee.tasks.id(req.params.taskId);
        task.status = req.body.status;
        await employee.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;