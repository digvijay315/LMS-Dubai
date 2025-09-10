// Backend Controller (excelUpload.controller.js)
const ExcelData = require('../Modal/excel_file');

const uploadExcelData = async (req, res) => {
    try {
        const sheetData = req.body;
        const savedData = [];

        // Process each sheet
        for (const [sheetName, data] of Object.entries(sheetData)) {
            // Validate data
            if (!Array.isArray(data) || data.length === 0) {
                continue;
            }

            // Create new document for this sheet
            const newExcelData = new ExcelData({
                sheetName,
                data
            });

            // Save to database
            const savedSheet = await newExcelData.save();
            savedData.push(savedSheet);
        }

        res.status(200).json({
            success: true,
            message: 'Excel data uploaded successfully',
            data: savedData
        });
    } catch (error) {
        console.error('Error uploading excel data:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading excel data',
            error: error.message
        });
    }
};

// Get all Excel data
// const getAllExcelData = async (req, res) => {
//     try {
//         const allData = await ExcelData.find({});
//         res.status(200).json({
//             success: true,
//             data: allData
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching excel data',
//             error: error.message
//         });
//     }
// };

// In getAllExcelData controller
const getAllExcelData = async (req, res) => {
    try {
        console.log('Fetching excel data...');
        const allData = await ExcelData.find({});
        console.log('Found data:', allData);
        
        if (!allData || allData.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No data found'
            });
        }

        res.status(200).json({
            success: true,
            data: allData
        });
    } catch (error) {
        console.error('Error in getAllExcelData:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching excel data',
            error: error.message
        });
    }
};



module.exports = {
    uploadExcelData,
    getAllExcelData
};