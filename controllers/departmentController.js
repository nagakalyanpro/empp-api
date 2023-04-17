const Department = require('../models/Department');

const createDepartment = async(req, res) => {
    const { departmentName, hod } = req.body;

    try {
        const department = await Department.create({ departmentName, hod });
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createDepartment };