// Backend Models (excelData.model.js)
const mongoose = require('mongoose');

// Dynamic Schema to handle any sheet structure
const DynamicDataSchema = new mongoose.Schema({
    sheetName: {
        type: String,
        required: true
    },
    data: [{
        type: mongoose.Schema.Types.Mixed
    }],
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

const ExcelData = mongoose.model('ExcelData', DynamicDataSchema);
module.exports = ExcelData;