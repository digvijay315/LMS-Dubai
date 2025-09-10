const { check } = require('express-validator');

const nominationValidator = [
  check('employeeIds').isArray().notEmpty(),
  check('trainingDetails').notEmpty(),
  check('trainingDetails.training_name').notEmpty(),
  check('trainingDetails.from_date').isISO8601(),
  check('trainingDetails.to_date').isISO8601(),
  check('trainingDetails.from_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  check('trainingDetails.to_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
];

module.exports = {
  nominationValidator
};