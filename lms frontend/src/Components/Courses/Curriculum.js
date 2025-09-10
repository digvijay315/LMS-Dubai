"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"//Added Naviagte here
import { base_url } from "../Utils/base_url"
import axios from "axios"
import ReactPlayer from "react-player"
import "../Courses/curiculam.css"
import PptSlides from "../Pptslides"
import { Assessment } from "@mui/icons-material"

const Curriculum = () => {
  const [curriculum, setCurriculum] = useState(null)
  const navigate = useNavigate();

   const [assessment, setAssessment] = useState([]);
  

  const location = useLocation()
  const { course } = location.state || {}



  const [activeLesson, setActiveLesson] = useState(null)
  const [showCurriculum, setShowCurriculum] = useState(true)
  const [activeMediaType, setActiveMediaType] = useState("video")
  const [activePptUrl, setActivePptUrl] = useState(null)
  const [pptViewerType, setPptViewerType] = useState("office") // 'office', 'google', 'iframe'
  const [pptError, setPptError] = useState(null)
  const [pptLoading, setPptLoading] = useState(false)
  const reactPlayerRef = useRef(null)


  //Add attempt count and score state
  const [attemptCount, setAttemptCount] = useState(curriculum?.attempt_count || 0);
  // const [attemptCount, setAttemptCount] = useState(0);
  // const attemptLimit = course?.assesment_limitation;
  const [userScore, setUserScore] = useState(null);// Will store score after test
  const [totalScore, setTotalScore] = useState(null);
  const [timeSpent, setTimeSpent] = useState(null);
  // const [assessmentCompleted, setAssessmentCompleted] = useState(false);


  // Get current logged-in user from localStorage or session
  const [currentUser, setCurrentUser] = useState(null)

  // New state for completion tracking (now user-specific)
  const [completedLessons, setCompletedLessons] = useState(new Set())
  const [currentLessonProgress, setCurrentLessonProgress] = useState({
    videoWatched: false,
    youtubeWatched: false,
    pptViewed: false,
    descriptionRead: false,
  })

  // YouTube/Video player state (unified)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoEnoughWatched, setVideoEnoughWatched] = useState(false)

  // Video resume state
  const [videoPositions, setVideoPositions] = useState({})
  const [savedProgress, setSavedProgress] = useState({})

  // New state for download materials
  const [showDownloadSection, setShowDownloadSection] = useState(false)

  // Get current user from localStorage or session
  useEffect(() => {
    const userData = localStorage.getItem("employeeData")

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  // User-specific key generator for localStorage
  const getUserSpecificKey = (baseKey) => {
    if (!currentUser || !currentUser._id) return baseKey
    return `user_${currentUser._id}_${baseKey}`
  }

  //fetch the curriculum, And the API returns the score
  useEffect(() => {
  const fetchCurriculum = async () => {
    try {
      const response = await axios.get(`${base_url}your-endpoint`, {
        params: {
          course_id: course?.id,
          user_id: currentUser?.id,
        },
      });

      if (response.data) {
        setCurriculum(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch curriculum", error);
    }
  };
  if (course && currentUser) {
    fetchCurriculum();
  }
  }, [course, currentUser]);
  

  const fetchCurriculum = async (courseId) => {
    if (!courseId) {
      console.error("No Course ID provided")
      return
    }
    try {
      const response = await axios.get(`${base_url}/view_Course/${courseId}`)
      const courseData = response.data.data

      if (!courseData || !courseData.sections) {
        console.error("Invalid course data structure")
        return
      }
      setCurriculum(courseData)

      if (currentUser && currentUser._id) {
        loadUserProgress(currentUser._id, courseId)
      }
    } catch (error) {
      console.error("Error fetching curriculum:", error)
    }
  }

   useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        const response = await axios.get(`${base_url}/assessment_data_fetch`);
        console.log(response);
        setAssessment(
          response.data.assessments.filter(
            (item) => item.code === curriculum.course_assesment
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssessmentData();
  }, [curriculum]);

  console.log(assessment);
  
  // Load user progress from localStorage
  const loadUserProgress = (userId, courseId) => {
    const completionsKey = getUserSpecificKey(`course_${courseId}_completions`)
    const savedCompletions = localStorage.getItem(completionsKey)

    if (savedCompletions) {
      setCompletedLessons(new Set(JSON.parse(savedCompletions)))
    } else {
      setCompletedLessons(new Set())
    }
  }

  useEffect(() => {
    if (course?._id && currentUser?._id) {
      fetchCurriculum(course._id)
    }
  }, [course, currentUser])

  // Get flat list of all lessons with their indices
  const getFlatLessons = () => {
    if (!curriculum?.sections) return []

    const flatLessons = []
    curriculum.sections.forEach((section, sectionIndex) => {
      section.add_Content.forEach((chapter, chapterIndex) => {
        flatLessons.push({
          id: `${sectionIndex}-${chapterIndex}`,
          title: chapter.chapter_title,
          content: chapter.chapter_description,
          sectionTitle: section.section_title,
          videoUrl: chapter.video_file?.[0],
          youtubeLink: chapter.youtube_link,
          pptFiles: chapter.ppt_file,
          sectionIndex,
          chapterIndex,
        })
      })
    })
    return flatLessons
  }

  // Check if all lessons are completed
  const areAllLessonsCompleted = () => {
    const flatLessons = getFlatLessons()
    return flatLessons.length > 0 && flatLessons.every((lesson) => completedLessons.has(lesson.id))
  }

  // Get all downloadable materials from curriculum
  const getDownloadableMaterials = () => {
    if (!curriculum) return { wordFiles: [], pdfFiles: [], imageFiles: [] }

    const materials = {
      wordFiles: [],
      pdfFiles: [],
      imageFiles: [],
    }

    if (curriculum.word_file && Array.isArray(curriculum.word_file)) {
      curriculum.word_file.forEach((file, fileIndex) => {
        materials.wordFiles.push({
          url: file,
          name: `${curriculum.course_title_main || "Course"} - Word Document ${fileIndex + 1}`,
          sectionTitle: curriculum.course_title_main || "Course Materials",
          chapterTitle: `Document ${fileIndex + 1}`,
        })
      })
    }

    if (curriculum.pdf_file && Array.isArray(curriculum.pdf_file)) {
      curriculum.pdf_file.forEach((file, fileIndex) => {
        materials.pdfFiles.push({
          url: file,
          name: `${curriculum.course_title_main || "Course"} - PDF Document ${fileIndex + 1}`,
          sectionTitle: curriculum.course_title_main || "Course Materials",
          chapterTitle: `PDF ${fileIndex + 1}`,
        })
      })
    }

    if (curriculum.image_file && Array.isArray(curriculum.image_file)) {
      curriculum.image_file.forEach((file, fileIndex) => {
        materials.imageFiles.push({
          url: file,
          name: `${curriculum.course_title_main || "Course"} - Image ${fileIndex + 1}`,
          sectionTitle: curriculum.course_title_main || "Course Materials",
          chapterTitle: `Image ${fileIndex + 1}`,
        })
      })
    }

    return materials
  }

  //Get Details of Assign Assessment and the Score Gained
  // const getAssessmentDetails = () => {
  //   if (!curriculum || !curriculum.assessment) 
  //     return null
  //   return {
  //     title: curriculum.assessment.title || "Assessment",
  //     certificate: curriculum.assessment.certificate || null,
  //     completionDate: curriculum.assessment.completionDate || null,
  //     isCompleted: curriculum.assessment.isCompleted || false,
  //     score: curriculum.assessment.score || 0,
  //     passingScore: curriculum.assessment.passingScore || 0,
  //   }
  // }

  // const assessmentDetails = getAssessmentDetails();
  
  // console.log(curriculum);
  //Fetch attempt count & latest score from backend API

  //Replace with actual values based on your data/context
  // const userId = localStorage.getItem('token');
  console.log(currentUser);
  const assessmentId = assessment?.[0]?._id
  useEffect(() => {
    const fetchAssessmentStats = async () => {
      // if (!assessmentId) return;

      try {
        const res = await axios.get(`${base_url}/api/get/submitted/assessment/atten/${assessmentId}`);
        // const data = await res.data
        // console.log(data);

        const submissions = res.data?.data || [];
        console.log(submissions);

        // Filter only submissions of the current employee
        const employeeSubmissions = submissions.filter(
          (item) =>
            item.employeeId === currentUser._id
        );

        setAttemptCount(employeeSubmissions.length);

        // Get latest submission by submittedAt timestamp
        const latestSubmission = employeeSubmissions
          .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))[0];

        if (latestSubmission) {
          setTotalScore(latestSubmission.totalScore ?? 0);
          setTimeSpent(latestSubmission.timeSpent ?? 0);
        }
      } catch (error) {
        console.error('Failed to fetch assessment data:', error);
      }

        // if (data.success) {
        //   setAttemptCount(data.attemptCount);     // Set attempt count from backend
        //   setUserScore(data.latestScore);         // Set latest score from backend
        // } else {
        //   console.error("Failed to fetch assessment stats");
        // }
      }

    fetchAssessmentStats();
  }, [assessmentId]);

  const handleDownloadCertificate = async () => {
  try {
    const res = await axios.post(`${base_url}/api/certificates/download`, {
      userId: currentUser._id,
      courseId: curriculum._id,
    }, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'certificate.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Certificate download error:', error);
    alert('Failed to download certificate.');
  }
};


  // Download file function
  const downloadFile = async (fileUrl, fileName) => {
    try {
      const link = document.createElement("a")
      link.href = fileUrl
      link.download = fileName
      link.target = "_blank"
      link.rel = "noopener noreferrer"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading file:", error)
      alert("Error downloading file. Please try again or check if the file URL is valid.")
    }
  }

  // Download all files of a specific type
  const downloadAllFiles = async (files, fileType) => {
    if (files.length === 0) {
      alert(`No ${fileType} files available for download.`)
      return
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const extension = fileType === "word" ? ".docx" : fileType === "pdf" ? ".pdf" : ".jpg"
      await downloadFile(file.url, `${file.name}${extension}`)

      if (i < files.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  }

  // Check if a lesson is accessible
  const isLessonAccessible = (lessonId) => {
    const flatLessons = getFlatLessons()
    const lessonIndex = flatLessons.findIndex((lesson) => lesson.id === lessonId)

    if (lessonIndex === 0) return true

    for (let i = 0; i < lessonIndex; i++) {
      if (!completedLessons.has(flatLessons[i].id)) {
        return false
      }
    }
    return true
  }

  // Check if current lesson is completed
  const isLessonCompleted = (lesson) => {
    if (!lesson) return false

    const hasVideo = lesson.videoUrl
    const hasYoutube = lesson.youtubeLink
    const hasPpt = lesson.pptFiles && lesson.pptFiles.length > 0

    const requiredProgress = {
      descriptionRead: true,
    }

    if (hasVideo) requiredProgress.videoWatched = true
    if (hasYoutube) requiredProgress.youtubeWatched = true
    if (hasPpt) requiredProgress.pptViewed = true

    return Object.keys(requiredProgress).every((key) => currentLessonProgress[key])
  }

  // Mark lesson as completed (user-specific)
  const markLessonCompleted = (lessonId) => {
    if (!currentUser?._id || !course?._id) return

    const newCompletedLessons = new Set([...completedLessons, lessonId])
    setCompletedLessons(newCompletedLessons)

    const completionsKey = getUserSpecificKey(`course_${course._id}_completions`)
    localStorage.setItem(completionsKey, JSON.stringify([...newCompletedLessons]))
  }

  // Save video progress to localStorage (user-specific)
  const saveVideoProgress = (lessonId, position, progress, mediaType) => {
    if (!currentUser?._id || !course?._id) return

    const progressKey = getUserSpecificKey(`course_${course._id}_video_progress`)
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || "{}")

    existingProgress[lessonId] = {
      position,
      progress,
      mediaType,
      timestamp: Date.now(),
    }

    localStorage.setItem(progressKey, JSON.stringify(existingProgress))

    setVideoPositions((prev) => ({
      ...prev,
      [lessonId]: position,
    }))

    setSavedProgress((prev) => ({
      ...prev,
      [lessonId]: progress,
    }))
  }

  // Load video progress from localStorage (user-specific)
  const loadVideoProgress = (lessonId) => {
    if (!currentUser?._id || !course?._id) return null

    const progressKey = getUserSpecificKey(`course_${course._id}_video_progress`)
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || "{}")

    return existingProgress[lessonId] || null
  }

  // Handle lesson click with accessibility check
  const handleLessonClick = (chapterContent, sectionTitle, sectionIndex, chapterIndex) => {
    if (!currentUser?._id) {
      alert("Please log in to track your progress!")
      return
    }

    const lessonId = `${sectionIndex}-${chapterIndex}`

    if (!isLessonAccessible(lessonId)) {
      alert("Please complete the previous lessons first!")
      return
    }

    setActivePptUrl(null)
    setPptError(null)

    const lesson = {
      id: lessonId,
      title: chapterContent.chapter_title,
      content: chapterContent.chapter_description,
      sectionTitle: sectionTitle,
      videoUrl: chapterContent.video_file?.[0],
      youtubeLink: chapterContent.youtube_link,
      pptFiles: chapterContent.ppt_file,
    }

    setActiveLesson(lesson)

    const savedVideoProgress = loadVideoProgress(lessonId)

    setCurrentLessonProgress({
      videoWatched: false,
      youtubeWatched: false,
      pptViewed: false,
      descriptionRead: false,
    })

    if (savedVideoProgress) {
      setVideoProgress(savedVideoProgress.progress)
      setVideoEnoughWatched(savedVideoProgress.progress >= 80)
    } else {
      setVideoProgress(0)
      setVideoEnoughWatched(false)
    }

    if (lesson.videoUrl) {
      setActiveMediaType("video")
    } else if (lesson.youtubeLink) {
      setActiveMediaType("youtube")
    } else if (lesson.pptFiles && lesson.pptFiles.length > 0) {
      setActiveMediaType("ppt")
    }
  }

  // Track media completion
  const handleMediaComplete = (mediaType) => {
    setCurrentLessonProgress((prev) => ({
      ...prev,
      [mediaType]: true,
    }))
  }

  // Track description read
  const handleDescriptionRead = () => {
    setCurrentLessonProgress((prev) => ({
      ...prev,
      descriptionRead: true,
    }))
  }

  // Check and mark lesson completion
  useEffect(() => {
    if (activeLesson && isLessonCompleted(activeLesson)) {
      markLessonCompleted(activeLesson.id)
    }
  }, [currentLessonProgress, activeLesson])

  // Check if download section should be shown
  useEffect(() => {
    setShowDownloadSection(areAllLessonsCompleted())
  }, [completedLessons, curriculum])

  const getNeighborLessons = () => {
    const flatLessons = getFlatLessons()
    const currentIndex = flatLessons.findIndex((lesson) => lesson.id === activeLesson?.id)

    return {
      previousLesson: currentIndex > 0 ? flatLessons[currentIndex - 1] : null,
      nextLesson: currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null,
    }
  }

  const navigateLesson = (direction) => {
    const { previousLesson, nextLesson } = getNeighborLessons()
    const targetLesson = direction < 0 ? previousLesson : nextLesson

    if (targetLesson) {
      if (direction > 0 && !isLessonAccessible(targetLesson.id)) {
        alert("Please complete the current lesson first!")
        return
      }

      setActiveLesson(targetLesson)
      setCurrentLessonProgress({
        videoWatched: false,
        youtubeWatched: false,
        pptViewed: false,
        descriptionRead: false,
      })

      setVideoProgress(0)
      setVideoEnoughWatched(false)
    }
  }

  const handleMediaTypeSwitch = (mediaType) => {
    setActiveMediaType(mediaType)
    setVideoProgress(0)
    setVideoEnoughWatched(false)
  }

  // PPT Viewer Component
  const PptViewer = ({ pptUrl, index }) => {
    const [currentViewer, setCurrentViewer] = useState("office")
    const [viewerError, setViewerError] = useState(null)

    const viewers = [
      {
        id: "office",
        name: "Microsoft Office Online",
        url: `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptUrl)}`,
        description: "Best for PowerPoint files",
      },
      {
        id: "google",
        name: "Google Docs Viewer",
        url: `https://docs.google.com/gview?url=${encodeURIComponent(pptUrl)}&embedded=true`,
        description: "Alternative viewer",
      },
      {
        id: "iframe",
        name: "Direct View",
        url: pptUrl,
        description: "Direct file access",
      },
    ]

    const currentViewerData = viewers.find((v) => v.id === currentViewer)

    const handleViewerError = () => {
      setViewerError(`Failed to load with ${currentViewerData.name}`)
    }

    const handleViewerLoad = () => {
      setViewerError(null)
    }

    return (
      <div className="ppt-viewer-container">
        <div className="ppt-viewer-header">
          <h5>📊 Presentation {index + 1}</h5>
          <div className="viewer-selector">
            <label>Viewer: </label>
            <select value={currentViewer} onChange={(e) => setCurrentViewer(e.target.value)}>
              {viewers.map((viewer) => (
                <option key={viewer.id} value={viewer.id}>
                  {viewer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {viewerError && (
          <div className="viewer-error">
            <p>⚠️ {viewerError}</p>
            <p>Try switching to a different viewer above, or use the fallback options below.</p>
          </div>
        )}

        <div className="ppt-iframe-container">
          <iframe
            key={currentViewer}
            src={currentViewerData.url}
            width="100%"
            height="600px"
            frameBorder="0"
            title={`Presentation ${index + 1} - ${currentViewerData.name}`}
            onError={handleViewerError}
            onLoad={handleViewerLoad}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#f8f9fa",
            }}
          />
        </div>

        <div className="ppt-viewer-footer">
          <div className="viewer-info">
            <small>Using: {currentViewerData.description}</small>
          </div>
          <div className="ppt-actions">
            <button
              className="ppt-action-btn fullscreen-btn"
              onClick={() => window.open(currentViewerData.url, "_blank")}
            >
              🔍 Open in Full Screen
            </button>
            <button className="ppt-action-btn complete-btn" onClick={() => handleMediaComplete("pptViewed")}>
              ✅ Mark as Viewed
            </button>
          </div>
        </div>

        {currentLessonProgress.pptViewed && <div className="completion-indicator">✅ Presentation completed</div>}
      </div>
    )
  }

  // Handle PPT viewing
  const handlePptView = (pptUrl, index) => {
    setPptLoading(true)
    setPptError(null)

    // Simulate loading time
    setTimeout(() => {
      setActivePptUrl(pptUrl)
      setPptLoading(false)
    }, 500)
  }

  // Unified video progress handler
  const handleVideoProgress = (progress) => {
    const currentTime = progress.playedSeconds
    const watchedPercentage = progress.played * 100

    setVideoProgress(watchedPercentage)

    if (Math.floor(currentTime) % 5 === 0) {
      const mediaType = activeMediaType === "youtube" ? "youtube" : "video"
      saveVideoProgress(activeLesson.id, currentTime, watchedPercentage, mediaType)
    }

    if (watchedPercentage >= 80 && !videoEnoughWatched) {
      setVideoEnoughWatched(true)
    }

    if (progress.played > 0.9) {
      const completionType = activeMediaType === "youtube" ? "youtubeWatched" : "videoWatched"
      handleMediaComplete(completionType)
    }
  }

  const handleVideoPause = () => {
    if (reactPlayerRef.current && activeLesson) {
      const currentTime = reactPlayerRef.current.getCurrentTime()
      const duration = reactPlayerRef.current.getDuration()
      const watchedPercentage = (currentTime / duration) * 100
      const mediaType = activeMediaType === "youtube" ? "youtube" : "video"
      saveVideoProgress(activeLesson.id, currentTime, watchedPercentage, mediaType)
    }
  }

  const handleVideoEnded = () => {
    const completionType = activeMediaType === "youtube" ? "youtubeWatched" : "videoWatched"
    handleMediaComplete(completionType)
    setVideoEnoughWatched(true)
  }

  const renderMedia = () => {
    if (!activeLesson) return null

    switch (activeMediaType) {
      case "video":
        const savedVideoProgress = loadVideoProgress(activeLesson.id)
        const startTime =
          savedVideoProgress && savedVideoProgress.mediaType === "video" ? savedVideoProgress.position : 0

        return activeLesson.videoUrl ? (
          <div key={`video-${activeLesson.id}`} className="media-container">
            <ReactPlayer
              ref={reactPlayerRef}
              key={`player-${activeLesson.id}-video`}
              url={activeLesson.videoUrl}
              controls
              width="100%"
              height="500px"
              onReady={() => {
                if (startTime > 0) {
                  console.log(`Resuming regular video at ${startTime} seconds`)
                  if (reactPlayerRef.current) {
                    reactPlayerRef.current.seekTo(startTime, "seconds")
                  }
                }
              }}
              onProgress={handleVideoProgress}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                    disablePictureInPicture: true,
                  },
                },
              }}
            />
            {startTime > 0 && (
              <div className="resume-indicator">
                <p
                  style={{
                    background: "#e3f2fd",
                    padding: "8px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    fontSize: "14px",
                  }}
                >
                  ▶️ Resuming from {Math.floor(startTime / 60)}:{(startTime % 60).toFixed(0).padStart(2, "0")}
                </p>
              </div>
            )}
            {currentLessonProgress.videoWatched && <div className="completion-indicator">✅ Video completed</div>}
          </div>
        ) : null

      case "youtube":
        const savedYoutubeProgress = loadVideoProgress(activeLesson.id)
        const youtubeStartTime =
          savedYoutubeProgress && savedYoutubeProgress.mediaType === "youtube" ? savedYoutubeProgress.position : 0

        return activeLesson.youtubeLink ? (
          <div key={`youtube-${activeLesson.id}`} className="media-container">
            <ReactPlayer
              ref={reactPlayerRef}
              key={`player-${activeLesson.id}-youtube`}
              url={activeLesson.youtubeLink}
              controls
              width="100%"
              height="500px"
              onReady={() => {
                if (youtubeStartTime > 0) {
                  console.log(`Resuming YouTube video at ${youtubeStartTime} seconds`)
                  if (reactPlayerRef.current) {
                    reactPlayerRef.current.seekTo(youtubeStartTime, "seconds")
                  }
                }
              }}
              onProgress={handleVideoProgress}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    modestbranding: 1,
                    rel: 0,
                  },
                },
              }}
            />

            {youtubeStartTime > 0 && (
              <div className="resume-indicator">
                <p
                  style={{
                    background: "#e3f2fd",
                    padding: "8px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    fontSize: "14px",
                  }}
                >
                  ▶️ Will resume from {Math.floor(youtubeStartTime / 60)}:
                  {(youtubeStartTime % 60).toFixed(0).padStart(2, "0")}
                  (Progress: {videoProgress.toFixed(0)}%)
                </p>
              </div>
            )}

            <div className="youtube-progress-container">
              <div className="youtube-progress-bar">
                <div className="youtube-progress-fill" style={{ width: `${videoProgress}%` }}></div>
              </div>
              <div className="youtube-progress-text">{videoProgress.toFixed(0)}% watched</div>
            </div>

            {videoEnoughWatched && !currentLessonProgress.youtubeWatched && (
              <button className="mark-complete-btn" onClick={() => handleMediaComplete("youtubeWatched")}>
                Mark YouTube Video as Completed
              </button>
            )}
            {currentLessonProgress.youtubeWatched && (
              <div className="completion-indicator">✅ YouTube video completed</div>
            )}
            {!videoEnoughWatched && (
              <div className="youtube-instruction">
                <p
                  style={{
                    background: "#f0f8ff",
                    padding: "10px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    border: "1px solid #7a1cac",
                  }}
                >
                  📺 Please watch at least 80% of the YouTube video. The completion button will appear when you've
                  watched enough.
                </p>
              </div>
            )}
          </div>
        ) : null

  
        // case "ppt":
        //   return (
        //     <div key={`ppt-${activeLesson.id}-${activePptUrl}`} className="media-container">
        //       {activePptUrl ? (
        //         <div>
        //           <PptSlides key={`ppt-slides-${activePptUrl}`} pptUrl={activePptUrl} />
        //           <button className="mark-complete-btn" onClick={() => handleMediaComplete("pptViewed")}>
        //             Mark Presentation as Viewed
        //           </button>
        //           {currentLessonProgress.pptViewed && (
        //             <div className="completion-indicator">✅ Presentation completed</div>
        //           )}
        //         </div>
        //       ) : (
        //         <div className="ppt-prompt">
        //           <p>Select a presentation to view</p>
        //         </div>
        //       )}
        //     </div>
        //   )
  
         case "ppt":
        return (
          <div key={`ppt-${activeLesson.id}-${activePptUrl}`} className="media-container">
            {pptLoading ? (
              <div className="ppt-loading">
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <div className="loading-spinner">🔄</div>
                  <p>Loading presentation...</p>
                </div>
              </div>
            ) : activePptUrl ? (
              <PptViewer pptUrl={activePptUrl} index={activeLesson.pptFiles.indexOf(activePptUrl)} />
            ) : (
              <div className="ppt-prompt">
                <p>Select a presentation to view</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Render Download Materials Section
  const renderDownloadSection = () => {
    if (!showDownloadSection) return null

    const materials = getDownloadableMaterials()
    const totalFiles = materials.wordFiles.length + materials.pdfFiles.length + materials.imageFiles.length

    if (totalFiles === 0) {
      return (
        <div className="download-section completion-card">
          <div className="completion-header">
            <h3>🏆 Congratulations! Course Completed</h3>
          </div>
          <div className="completion-content">
            <p>
              You have successfully completed all lessons in this course! Unfortunately, no additional materials are
              available for download at this time.
            </p>
          </div>
        </div>
      )
    }

  
    

    return (
      <div className="download-section completion-card">
        <div className="completion-header">
          <h3>🏆 Congratulations! Course Completed</h3>
          <p>You have successfully completed all lessons! You can now download the course materials.</p>
        </div>
        <div className="completion-content">
          {/* Word Files Section */}
          {materials.wordFiles.length > 0 && (
            <div className="material-section">
              <div className="material-header">
                <h4>📄 Word Documents ({materials.wordFiles.length})</h4>
                <button
                  onClick={() => downloadAllFiles(materials.wordFiles, "word")}
                  className="download-all-btn word-btn"
                >
                  📥 Download All Word Files
                </button>
              </div>
              <div className="file-list">
                {materials.wordFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-section">{file.sectionTitle}</p>
                    </div>
                    <button onClick={() => downloadFile(file.url, `${file.name}.docx`)} className="download-btn">
                      📥
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF Files Section */}
          {materials.pdfFiles.length > 0 && (
            <div className="material-section">
              <div className="material-header">
                <h4>📋 PDF Documents ({materials.pdfFiles.length})</h4>
                <button
                  onClick={() => downloadAllFiles(materials.pdfFiles, "pdf")}
                  className="download-all-btn pdf-btn"
                >
                  📥 Download All PDF Files
                </button>
              </div>
              <div className="file-list">
                {materials.pdfFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-section">{file.sectionTitle}</p>
                    </div>
                    <button onClick={() => downloadFile(file.url, `${file.name}.pdf`)} className="download-btn">
                      📥
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Files Section */}
          {materials.imageFiles.length > 0 && (
            <div className="material-section">
              <div className="material-header">
                <h4>🖼️ Images ({materials.imageFiles.length})</h4>
                <button
                  onClick={() => downloadAllFiles(materials.imageFiles, "image")}
                  className="download-all-btn image-btn"
                >
                  📥 Download All Images
                </button>
              </div>
              <div className="file-list">
                {materials.imageFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-section">{file.sectionTitle}</p>
                    </div>
                    <button onClick={() => downloadFile(file.url, `${file.name}.jpg`)} className="download-btn">
                      📥
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download All Materials Button */}
          <div className="download-all-section">
            <button
              onClick={async () => {
                await downloadAllFiles(materials.wordFiles, "word")
                await downloadAllFiles(materials.pdfFiles, "pdf")
                await downloadAllFiles(materials.imageFiles, "image")
              }}
              className="download-all-materials-btn"
            >
              📥 Download All Course Materials ({totalFiles} files)
            </button>
          </div>
        </div>

 

      </div>

      
    )
  }
  
  



  const { previousLesson, nextLesson } = getNeighborLessons()

  if (!currentUser) {
    return (
      <div className="login-required">
        <h2>👋 Please Log In</h2>
        <p>You need to log in to access your personalized learning path.</p>
      </div>
    )
  }
  
  
 

   
// useEffect(() => {
//   if (curriculum?.attempt_count !== undefined) {
//     setAttemptCount(curriculum.attempt_count);
//   }
// }, [curriculum]);   


  //Limit pulled from course object (default Infinity)
  const attemptLimit = course?.assesment_limitation ?? Infinity;

  // //Replace with actual values based on your data/context
  // const assessmentId = assessment?.[0]?._id;
  // const userId = localStorage.getItem('userId');

  // Handle button press: Go to assessment if within limits
  const handleTakeAssessment = () => {
    if (attemptCount >= attemptLimit) {
      alert("❌ You’ve reached the maximum number of attempts.");
      return;
    }

    //This is a local increment for UI only — real increment happens after test submission
    setAttemptCount(prev => prev + 1);

    //Navigate to assessment page
    navigate(`/takeAssessmentPlatform/${assessmentId}`);
  };

    
//   const handleTakeAssessment = () => {
//   if (attemptCount >= attemptLimit) {
//     alert("❌ You’ve reached the maximum number of attempts.");
//     return;
//   }

//   setAttemptCount(prev => prev + 1); // Simulate incrementing attempts
//   navigate(`/takeAssessmentPlatform/${assessment[0]._id}`);
// };

// const handleTakeAssessment = () => {
//   navigate(`/takeAssessmentPlatform/${assessment[0]._id}`); //The actual path to your assessment page
// };




  return (
    <div>
      {/* User Header */}
      <div className="user-header">
        <div className="current-user-info">
          <h3>👨‍🎓 {currentUser.employee_name || currentUser.employee_email}</h3>
          {currentUser.email && <p>{currentUser.email}</p>}
        </div>
        <div className="course-progress">
          <span className={`progress-badge ${areAllLessonsCompleted() ? "completed" : "in-progress"}`}>
            {areAllLessonsCompleted() ? (
              <>✅ Course Completed!</>
            ) : (
              `${completedLessons.size}/${getFlatLessons().length} Lessons Completed`
            )}
          </span>
        </div>
      </div>

      <div className="curriculum-container">
        {showCurriculum && (
          <div className="curriculum-sidebar">
            <div className="curriculum-header">
              <h3>📖 Curriculum</h3>
              <button onClick={() => setShowCurriculum(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="curriculum-sections">
              {curriculum?.sections?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="section">
                  <div className="section-header">
                    <h5>{section.section_title}</h5>
                  </div>
                  <div>
                    {section.add_Content.map((chapter, chapterIndex) => {
                      const lessonId = `${sectionIndex}-${chapterIndex}`
                      const isAccessible = isLessonAccessible(lessonId)
                      const isCompleted = completedLessons.has(lessonId)

                      return (
                        <div
                          key={chapterIndex}
                          className={`lesson-item ${
                            isCompleted ? "completed" : isAccessible ? "accessible" : "locked"
                          }`}
                          onClick={() => {
                            if (isAccessible) {
                              handleLessonClick(chapter, section.section_title, sectionIndex, chapterIndex)
                            }
                          }}
                        >
                          <span>{chapter.chapter_title}</span>
                          <span className="lesson-status">{isCompleted ? "✅" : isAccessible ? "🔓" : "🔒"}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="content-area">
          <div className="content-header">
            <h3>{curriculum?.course_title_main}</h3>
          </div>

          <div className="lesson-content">
            {renderDownloadSection()}

            {activeLesson ? (
              <>
                <h4>
                  {activeLesson.sectionTitle}: {activeLesson.title}
                </h4>

                <div className="lesson-progress">
                  <h5>Lesson Progress:</h5>
                  {activeLesson.videoUrl && (
                    <div className={`progress-item ${currentLessonProgress.videoWatched ? "completed" : "pending"}`}>
                      {currentLessonProgress.videoWatched ? "✅" : "⏳"} Watch Course Video
                    </div>
                  )}
                  {activeLesson.youtubeLink && (
                    <div className={`progress-item ${currentLessonProgress.youtubeWatched ? "completed" : "pending"}`}>
                      {currentLessonProgress.youtubeWatched ? "✅" : "⏳"} Watch YouTube Video
                    </div>
                  )}
                  {activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                    <div className={`progress-item ${currentLessonProgress.pptViewed ? "completed" : "pending"}`}>
                      {currentLessonProgress.pptViewed ? "✅" : "⏳"} View Presentation
                    </div>
                  )}
                  <div className={`progress-item ${currentLessonProgress.descriptionRead ? "completed" : "pending"}`}>
                    {currentLessonProgress.descriptionRead ? "✅" : "⏳"} Read Description
                  </div>
                </div>

                <div className="media-controls">
                  {activeLesson.videoUrl && (
                    <button
                      className={`media-button ${activeMediaType === "video" ? "active" : ""}`}
                      onClick={() => handleMediaTypeSwitch("video")}
                    >
                      Course Video
                    </button>
                  )}
                  {activeLesson.youtubeLink && (
                    <button
                      className={`media-button ${activeMediaType === "youtube" ? "active" : ""}`}
                      onClick={() => handleMediaTypeSwitch("youtube")}
                    >
                      YouTube Video
                    </button>
                  )}
                  {activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                    <button
                      className={`media-button ${activeMediaType === "ppt" ? "active" : ""}`}
                      onClick={() => handleMediaTypeSwitch("ppt")}
                    >
                      Presentation Files
                    </button>
                  )}
                </div>

                {activeMediaType === "ppt" && activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                  <div className="ppt-files">
                    <div className="ppt-header">
                      <h5>Available Presentations:</h5>
                    </div>
                    <div className="ppt-actions">
                      {activeLesson.pptFiles.map((ppt, index) => (
                        <div key={index} className="ppt-action-group">
                          <button
                            className="view-button"
                            onClick={() => handlePptView(ppt, index)}
                            style={{ marginRight: "10px" }}
                            disabled={pptLoading}
                          >
                            {pptLoading ? "Loading..." : `📊 View PPT ${index + 1}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {renderMedia()}

                <div className="descition-div">
                  <h5>Chapter Description</h5>
                  <p>{activeLesson.content}</p>
                  <button
                    className="mark-complete-btn"
                    onClick={handleDescriptionRead}
                    disabled={currentLessonProgress.descriptionRead}
                  >
                    {currentLessonProgress.descriptionRead ? "✅ Description Read" : "Mark Description as Read"}
                  </button>
                </div>
              </>
            ) : (
              <div className="no-lesson-selected">
                <p>Select a lesson to view its content</p>
                {areAllLessonsCompleted() && (
                  <div className="completion-celebration">
                    <h4>🎉 Congratulations!</h4>
                    <p>You have completed all lessons in this course!</p>
                  </div>
                )}
              </div>
            )}
            {/* GetAssessment Section */}
              <div className="assessment-content">
                {curriculum ? (
                  <div className="assessment-details">
                    <div><strong>Assessment Title:</strong> {curriculum.course_assesment}</div>
                    {/* <div><strong>Certificate:</strong> {curriculum.course_certificate || "N/A"}</div> */}
                    <div><strong>Completion Date:</strong> {curriculum.assesment_complete_date || "Not set"}</div>
                    {/* <div><strong>Status:</strong> {curriculum.isCompleted ? "✅ Completed" : "❌ Not Completed"}</div> */}
                    <div><strong>Latest Total Score:</strong> {totalScore ?? 'N/A'}</div>
                    <div><strong>Passing Score:</strong> {curriculum.assesment_passingscore}</div>
                    <div><strong>Attempts:</strong> {attemptCount} / {attemptLimit ?? "∞"}</div>

                    {/* <div><strong>Attempts:</strong> {curriculum.attempt_count || 0} / {course?.assesment_limitation || "∞"}</div> */}


                    {/* If score exists */}
                    {curriculum.score !== undefined && curriculum.score !== null ? (
                    <>
                      <div><strong>Your Score:</strong> {curriculum.score}</div>

                      {curriculum.score >= curriculum.assesment_passingscore ? (
                        <div className="assessment-passed">✅ You passed the assessment!</div>
                      ) : (
                        attemptCount < attemptLimit ? (
                          <button className="take-assessment-btn" onClick={handleTakeAssessment}>
                            🔁 Retake Assessment
                          </button>
                        ) : (
                          <div className="assessment-limit-reached">
                            ❌ You did not pass. Maximum attempts reached.
                          </div>
                        )
                      )}
                    </>
                    ) : (
                      // If no score (never taken assessment)
                      attemptCount < attemptLimit ? (
                      <button className="take-assessment-btn" 
                      onClick={handleTakeAssessment}>
                      📝 Take Assessment
                      </button>
                      ) : (
                        <div className="assessment-limit-reached">❌ Assessment attempt limit reached. You cannot take the assessment.</div>
                      )
                    )}
                  </div>
                      ) : (
                        <p>No assessment details found.</p>
                      )}
              </div>


              {/* Certificate Button
              {curriculum && totalScore >= curriculum.assesment_passingscore && (
                <div className="certificate-download">
                  <button
                    onClick={handleDownloadCertificate}
                  >
                    🎓 Download Certificate
                  </button>
                </div>
              )} */}
              {/* Certificate Button */}
              {curriculum && totalScore >= curriculum.assesment_passingscore && (
                <div className="certificate-download">
                  <p>🎉 <strong>Congratulations!</strong> You have successfully passed the assessment.</p>
                  <p>🧠 <strong>Your Score:</strong> {totalScore}</p>
                  <button
                    onClick={handleDownloadCertificate}
                  >
                    🎓 Download Certificate
                  </button>
                </div>
              )}


          </div>

        



          <div className="navigations-btn-div">
            <div className="navigation-buttons">
              <button onClick={() => navigateLesson(-1)} disabled={!previousLesson}>
                ⬅️ {previousLesson ? `${previousLesson.sectionTitle}: ${previousLesson.title}` : "No Previous Lesson"}
              </button>
              <button
                onClick={() => navigateLesson(1)}
                disabled={!nextLesson || (nextLesson && !isLessonAccessible(nextLesson.id))}
              >
                {nextLesson ? `${nextLesson.sectionTitle}: ${nextLesson.title}` : "No Next Lesson"} ➡️
              </button>
            </div>
          </div>
        </div>

        {!showCurriculum && (
          <button className="floating-book-icon" onClick={() => setShowCurriculum(true)}>
            📖 
          </button>
        )}
      </div>
    </div>
  )
}

export default Curriculum
