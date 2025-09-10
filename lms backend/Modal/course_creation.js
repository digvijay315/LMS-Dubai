// const mongoose = require('mongoose');

// const addContent = new mongoose.Schema({
//     video_file:{type:Array},
//     chapter_title:{type:String},
//     chapter_description:{type:String}
// }) 

// const createCourse = new mongoose.Schema({
//     course_title_main:{type:String},
//     add_main_category:{type:String},
//     add_sub_category:{type:String},
//     description:{type:String},
//     course_code:{type:String},
//     course_title:{type:String},
//     add_Content:[addContent],
//     image_file:{type:Array},
//     pdf_file:{type:Array},
//     word_file:{type:Array},
// })

// const Course = mongoose.model('createCourse', createCourse);
// module.exports = Course;



// const mongoose = require('mongoose');

// const createCourse = new mongoose.Schema({
//     course_title_main:{type:String},
//     add_main_category:{type:String},
//     add_sub_category:{type:String},
//     description:{type:String},
//     course_code:{type:String},
//     course_title:{type:String},
//     add_Content: [{
//         chapter_title: String,
//         chapter_description: String,
//         video_file: [String], // or any other type if you're uploading files
//     }],
//     image_file:{type:Array},
//     pdf_file:{type:Array},
//     word_file:{type:Array},
// })

// const Course = mongoose.model('createCourse', createCourse);
// module.exports = Course;


const mongoose = require('mongoose');

const createCourse = new mongoose.Schema({
    course_title_main: { type: String },
    add_main_category: { type: String },
    course_duration:{ type: String },
    add_sub_category: { type: String },
    add_tag: { type: String },
    creation_date: { type: String},
    description: { type: String },
    course_price: { type: String},
    course_code: { type: String },
    sections: [
        {
            section_title: { type: String }, // Section title
            add_Content: [ // Array of chapter contents in each section
                {
                    chapter_title: { type: String },
                    chapter_description: { type: String },
                    youtube_link: { type: String },
                    video_file: [String], // URLs of uploaded video files
                    ppt_file: { type: Array},
                }
            ],
        }
    ],
    course_assesment: { type: String },
    course_certificate: { type: String },
    assesment_complete_date: { type: String },
    assesment_limitation: { type: String },
    assesment_passingscore: { type: String },
    thumbnail_upload: {type: Array},
    file_upload: {type: Array},
    video_upload: {type: Array},
    image_file: { type: Array }, // Image file URLs
    pdf_file: { type: Array },   // PDF file URLs
    word_file: { type: Array },  // Word file URLs
});

const Course = mongoose.model('createCourse', createCourse);
module.exports = Course;

