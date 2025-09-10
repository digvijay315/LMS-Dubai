import Sidebar from "./Sidebar";
import Header from "./Header";
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
import { base_url } from "./Utils/base_url";
import { useState, useEffect,useRef } from "react";
import Swal from 'sweetalert2';
import SellIcon from '@mui/icons-material/Sell';
import PPTPreview from "./PPTPreview";
import Lottie from "lottie-react";
import '../StyleCode/Attendence.css'



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



function CreateNewCourse() {

  const[isloading,setisloading]=useState(false)

  const [course, setCourse] = useState({
    course_title_main: "",
    course_code: "",
    course_duration:"",
    add_main_category: "",
    add_sub_category: "",
    add_tag: "",
    creation_date: "",
    description: "",
    course_price: "",
    sections: [],
    thumbnail_upload: [],
    file_upload: [],
    video_upload: [],
    image_file: [],
    pdf_file: [],
    word_file: [],
  });

  // State for new section and chapter
  const [newSection, setNewSection] = useState({
    section_title: "",
    add_Content: [],
  });

  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [wordPreviews, setWordPreviews] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pptFiles, setPPTFiles] = useState([]);

  const [thumbnail, setThumbnail] = useState([]);
  const [fileUpload, setFileUpload] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const [chapter, setChapter] = useState({
    chapter_title: "",
    chapter_description: "",
    youtube_link: "",
    video_file: [],
    ppt_file: [],
  });

  const handlePdfFile = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        pdf_file: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPdfPreviews(previews);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        file_upload: files
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setFileUpload(previews)
  };

  const handleWordFile = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        word_file: files,
    }));
    const previews = files.map((file) => file.name);
    setWordPreviews(previews);
  };

  const handledocumentpicchange = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        image_file: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handledthumbnailUpload = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        thumbnail_upload: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setThumbnail(previews);
  };

  // Handle video file upload
  const handleVideo = (event) => {
    const files = Array.from(event.target.files);
    setChapter({ ...chapter, video_file: files });
    setVideoPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handlePPTFile = (event) => {
    const files = Array.from(event.target.files);
    setChapter({ ...chapter, ppt_file: files });
    setPPTFiles(files.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    return () => {
      pdfPreviews.forEach((url) => URL.revokeObjectURL(url));
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      videoPreviews.forEach((url) => URL.revokeObjectURL(url));
      thumbnail.forEach((url) => URL.revokeObjectURL(url));
      fileUpload.forEach((url) => URL.revokeObjectURL(url));
      pptFiles.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pdfPreviews, imagePreviews, videoPreviews, thumbnail, fileUpload, pptFiles]);

  // Adding Chapter to Section
  const addChapter = () => {
    if (chapter.chapter_title && chapter.chapter_description) {
      const updatedContent = [...newSection.add_Content, chapter];

      setNewSection({ ...newSection, add_Content: updatedContent });

      setChapter({
        chapter_title: "",
        chapter_description: "",
        youtube_link: "",
        video_file: [],
        ppt_file: [],
      });

      setVideoPreviews([]);
      setPPTFiles([]);
      toast.success("Chapter added successfully!");
    } else {
      Swal.fire("Error", "Please fill out all fields for the chapter.", "error");
    }
  };

  // Adding Section to Course
  const addSection = () => {
    if (newSection.section_title && newSection.add_Content.length > 0) {
      const updatedSections = [...course.sections, newSection];
      setCourse({ ...course, sections: updatedSections });

      setNewSection({ section_title: "", add_Content: [] });
      toast.success("Section added successfully!");
    } else {
      Swal.fire("Error", "Please fill section title and add chapters.", "error");
    }
  };

  const deleteChapter = (index) => {
    const updatedChapters = newSection.add_Content.filter((_, i) => i !== index);
    setNewSection({ ...newSection, add_Content: updatedChapters });
    toast.success('Chapter deleted successfully!', { autoClose: 1000 });
  };

  const deleteSection = (index) => {
    const updatedSections = course.sections.filter((_, i) => i !== index);
    setCourse({ ...course, sections: updatedSections });
    toast.success('Section deleted successfully!', { autoClose: 1000 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validation
    const errors = [];
    
    // Validate course title
    if (!course.course_title_main || course.course_title_main.trim() === "") {
      errors.push("Course title is required");
    }
    
    // Validate that at least one section exists
    if (!course.sections || course.sections.length === 0) {
      errors.push("At least one section is required");
    } else {
      // Validate each section
      course.sections.forEach((section, secIndex) => {
        if (!section.section_title || section.section_title.trim() === "") {
          errors.push(`Section ${secIndex + 1} title is required`);
        }
        
        // Validate that section has at least one chapter
        if (!section.add_Content || section.add_Content.length === 0) {
          errors.push(`Section ${secIndex + 1} must have at least one chapter`);
        } else {
          // Validate each chapter
          section.add_Content.forEach((chapter, chapIndex) => {
            if (!chapter.chapter_title || chapter.chapter_title.trim() === "") {
              errors.push(`Chapter ${chapIndex + 1} in Section ${secIndex + 1} must have a title`);
            }
            
            // // Optional: Validate that chapter has either a YouTube link or video file
            // const hasVideo = chapter.youtube_link || (chapter.video_file && chapter.video_file.length > 0);
            // if (!hasVideo) {
            //   errors.push(`Chapter ${chapIndex + 1} in Section ${secIndex + 1} needs either a YouTube link or video file`);
            // }
          });
        }
      });
    }
    
    // Check if there are any validation errors
    if (errors.length > 0) {
      // Display all validation errors to the user
      Swal.fire({
        title: "Validation Error",
        html: errors.join("<br>"),
        icon: "error"
      });
      return; // Stop submission
    }
    
    try {
      setisloading(true)
      const formData = new FormData();
      formData.append("course_title_main", course.course_title_main);
      formData.append("course_code", course.course_code);
      formData.append("course_duration", course.course_duration);
      formData.append("add_main_category", course.add_main_category);
      formData.append("add_sub_category", course.add_sub_category);
      formData.append("add_tag", course.add_tag);
      formData.append("creation_date", course.creation_date);
      formData.append("description", course.description);
      formData.append("course_price", course.course_price);
    
  
      // Append sections and their chapters
      course.sections.forEach((section, secIndex) => {
        formData.append(`sections[${secIndex}].section_title`, section.section_title);
        section.add_Content.forEach((chapter, chapIndex) => {
          formData.append(`sections[${secIndex}].add_Content[${chapIndex}].chapter_title`, chapter.chapter_title);
          formData.append(`sections[${secIndex}].add_Content[${chapIndex}].chapter_description`, chapter.chapter_description);
          formData.append(`sections[${secIndex}].add_Content[${chapIndex}].youtube_link`, chapter.youtube_link);
          
          if (chapter.video_file && chapter.video_file.length > 0) {
            chapter.video_file.forEach((file) => {
              formData.append(`sections[${secIndex}].add_Content[${chapIndex}].video_file`, file);
            });
          }
          
          if (chapter.ppt_file && chapter.ppt_file.length > 0) {
            chapter.ppt_file.forEach((file) => {
              formData.append(`sections[${secIndex}].add_Content[${chapIndex}].ppt_file`, file);
            });
          }
        });
      });
  
      // Append files - validate that arrays exist before iterating
      ["thumbnail_upload", "file_upload", "image_file", "pdf_file", "word_file"].forEach((field) => {
        if (course[field] && course[field].length > 0) {
          course[field].forEach((file) => formData.append(field, file));
        }
      });
  
      const response = await axios.post(`${base_url}/add_course_details`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      Swal.fire("Success", "Course created successfully!", "success");
      
      // Reset all state
      setPdfPreviews([]);
      setImagePreviews([]);
      setWordPreviews([]);
      setVideoPreviews([]);
      setPPTFiles([]);
      setThumbnail([]);
      setFileUpload([]);
      
      setCourse({
        course_title_main: "",
        add_main_category: "",
        add_sub_category: "",
        add_tag: "",
        creation_date: "",
        description: "",
        course_price: "",
        course_code: "",
        sections: [],
        thumbnail_upload: [],
        file_upload: [],
        video_upload: [],
        image_file: [],
        pdf_file: [],
        word_file: [],
      });
  
    } catch (error) {
      toast.error("Error saving course details");
      console.error(error);
    }finally
    {
      setisloading(false)
    }
  };

  function addLessons() {
    document.getElementById("add-lesson-div").style.display = "block"
  }

  const[colorchange,setcolorchange]=useState("basic")
  function BasicContainer() {
    setcolorchange("basic")
    document.getElementById("customize-course").style.display = "block";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("add-assesment-category").style.display = "none";
    document.getElementById("finish_div").style.display = "none";
    
  }

  function MediaContainer() {
    setcolorchange("media")
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "block"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("add-assesment-category").style.display = "none";
    document.getElementById("finish_div").style.display = "none";
  }

  function DocumentContainer() {
    setcolorchange("document")
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "block";
    document.getElementById("add-assesment-category").style.display = "none";
    document.getElementById("finish_div").style.display = "none";
  }

  function AssesmentContainer() {
    setcolorchange("assesement")
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("add-assesment-category").style.display = "block";
    document.getElementById("finish_div").style.display = "none";
  }

  function FinishContainer() {
    setcolorchange("finish")
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("add-assesment-category").style.display = "none";
    document.getElementById("finish_div").style.display = "block";
  }


    const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);


    const handleDurationInput = (e) => {
    let input = e.target.value.replace(/\D/g, "").slice(0, 6); // Only digits, max 6

    let formatted = "";
    for (let i = 0; i < input.length; i++) {
      formatted += input[i];
      if (i === 1 || i === 3) {
        formatted += ":";
      }
    }

    setCourse({ ...course, course_duration: formatted });
  };


// =====================================assign assessment code start==================================================================


  function CustomSelect({ 
      label, 
      options, 
      value, 
      onSelect, 
      searchQuery, 
      onSearchChange, 
      placeholder, 
      renderOption 
    }) {
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef(null);
      const searchInputRef = useRef(null);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
    
      const handleSearchClick = (e) => {
        e.stopPropagation();
        // Don't close the dropdown when clicking the search input
        if (!isOpen) {
          setIsOpen(true);
        }
      };
    
      const handleContainerClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen && searchInputRef.current) {
          // Focus the search input when opening the dropdown
          setTimeout(() => {
            searchInputRef.current.focus();
          }, 0);
        }
      };
    
      return (
        <div className="custom-select-container" ref={dropdownRef}>
          <label className="label">{label}</label>
          <div 
            className="select-input-container" 
            onClick={handleContainerClick}
          >
            <div className="selected-value">
              {value ? renderOption(value) : placeholder}
            </div>
            <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </div>
          
          {isOpen && (
            <div className="dropdown-container" onClick={e => e.stopPropagation()}>
              <div className="search-container">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={onSearchChange}
                  onClick={handleSearchClick}
                  placeholder="Search..."
                  className="dropdown-search"
                />
              </div>
              <div className="options-container">
                {options.length > 0 ? (
                  options.map((option) => (
                    <div
                      key={option._id}
                      className="option"
                      onClick={() => {
                        onSelect(option);
                        setIsOpen(false);
                      }}
                    >
                      {renderOption(option)}
                    </div>
                  ))
                ) : (
                  <div className="no-options">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
  }

  const [assessment, setAssessment] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [searchAssessmentQuery, setSearchAssessmentQuery] = useState('');

  const fetchAssessmentData = async () => {
    try {
        const response = await axios.get(`${base_url}/assessment_data_fetch`);
        console.log(response);
        setAssessment(response.data.assessments);
    } catch (error) {
        console.log(error);
    }
  }

    useEffect(() =>{
        fetchAssessmentData();
    }, []);

  const filteredAssessments = assessment?.filter(assessment => 
    assessment.assessment_title.toLowerCase().includes(searchAssessmentQuery.toLowerCase()) ||
    assessment.code.toLowerCase().includes(searchAssessmentQuery.toLowerCase())
  ) || [];

  const handleAssessmentSearch = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setSearchAssessmentQuery(e.target.value);
  };

// ======================================assign assement code end========================================================================

  return (
    <div>

<style>
{`
 body{
    background-color: rgba(46, 7, 63, 0.1);
    padding: 1.5rem;
    }
.customize-course{
background-color: #ffffff;
padding: 2rem;
border-radius: 10px;
}
.info-div-items{
margin: 1rem 0;
}
.info-div-items .input{
width: 100%;
outline-color: #7A1CAC;
}
.course-info-section, .lessons-section{
display: flex;
justify-content: space-between;
}
.addcourse-div, .create-lessons{
width: 49%;
}
.inputs-items{
padding: 1.5rem;
border: 2px solid rgba(0,0,0,0.2);
border-radius: 10px;
}
.lessons-section{
border: 2px solid rgba(0,0,0,0.2);
padding: 1.5rem;
border-radius: 10px;
}
.upload-video{
border: 1px solid rgba(0,0,0,0.2);
padding: 2.2rem 1rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 3px;
}
.upload-video svg{
height: 3rem;
width: 4rem;
}
.upload-video-btn{
background-color: #ffffff;
color: blue;
box-shadow: none;
}
.add-lessons{
margin-top: 2rem;
display: none;
}
button{
background-color: #7A1CAC;
padding: 10px 1rem;
}
button:hover{
background-color: #2E073F;
}
.add-new-category{
display: none; 
}
.addStyle{
background-color: #7A1CAC;
color: #ffffff;
}
.removeStyle{
background-color: #ffffff;
color: #000;
}
.added-chapter{
 // border: 1px solid #000;
padding: 1rem;
width: 70%;
border-radius: 10px;
margin-top: 1.5rem;
background-color: rgba(46, 7, 63, 0.2);
}
.chapter-item{
// border: 1px solid #000;
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 14px;
border-radius: 5px;
background-color: #fff;
margin: 10px 0px;
}
i{
margin-left: 14px;
cursor: pointer;
}
`}
</style>

      <Sidebar />

      <section className="main-content-section">
        <Header />

        <div
          className="header-div header-two"
          style={{ padding: "2rem", height: "8rem" }}
        >
          <div className="create-options-course">
            <div
              className="basic-option"
              style={{ backgroundColor:colorchange=="basic"? "#7A1CAC":"#f5f5f5", color: "black", borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",borderRight:"2px solid #7A1CAC" }}
              onClick={BasicContainer}
            >
              <h6>Basic</h6>
            </div>
            
            <div 
              className="media-option" 
              id="media-option-id" 
              onClick={MediaContainer}
              style={{ backgroundColor:colorchange=="media"? "#7A1CAC":"#f5f5f5",borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",  hover: { backgroundColor: "#7A1CAC", color: "white" } }}
            >
              <h6>
                Media <br />
                (.mp4, .mp3)
              </h6>
            </div>
           
            <div 
              className="document-option addStyle" 
              id="document-option-id" 
              onClick={DocumentContainer}
              style={{ backgroundColor:colorchange=="document"? "#7A1CAC":"#f5f5f5",borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",color:"black" }}
            >
              <h6>
                Document <br />
                (.pdf, .word, .jpg)
              </h6>
            </div>
              <div
              className="basic-option"
              style={{backgroundColor:colorchange=="assesement"? "#7A1CAC":"#f5f5f5", color: "black", borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",borderRight:"2px solid #7A1CAC"}}
              onClick={AssesmentContainer}
            >
              <h6>Assesment</h6>
            </div>
            
            <div 
              className="finish-div" 
              id="finish-div" 
              onClick={FinishContainer}
              style={{ backgroundColor:colorchange=="finish"? "#7A1CAC":"#f5f5f5",borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",borderRight:"2px solid #7A1CAC" }}
            >
              <h6>Finish</h6>     
            </div>
          </div>
        </div>

        <div className="customize-course" id="customize-course">
          <div className="course-info-section">
            <div className="addcourse-div" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h5 style={{ color: "#2E073F", marginBottom: "20px" }}> 
                  <span style={{ marginRight: "10px", color: "#7A1CAC" }}><DashboardCustomizeIcon/></span> 
                  Create your course
                </h5>
                <div className="inputs-items">
                  <div className="info-div-items">
                    <TextField
                      required
                      id="course_title_main"
                      name="course_title_main"
                      label="Course title"
                      value={course.course_title_main}
                      className="input"
                      onChange={(e) => setCourse({...course, course_title_main: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                   <div className="info-div-items">
                    <TextField
                      required
                      id="course_code"
                      name="course_code"
                      label="Course code"
                      value={course.course_code}
                      className="input"
                      onChange={(e) => setCourse({...course, course_code: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                <div className="info-div-items">
                <TextField
                  required
                  id="course_duration"
                  name="course_duration"
                  label="Course Duration"
                  value={course.course_duration}
                  className="input"
                  onChange={handleDurationInput}
                  placeholder="hh:mm:ss"
                  inputProps={{ maxLength: 8 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#7A1CAC" },
                    },
                  }}
                />
              </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="add_main_category"
                      name="add_main_category"
                      label="Add main category"
                      value={course.add_main_category}
                      className="input"
                      onChange={(e) => setCourse({...course, add_main_category: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="add_sub_category"
                      name="add_sub_category"
                      label="Add sub category"
                      value={course.add_sub_category}
                      className="input"
                      onChange={(e) => setCourse({...course, add_sub_category: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="add_tag"
                      name="add_tag"
                      label="Add Tag"
                      value={course.add_tag}
                      className="input"
                      onChange={(e) => setCourse({...course, add_tag: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <label style={{ display: "block", marginBottom: "8px", color: "#555" }}>Creation Date</label>
                    <input
                      type="date"
                      required
                      id="creation_date"
                      name="creation_date"
                      value={course.creation_date}
                      className="input"
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
                      onChange={(e) => setCourse({...course, creation_date: e.target.value})}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={course.description}
                      className="input"
                      onChange={(e) => setCourse({...course, description: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div> 
                </div>
            </div>

            <div className="addcourse-div" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", marginTop: "20px" }}>
              <div className="add-price-div" style={{marginBottom:"1rem"}}>
                <h6 style={{ color: "#2E073F" }}> 
                  <span style={{ marginRight: "10px", color: "#7A1CAC" }}><SellIcon/></span> 
                  Add price
                </h6>
                <div className="inputs-items">
                  <div className="info-div-items">
                    <TextField
                      required
                      id="course_price"
                      name="course_price"
                      label="Course price"
                      value={course.course_price}
                      className="input"
                      onChange={(e) => setCourse({...course, course_price: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                </div>
              </div>

              <div className="add-section-div">
                <h6 style={{ color: "#2E073F" }}> 
                  <span style={{ marginRight: "10px", color: "#7A1CAC" }}><DesignServicesIcon/></span> 
                  Add Section
                </h6>
                <div className="inputs-items">
                 
                  <div className="info-div-items">
                    <TextField
                      required
                      id="section_title"
                      name="section_title"
                      label="Course Section title"
                      value={newSection.section_title}
                      className="input"
                      onChange={(e) => setNewSection({ ...newSection, section_title: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <button 
                      onClick={addLessons}
                      style={{ 
                        backgroundColor: "#7A1CAC", 
                        color: "white", 
                        border: "none", 
                        padding: "10px 15px", 
                        borderRadius: "5px", 
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontWeight: "bold",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}
                    >
                      Add Chapters
                    </button>
                  </div>
                </div>
              </div>
            </div>            
          </div>

          {/* Display added sections */}
          {course.sections.length > 0 && (
            <div className="added-sections" style={{ 
              backgroundColor: "#fff", 
              padding: "20px", 
              borderRadius: "10px", 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h5 style={{ color: "#2E073F", marginBottom: "15px" }}>Added Sections</h5>
              {course.sections.map((section, index) => (
                <div key={index} style={{ 
                  border: "1px solid #e0e0e0", 
                  borderRadius: "8px", 
                  padding: "15px", 
                  marginBottom: "10px", 
                  backgroundColor: "#f9f9f9" 
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h6 style={{ margin: 0, color: "#2E073F" }}>{section.section_title}</h6>
                    <button 
                      onClick={() => deleteSection(index)}
                      style={{ 
                        backgroundColor: "#ff5c5c", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        padding: "5px 10px", 
                        display: "flex", 
                        alignItems: "center", 
                        cursor: "pointer" 
                      }}
                    >
                      <DeleteIcon style={{ fontSize: "16px", marginRight: "5px" }} /> Remove
                    </button>
                  </div>
                  <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
                    {section.add_Content.length} chapter(s)
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="add-lessons" id="add-lesson-div" style={{ 
            display: "none", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
            marginTop: "20px" 
          }}>
            <h5 style={{ color: "#2E073F", marginBottom: "15px" }}> 
              <span style={{ marginRight: "10px", color: "#7A1CAC" }}><AddCircleIcon /></span> 
              Add Chapters
            </h5>
            <div className="lessons-section" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="create-lessons" style={{ display: "flex", flexDirection: "column", gap: "15px", width:"100%" }}>
                <div className="info-div-items">
                  <TextField
                    required
                    id="chapter_title"
                    name="chapter_title"
                    label="Section Chapter title"
                    className="input"
                    fullWidth
                    value={chapter.chapter_title}
                    onChange={(e) => setChapter({ ...chapter, chapter_title: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                  />
                </div>
                <div className="info-div-items">
                  <TextField
                    required
                    id="chapter_description"
                    name="chapter_description"
                    label="Chapter description"
                    className="input"
                    fullWidth
                    multiline
                    rows={4}
                    value={chapter.chapter_description}
                    onChange={(e) => setChapter({ ...chapter, chapter_description: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                  />
                </div>
                <div className="info-div-items">
                  <TextField
                    id="youtube_link"
                    label="Youtube Video Link"
                    name="youtube_link"
                    className="input"
                    fullWidth
                    value={chapter.youtube_link}
                    onChange={(e) => setChapter({ ...chapter, youtube_link: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                  />  
                </div>
              </div>

              <div className="create-lessons" style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "20px", width: "100%" }}>
                <div className="info-div-items upload-video" style={{ flex: 1, border: "1px dashed #ccc", padding: "20px", borderRadius: "8px", width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CloudUploadIcon style={{ fontSize: "40px", color: "#7A1CAC", marginBottom: "10px" }} />
                    <Button
                      component="label"
                      variant="contained"
                      className="upload-video-btn"
                      style={{ marginBottom: "10px" }}
                    >
                      Choose video files
                      <VisuallyHiddenInput
                        type="file"
                        name="video_file"
                        accept="video/*"
                        multiple
                        onChange={handleVideo}
                        id="video_file"
                      />
                    </Button>
                    <p style={{ fontSize: "12px", color: "#666" }}>Video (512GB)</p>
                  </div>
                  {videoPreviews.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
                      {videoPreviews.map((preview, index) => (
                        <video key={index} src={preview} controls className="video-preview" style={{width:"200px", height:"100px", borderRadius: "5px"}}>
                          Your browser does not support the video tag.
                        </video>
                      ))}
                    </div>
                  )}
                </div>
                <div className="info-div-items" style={{
                  flex: 1, 
                  border:"1px dashed #ccc", 
                  padding:"20px", 
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <p style={{fontSize:"14px", fontWeight:"600", color: "#2E073F", marginBottom: "15px"}}>Upload PPT</p>
                  <input 
                    type="file" 
                    name="ppt_file" 
                    accept=".ppt,.pptx" 
                    onChange={handlePPTFile} 
                    multiple 
                    style={{ marginBottom: "15px" }}
                  />
                  {pptFiles.length > 0 && (
                    <div style={{ marginTop: "10px" }}>
                      <p style={{ fontSize: "14px", color: "#666" }}>Selected PPT Files: {pptFiles.length}</p>
                      <PPTPreview files={pptFiles} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              <div className="upload-btn-div">
                <button 
                  onClick={addChapter}
                  style={{ 
                    backgroundColor: "#7A1CAC", 
                    color: "white", 
                    border: "none", 
                    padding: "10px 20px", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <AddCircleIcon fontSize="small" /> Upload Chapter
                </button>
              </div>
              <div className="upload-btn-div">
                <button 
                  onClick={addSection}
                  style={{ 
                    backgroundColor: "#2E073F", 
                    color: "white", 
                    border: "none", 
                    padding: "10px 20px", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Add Section
                </button>
              </div>
            </div>

            <div className="added-chapter" style={{ marginTop: "25px", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "15px" }}>
              <h6 style={{ color: "#2E073F", marginBottom: "15px" }}>Current Section Chapters</h6>
              {newSection.add_Content && newSection.add_Content.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {newSection.add_Content.map((chap, index) => (
                    <div key={index} className="chapter-item" style={{ 
                      backgroundColor: "#f5f5f5", 
                      padding: "15px", 
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid #e0e0e0"
                    }}>
                      <div>
                      <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#2E073F" }}>
                          {chap.chapter_title}
                        </p>
                        <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                          {chap.chapter_description.length > 100 
                            ? `${chap.chapter_description.substring(0, 100)}...` 
                            : chap.chapter_description}
                        </p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "8px", fontSize: "12px" }}>
                          {chap.video_file.length > 0 && (
                            <span style={{ color: "#7A1CAC", display: "flex", alignItems: "center", gap: "3px" }}>
                              <i className="fa-solid fa-video"></i> {chap.video_file.length} video(s)
                            </span>
                          )}
                          {chap.ppt_file.length > 0 && (
                            <span style={{ color: "#7A1CAC", display: "flex", alignItems: "center", gap: "3px" }}>
                              <i className="fa-solid fa-file-powerpoint"></i> {chap.ppt_file.length} presentation(s)
                            </span>
                          )}
                          {chap.youtube_link && (
                            <span style={{ color: "#7A1CAC", display: "flex", alignItems: "center", gap: "3px" }}>
                              <i className="fa-brands fa-youtube"></i> YouTube link
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteChapter(index)} 
                        style={{ 
                          backgroundColor: "#ff5c5c", 
                          color: "white", 
                          border: "none", 
                          borderRadius: "5px", 
                          padding: "5px 10px", 
                          display: "flex", 
                          alignItems: "center", 
                          cursor: "pointer" 
                        }}
                      >
                        <DeleteIcon style={{ fontSize: "16px", marginRight: "5px" }} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#666", fontStyle: "italic" }}>No chapters added yet. Add chapters to complete your section.</p>
              )}
            </div>
          </div>

          {/* <div className='content-div' style={{ marginTop: "2rem" }}>
            <button 
              id='next-btn' 
              style={{ 
                height: "3rem", 
                backgroundColor: "#7A1CAC", 
                color: "white", 
                border: "none", 
                padding: "0 20px", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }} 
              onClick={MediaContainer}
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div> */}
        </div>

        <div className='add-new-category' id="add-new-category" style={{ display: "none" }}>
          <div className='adding-course-div' style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}> 
            <h5 style={{ color: "#2E073F", marginBottom: "1.5rem" }}>Add media files</h5>
            <div className='upload-options' style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-image" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Thumbnail
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input 
                    type="file" 
                    id='thumbnail_upload' 
                    name="thumbnail_upload" 
                    onChange={handledthumbnailUpload} 
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
                  />
                  {thumbnail.map((preview, index) => (
                    <div key={index} style={{ position: "relative", marginTop: "10px" }}>
                      <img
                        src={preview}
                        alt={`thumbnail-preview-${index}`}
                        style={{ 
                          width: "100%", 
                          height: "auto", 
                          borderRadius: "5px",
                          border: "1px solid #e0e0e0"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Main course file
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input 
                    type="file" 
                    name='file_upload' 
                    onChange={handleFileUpload} 
                    accept="application/pdf"
                    style={{ marginBottom: "10px" }}
                  />
                  {fileUpload.map((preview, index) => (
                    <iframe
                      key={index}
                      src={preview}
                      title={`pdf-preview-${index}`}
                      style={{ 
                        width: "100%", 
                        height: "200px", 
                        marginTop: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "5px"
                      }}
                    ></iframe>
                  ))}
                </div>
              </div>
              {/* <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-video" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Upload video
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input 
                    type="file" 
                    id='video_upload' 
                    name='video_upload'
                    accept="video/*"
                    style={{ marginBottom: "10px" }}
                  />
                  <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                    Select video files for the main course
                  </p>
                </div>
              </div> */}
            </div>
                 
            {/* <div className='content-div' style={{ marginTop: "2rem", display: "flex", gap: "15px" }}>
              <button 
                id='previous-btn' 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={BasicContainer}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button 
                id='next-btn' 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#7A1CAC", 
                  color: "white", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={DocumentContainer}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div> */}
          </div>
        </div>

        <div className="add-new-category" id="add-document-category" style={{ display: "none" }}>
          <div className="adding-course-div" style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}>
            <h5 style={{ color: "#2E073F", marginBottom: "1.5rem" }}>Add Document Files</h5>
            <div className="upload-options" style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
              {/* PDF Upload */}
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  PDF File
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input
                    type="file"
                    name="pdf_file"
                    onChange={handlePdfFile}
                    accept="application/pdf"
                    style={{ marginBottom: "10px" }}
                  />
                  {pdfPreviews.map((preview, index) => (
                    <iframe
                      key={index}
                      src={preview}
                      title={`pdf-preview-${index}`}
                      style={{ 
                        width: "100%", 
                        height: "200px", 
                        marginTop: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "5px"
                      }}
                    ></iframe>
                  ))}
                </div>
              </div>

              {/* Word Upload */}
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-file-word" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Word File
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input
                    type="file"
                    name="word_file"
                    onChange={handleWordFile}
                    accept=".doc,.docx"
                    style={{ marginBottom: "10px" }}
                  />
                  {wordPreviews.length > 0 && (
                    <div style={{ 
                      marginTop: "15px", 
                      padding: "10px", 
                      border: "1px solid #e0e0e0", 
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5"
                    }}>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "8px" }}>
                        Uploaded Word Files:
                      </p>
                      {wordPreviews.map((preview, index) => (
                        <p
                          key={index}
                          style={{
                            fontSize: "13px",
                            margin: "5px 0",
                            padding: "5px",
                            backgroundColor: "#fff",
                            borderRadius: "3px",
                            border: "1px solid #e0e0e0",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <i className="fa-solid fa-file-word" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                          {preview}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-image" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  JPG File
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input
                    type="file"
                    name="image_file"
                    onChange={handledocumentpicchange}
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`img-preview-${index}`}
                        style={{ 
                          width: "100px", 
                          height: "100px", 
                          objectFit: "cover",
                          borderRadius: "5px",
                          border: "1px solid #e0e0e0"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="content-div" style={{ marginTop: "2rem", display: "flex", gap: "15px" }}>
              <button 
                id="previous-btn" 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={MediaContainer}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button 
                id="next-btn" 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#7A1CAC", 
                  color: "white", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={FinishContainer}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div> */}
          </div>
        </div>
{/* =========================================assign assesement code start======================================================== */}
          <div className="add-new-category" id="add-assesment-category" style={{ display: "none" }}>
          <div className="adding-course-div" style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}>
            <h5 style={{ color: "#2E073F", marginBottom: "1.5rem" }}>Assign Assesment</h5>
            <div className="upload-options" style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            
              <div className="assign-assessment">
              <div className="assessment-title">
                <div style={{display:"flex",gap:"10rem"}}>
                <div className="select-wrapper" > 
                                  {/* <CustomSelect
                                      label="Select Assessment"
                                      options={filteredAssessments}
                                      value={selectedAssessment}
                                      onSelect={setSelectedAssessment}
                                      searchQuery={searchAssessmentQuery}
                                      onSearchChange={handleAssessmentSearch}
                                      placeholder="Select a Assessment"
                                      renderOption={(assessment) => `${assessment.assessment_title} (${assessment.code})`}
                                  />

                                  {selectedAssessment && (
                                      <div className="details-card">
                                      <h5 className="details-title">Selected Assessment Details</h5>
                                      <p className="details-text">Title: {selectedAssessment.assessment_title}</p>
                                      <p className="details-text">Code: {selectedAssessment.code}</p>
                                      </div>
                                  )} */}
                                <select
                                style={{
                                  width: "300px",
                                  padding: "10px 40px 10px 12px",
                                  borderRadius: "6px",
                                  border: "1px solid #ccc",
                                  backgroundColor: "#fff",
                                  fontSize: "16px",
                                  color: "#333",
                                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "right 12px center",
                                  backgroundSize: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <option disabled selected>
                                  --- Select Assessment ---
                                </option>

                                {assessment?.map((item, index) => (
                                  <option key={index} value={item.code}>
                                    {item.assessment_title} - {item.code}
                                  </option>
                                ))}
                              </select>

                </div> 

                 <div className="select-wrapper" > 
                                 
                                <select
                                style={{
                                  width: "300px",
                                  padding: "10px 40px 10px 12px",
                                  borderRadius: "6px",
                                  border: "1px solid #ccc",
                                  backgroundColor: "#fff",
                                  fontSize: "16px",
                                  color: "#333",
                                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "right 12px center",
                                  backgroundSize: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <option disabled selected>
                                  --- Select Certificate ---
                                </option>

                               <option>certificate 1</option>
                               <option>certificate 2</option>
                               <option>certificate 3</option>
                              </select>

                </div> 
                </div>

                <div class="assessment-settings">

<div>
  <label>Complete the  assessment by</label>
  <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
    {Array.from({ length: 12 }, (_, i) => {
      const days = (i + 1) * 5;
      return (
        <option key={days} value={days}>
          {days} days
        </option>
      );
    })}
  </select>
</div>






                    <div>
                        <label>Attempt limitation</label>
                        <input type="number" placeholder="Enter limitation" />
                    </div>
                    <div>
                        <label>Set passing score</label>
                        <input type="number" placeholder="Enter passing score"/>
                    </div>     
                </div> 
                {/* <button className="assign-assessment-btn" >Assign Assessment</button>      */}
              </div>
            </div>
           

             
            </div>

  {/* ==========================================assign assesement code end===================================================== */}

            {/* <div className="content-div" style={{ marginTop: "2rem", display: "flex", gap: "15px" }}>
              <button 
                id="previous-btn" 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={MediaContainer}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button 
                id="next-btn" 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#7A1CAC", 
                  color: "white", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={FinishContainer}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div> */}
          </div>
        </div>

        <div className="add-new-category" id="finish_div" style={{ display: "none" }}>
          <div className='adding-course-div' style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "30px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}> 
            <h4 style={{ color: "#2E073F", marginBottom: "20px" }}>Course Summary</h4>
            
            {course.course_title_main && (
              <div style={{ 
                marginBottom: "25px", 
                backgroundColor: "#f9f9f9", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0"
              }}>
                <h5 style={{ color: "#7A1CAC", marginBottom: "15px" }}>Course Details</h5>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ 
                    flex: "1 1 300px", 
                    padding: "10px", 
                    backgroundColor: "#fff", 
                    borderRadius: "5px", 
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Title</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#2E073F" }}>{course.course_title_main}</p>
                  </div>
                  
                  <div style={{ 
                    flex: "1 1 300px", 
                    padding: "10px", 
                    backgroundColor: "#fff", 
                    borderRadius: "5px", 
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Price</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#2E073F" }}>{course.course_price}</p>
                  </div>
                  
                  <div style={{ 
                    flex: "1 1 300px", 
                    padding: "10px", 
                    backgroundColor: "#fff", 
                    borderRadius: "5px", 
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Category</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#2E073F" }}>{course.add_main_category} / {course.add_sub_category}</p>
                  </div>
                </div>
              </div>
            )}
            
            {course.sections.length > 0 && (
              <div style={{ 
                marginBottom: "25px", 
                backgroundColor: "#f9f9f9", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                textAlign: "left"
              }}>
                <h5 style={{ color: "#7A1CAC", marginBottom: "15px" }}>Course Structure</h5>
                <p style={{ color: "#2E073F", fontWeight: "bold" }}>{course.sections.length} section(s) created</p>
                
                <div style={{ marginTop: "10px" }}>
                  {course.sections.map((section, index) => (
                    <div key={index} style={{ 
                      backgroundColor: "#fff", 
                      padding: "15px", 
                      borderRadius: "5px", 
                      marginBottom: "10px",
                      border: "1px solid #e0e0e0"
                    }}>
                      <h6 style={{ color: "#2E073F", margin: "0 0 10px 0" }}>
                        Section {index + 1}: {section.section_title}
                      </h6>
                      <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
                        {section.add_Content.length} chapter(s)
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={handleSubmit}
              style={{ 
                backgroundColor: "#7A1CAC", 
                color: "white", 
                border: "none", 
                padding: "15px 30px", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                marginBottom: "20px"
              }}
            > 
              <UploadIcon /> Upload Course
            </button>

            {/* <div className='content-div' style={{ marginTop: "1rem" }}>
              <button 
                id='previous-btn' 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={DocumentContainer}
              > 
                <i className="fa-solid fa-arrow-left"></i> Previous 
              </button>
            </div> */}
          </div>
        </div>
      </section>

   <>
      {isloading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          // background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}>
          <div style={{
            // backgroundColor: "rgba(0,0,0,0.75)",
            padding: "40px 60px",
            borderRadius: "20px",
            // boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
          }}>
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ height: '120px', width: '120px', marginBottom: '20px' }}
            />
            <div style={{ fontSize: "18px", fontWeight: 500 }}>
              Creating Course...
            </div>
          </div>
        </div>
      )}
    </>

    </div>
  );
}

export default CreateNewCourse;


