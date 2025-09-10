


const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Course = require('../Modal/course_creation');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const post_course_creation = async (req, res) => {
    try {
        const sections = [];
        
        // First, parse the sections data from the request body
        const sectionCount = Object.keys(req.body)
            .filter(key => key.match(/^sections\[\d+\]\.section_title$/))
            .length;

        for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {
            const section_title = req.body[`sections[${sectionIndex}].section_title`];
            const add_Content = [];

            // Count chapters in current section
            const chapterCount = Object.keys(req.body)
                .filter(key => key.match(new RegExp(`^sections\\[${sectionIndex}\\]\\.add_Content\\[\\d+\\]\\.chapter_title$`)))
                .length;

            for (let chapterIndex = 0; chapterIndex < chapterCount; chapterIndex++) {
                const chapter_title = req.body[`sections[${sectionIndex}].add_Content[${chapterIndex}].chapter_title`];
                const chapter_description = req.body[`sections[${sectionIndex}].add_Content[${chapterIndex}].chapter_description`];
                const youtube_link = req.body[`sections[${sectionIndex}].add_Content[${chapterIndex}].youtube_link`] || '';
                
                const video_files = [];
                const ppt_files = [];

                // Process video files for each chapter
                if (req.files) {
                    const videoField = req.files.filter(
                        file => file.fieldname === `sections[${sectionIndex}].add_Content[${chapterIndex}].video_file`
                    );

                    for (let file of videoField) {
                        try {
                            const result = await cloudinary.uploader.upload(file.path, { 
                                resource_type: 'video',
                                folder: 'course_videos'
                            });
                            video_files.push(result.secure_url);
                            // Clean up uploaded file
                            fs.unlinkSync(file.path);
                        } catch (error) {
                            console.error('Error uploading video:', error);
                        }
                    }

                    // Process PPT files for each chapter
                    const pptField = req.files.filter(
                        file => file.fieldname === `sections[${sectionIndex}].add_Content[${chapterIndex}].ppt_file`
                    );

                    for (let file of pptField) {
                        try {
                            const result = await cloudinary.uploader.upload(file.path, {
                                resource_type: 'raw',
                                folder: 'course_ppts'
                            });
                            ppt_files.push(result.secure_url);
                            // Clean up uploaded file
                            fs.unlinkSync(file.path);
                        } catch (error) {
                            console.error('Error uploading PPT:', error);
                        }
                    }
                }

                // Only add chapter if it has required fields
                if (chapter_title) {
                    add_Content.push({
                        chapter_title,
                        chapter_description,
                        youtube_link,
                        video_file: video_files,
                        ppt_file: ppt_files
                    });
                }
            }

            // Only add section if it has a title and content
            if (section_title && add_Content.length > 0) {
                sections.push({
                    section_title,
                    add_Content,
                });
            }
        }

        // Collect other form data
        const { 
            course_title_main, 
             course_code, 
            course_duration,
            add_main_category, 
            add_sub_category,
            add_tag,
            creation_date, 
            description, 
            course_price ,
            course_assesment,
            course_certificate,
            assesment_complete_date,
            assesment_limitation,
            assesment_passingscore
        } = req.body;

        const thumbnail = [];
        const fileUpload = [];
        const videUpload = [];
        const images = [];
        const pdfFile = [];
        const wordFile = [];

        // Process other files
        if (req.files) {
            const processFiles = async (fieldname, uploadArray, resourceType = 'auto', folder = 'course_files') => {
                const files = req.files.filter(file => file.fieldname === fieldname);
                for (let file of files) {
                    try {
                        const result = await cloudinary.uploader.upload(file.path, {
                            resource_type: resourceType,
                            folder: folder
                        });
                        uploadArray.push(result.secure_url);
                        fs.unlinkSync(file.path);
                    } catch (error) {
                        console.error(`Error uploading ${fieldname}:`, error);
                    }
                }
            };

            await Promise.all([
                processFiles('thumbnail_upload', thumbnail, 'image', 'course_thumbnails'),
                processFiles('file_upload', fileUpload, 'raw', 'course_files'),
                processFiles('video_upload', videUpload, 'video', 'course_videos'),
                processFiles('image_file', images, 'image', 'course_images'),
                processFiles('pdf_file', pdfFile, 'raw', 'course_pdfs'),
                processFiles('word_file', wordFile, 'raw', 'course_docs')
            ]);
        }

        // Create and save course
        const add_course_creation = new Course({
            course_title_main,
            course_code,
            course_duration,
            add_main_category,
            add_sub_category,
            add_tag,
            creation_date,
            description,
            course_price,
            sections,
            course_assesment,
            course_certificate,
            assesment_complete_date,
            assesment_limitation,
            assesment_passingscore,
            thumbnail_upload: thumbnail,
            file_upload: fileUpload,
            video_upload: videUpload,
            image_file: images,
            pdf_file: pdfFile,
            word_file: wordFile,
        });

        const resp = await add_course_creation.save();
        res.status(200).json({
            message: "Course data saved successfully",
            course_data: resp
        });
    } catch (error) {
        console.error("Error in post_course_creation:", error);
        res.status(500).json({
            message: "An error occurred while saving the course",
            error: error.message
        });
    }
};

// GET View Course
const viewcourse = async (req, res) => {
    try {
        const resp = await Course.find();
        res.status(200).send({ message: "Course data fetched", course: resp });
    } catch (error) {
        console.error("Error in viewcourse:", error);
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
};

// Fetch course data by ID
const getCourseById = async (req, res) => {
  try {
      const { id } = req.params; // Extract ID from request parameters

      // Find course by ID
      const course = await Course.findById(id);

      // Check if the course exists
      if (!course) {
          return res.status(404).json({
              success: false,
              message: 'Course not found',
          });
      }

      // Return the course data
      return res.status(200).json({
          success: true,
          data: course,
      });
  } catch (error) {
      // Handle any errors
      console.error('Error fetching course by ID:', error.message);
      return res.status(500).json({
          success: false,
          message: 'An error occurred while fetching course data',
          error: error.message,
      });
  }
};

module.exports = { post_course_creation, viewcourse, getCourseById };


// POST Course Creation
// const post_course_creation = async (req, res) => {
//     try {
//         const sections = [];
//         let sectionIndex = 0;

//         // Loop to process each section and its chapters
//         while (req.body[`sections[${sectionIndex}].section_title`]) {
//           const section_title = req.body[`sections[${sectionIndex}].section_title`];
//           const add_Content = [];
//           let chapterIndex = 0;
        
//           while (req.body[`sections[${sectionIndex}].add_Content[${chapterIndex}].chapter_title`]) {
//             const chapter_title = req.body[`sections[${sectionIndex}].add_Content[${chapterIndex}].chapter_title`];
//             const chapter_description = req.body[`sections[${sectionIndex}].add_Content[${chapterIndex}].chapter_description`];
            
//             const video_files = [];

//             // Process video files as needed
//             // Process video files for each chapter
//             if (req.files) {
//               const videoField = req.files.filter(
//                   file => file.fieldname === `sections[${sectionIndex}].add_Content[${chapterIndex}].video_file`
//               );

//               for (let file of videoField) {
//                   const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
//                   video_files.push(result.secure_url);
//               }
//             }
        
//             add_Content.push({
//               chapter_title,
//               chapter_description,
//               video_file: video_files,
//             });
        
//             chapterIndex++;
//           }
        
//           sections.push({
//             section_title,
//             add_Content,
//           });
        
//           sectionIndex++;
//         }


//         // Collect other form data
//         const { course_title_main, add_main_category, add_sub_category, creation_date, description, course_code, course_price } = req.body;

//         const thumbnail = [];
//         const fileUpload = [];
//         const videUpload = [];
//         const images = [];
//         const pdfFile = [];
//         const wordFile = [];

//         // Process image files
//         if (req.files) {
//             const thumbnailField = req.files.filter(file => file.fieldname === 'thumbnail_upload');
//             for (let file of thumbnailField) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 thumbnail.push(result.secure_url);
//             }

//             const filelField = req.files.filter(file => file.fieldname === 'file_upload');
//             for (let file of filelField) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 fileUpload.push(result.secure_url);
//             }

//             const videolField = req.files.filter(file => file.fieldname === 'video_upload');
//             for (let file of videolField) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 videUpload.push(result.secure_url);
//             }

//             const imageField = req.files.filter(file => file.fieldname === 'image_file');
//             for (let file of imageField) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 images.push(result.secure_url);
//             }

//             // Process PDF files
//             const pdfField = req.files.filter(file => file.fieldname === 'pdf_file');
//             for (let file of pdfField) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 pdfFile.push(result.secure_url);
//             }

//             // Process Word files
//             const wordField = req.files.filter(file => file.fieldname === 'word_file');
//             for (let file of wordField) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 wordFile.push(result.secure_url);
//             }
//         }

//         // Create a new course instance with sections and files
//         const add_course_creation = new Course({
//             course_title_main,
//             add_main_category,
//             add_sub_category,
//             creation_date,
//             description,
//             course_price,
//             course_code,
//             sections,
//             thumbnail_upload: thumbnail,
//             file_upload: fileUpload,
//             video_upload: videUpload,
//             image_file: images,
//             pdf_file: pdfFile,
//             word_file: wordFile,
//         });

//         // Save the course data to the database
//         const resp = await add_course_creation.save();
//         res.status(200).send({ message: "Course data saved", course_data: resp });
//     } catch (error) {
//         console.error("Error in post_course_creation:", error);
//         res.status(500).send({ message: "An error occurred", error: error.message });
//     }
// };
