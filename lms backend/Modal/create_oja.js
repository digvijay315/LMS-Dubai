const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activity_oja_title:{type:String},
    content: [
        {
            srno: { type: Number, required: true },
            description: { type: String, required: true },  
            rating: { type: Number } 
        }
    ]
})

const create_oja = new mongoose.Schema({
    oja_title: { type: String, required: true },
    oja_code: { type: String, required: true },
    rating_range_oja: {type: String, required: true},
    activities: [activitySchema],
    finalScore: { type: String } 
}, { timestamps: true });

const create_oja_modal = mongoose.model('create_Oja', create_oja);
module.exports = create_oja_modal;

