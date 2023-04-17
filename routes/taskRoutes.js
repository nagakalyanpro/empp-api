const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define a new route to get tasks for a specific employee
router.get('/employees/:employeeId/tasks', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId)
            .populate({
                path: 'tasks',
                select: 'taskTitle description'
            });
        res.json(employee.tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router