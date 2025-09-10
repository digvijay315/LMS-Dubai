const express = require('express');
const router = express.Router();

const { registerCompany, deleteCompany } = require('../Controllers/registerCompany.controller');

// Register route
router.post('/register-company', registerCompany);

// 🔴 Delete route
router.delete('/delete-company/:id', deleteCompany);

module.exports = router;
