const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.post('/add-dept', departmentController.createDepartment);

module.exports = router;