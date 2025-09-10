const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activity_ina_title:{type:String},
    content: [
        {
            srno: { type: Number, required: true },
            description: { type: String, required: true },  
            rating: { type: Number } 
        }
    ]
})

const create_ina = new mongoose.Schema({
    ina_title: { type: String, required: true },
    ina_code: { type: String, required: true },
    rating_range_ina: { type: String, required: true},
    activities: [activitySchema],
    finalScore: { type: String } 
}, { timestamps: true });

const create_ina_modal = mongoose.model('create_Ina', create_ina);
module.exports = create_ina_modal;