const mongoose = require('mongoose');

// Create a model to track completions
const competencyCompletionSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    competencyMappingId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompetencyMapping' },
    completionDate: { type: Date, default: Date.now },
    nextAssignmentDate: { type: Date, required: true }
  }, { timestamps: true });
  
const CompetencyCompletion = mongoose.model('CompetencyCompletion', competencyCompletionSchema);
module.exports = CompetencyCompletion;