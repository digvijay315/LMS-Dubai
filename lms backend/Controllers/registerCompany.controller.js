// controllers/registerCompany.controller.js

const RegisteredCompany = require('../models/registerCompany.model');

// Existing Register Function
const registerCompany = async (req, res) => {
  try {
    const { companyName, companyEmail, phoneNumber, companyAddress } = req.body;

    if (!companyName || !companyEmail || !phoneNumber || !companyAddress) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingCompany = await RegisteredCompany.findOne({ companyEmail });
    if (existingCompany) {
      return res.status(409).json({ message: 'Company with this email already exists.' });
    }

    const newCompany = new RegisteredCompany({
      companyName,
      companyEmail,
      phoneNumber,
      companyAddress,
    });

    await newCompany.save();

    return res.status(201).json({ message: 'Company registered successfully!', company: newCompany });

  } catch (error) {
    console.error('Error registering company:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 🔴 DELETE Company by ID
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const deleted = await RegisteredCompany.findByIdAndDelete(companyId);

    if (!deleted) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerCompany,
  deleteCompany, // 👈 export delete controller
};
