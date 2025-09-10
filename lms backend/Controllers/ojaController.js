// // controllers/ojaController.js
// const OJA = require('Backend/Modal/ojaModel.js');

// // Create OJA (POST)
// exports.createOJA = async (req, res) => {
//   try {
//     const { oja_title, oja_code, activities } = req.body;

//     // Create new OJA instance
//     const newOJA = new OJA({
//       oja_title,
//       oja_code,
//       activities,
//     });

//     // Save the OJA in the database
//     const savedOJA = await newOJA.save();

//     res.status(201).json({
//       message: 'OJA created successfully',
//       oja: savedOJA,
//     });
//   } catch (error) {
//     console.error('Error creating OJA:', error);
//     res.status(500).json({ message: 'Failed to create OJA', error });
//   }
// };

// // Get all OJAs (GET)
// exports.getAllOJAs = async (req, res) => {
//   try {
//     const ojas = await OJA.find();

//     res.status(200).json({
//       message: 'OJAs retrieved successfully',
//       ojas,
//     });
//   } catch (error) {
//     console.error('Error retrieving OJAs:', error);
//     res.status(500).json({ message: 'Failed to retrieve OJAs', error });
//   }
// };

// // Get OJA by ID (GET)
// exports.getOJAById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const oja = await OJA.findById(id);

//     if (!oja) {
//       return res.status(404).json({ message: 'OJA not found' });
//     }

//     res.status(200).json({
//       message: 'OJA retrieved successfully',
//       oja,
//     });
//   } catch (error) {
//     console.error('Error retrieving OJA:', error);
//     res.status(500).json({ message: 'Failed to retrieve OJA', error });
//   }
// };
