import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Video.css";
import { FaFolder, FaCertificate } from "react-icons/fa";

function Video() {


  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (comment.trim() !== '') {
      setComments([...comments, comment]); // Add the comment to the list
      setComment(''); // Clear the input field
    }
  };















  const [selected, setSelected] = useState("overview"); // default selected item

  const handleClick = (item) => {
    setSelected(item); // set the selected item
  };

  const itemStyle = (item) => ({
    textDecoration: "none", // removed since we're using borderBottom for underlining
    fontWeight: selected === item ? "bold" : "normal", // make bold if selected
    color: selected === item ? "black" : "black", // optional: change color if selected
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    borderBottom: selected === item ? "2px solid black" : "none", // underline effect for the whole item
    paddingBottom: "5px", // space between content and the underline
    marginTop: "10px", // this adds margin above the underline (effectively moves the underline down)
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Sidebar />
        </div>
        <section
          className="main-section"
          style={{
            width: "70%",
            height: "1500px",
            overflow: "scroll !important",
          }}
        >
          {/* Video Section */}
          <div className="video-container">
            <iframe
              width="900px"
              height="500px"
              src="https://www.youtube.com/embed/hlGoQC332VM?si=qQFVttaVOxf6zhQL"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Icons and Text */}
          <div className="container" style={{ marginTop: "30px" }}>
            <div className="row">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                  }}
                >
                  <div
                    style={itemStyle("overview")}
                    onClick={() => handleClick("overview")}
                  >
                    <i
                      style={{ marginTop: "5px", fontSize: "21px" }}
                      className="fa-regular fa-newspaper"
                    ></i>
                    <label style={{ fontSize: "20px" }}>Overview</label>
                  </div>
                  <div
                    style={itemStyle("qa")}
                    onClick={() => handleClick("qa")}
                  >
                    <i
                      style={{ marginTop: "5px", fontSize: "21px" }}
                      className="fa-solid fa-paper-plane"
                    ></i>
                    <label style={{ fontSize: "20px" }}>Q&A</label>
                  </div>
                  <div
                    style={itemStyle("notebook")}
                    onClick={() => handleClick("notebook")}
                  >
                    <i
                      style={{ marginTop: "5px", fontSize: "21px" }}
                      className="fa-solid fa-book"
                    ></i>
                    <label style={{ fontSize: "20px" }}>NoteBook</label>
                  </div>
                  <div
                    style={itemStyle("transcript")}
                    onClick={() => handleClick("transcript")}
                  >
                    <i
                      style={{ marginTop: "5px", fontSize: "21px" }}
                      className="fa-solid fa-bars-staggered"
                    ></i>
                    <label style={{ fontSize: "20px" }}>Transcript</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor--------------------------------------------------------------------------------------- */}
          <div
  className="container"
  style={{ minHeight: "100px", marginTop: "20px" }}
>
  <div className="row" style={{ display: "flex" }}>
    {/* Instructor Section */}
    <div
      className="col-md-4"
      style={{
        borderRight: "2px solid black", // Divider line only for Instructor section
        textAlign: "center",
        height: "100%", // Ensures it covers just the content
        alignSelf: "flex-start", // Aligns with the height of the content
      }}
    >
      <label style={{ fontWeight: "bold", marginBottom: "10px", lineHeight: "1.2" }}>
        Instructor
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Instructor Image"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginTop: "10px",
          }}
        />
        <div style={{ marginLeft: "10px" }}>
          <p style={{ fontWeight: "bold", margin: "5px 0", lineHeight: "1.2" }}>
            Deepa Maddala
          </p>
          <p style={{ margin: "5px 0", lineHeight: "1.2" }}>
            Experienced Consultant and PL/SQL Developer in Information Technology
          </p>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              backgroundColor: "#0077b5",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            + Follow on LinkedIn
          </button>
        </a>
      </div>

     {/* comment section------------------------------------------------------------------------------------------------- */}

<div className="comment-container">
      <h2 className="comment-title">Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={comment}
          onChange={handleInputChange}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button type="submit" className="comment-button">Send</button>
      </form>
      <div className="comments-list">
        <h3>Comments:</h3>
        <ul>
          {comments.map((c, index) => (
            <li key={index} className="comment-item">{c}</li>
          ))}
        </ul>
      </div>
    </div>


{/* comment sectin end-------------------------------------------------------------------------------------------- */}







    </div>
    
    {/* Related To This Course Section */}
    <div
      className="col-md-3"
      style={{ borderRight: "2px solid black", textAlign: "center" }}
    >
      <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Related To This Course
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
        }}
      >
        {/* Exercise Files */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FaFolder style={{ marginRight: "8px", fontSize: "20px" }} />
          <span>Exercise Files</span>
          <a
            href="#"
            style={{
              marginLeft: "5px",
              color: "#0073b1",
              textDecoration: "none",
            }}
          >
            Show all
          </a>
        </div>

        {/* Certificates */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FaCertificate style={{ marginRight: "8px", fontSize: "20px" }} />
          <span>Certificates</span>
          <a
            href="#"
            style={{
              marginLeft: "5px",
              color: "#0073b1",
              textDecoration: "none",
            }}
          >
            Show all
          </a>
        </div>
      </div>
    </div>

    {/* Related Courses Section */}
    <div
      className="col-md-5"
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Related Courses
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {/* Video 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <iframe
            width="150"
            height="100"
            src="https://www.youtube.com/embed/UOJZTqA5Loc?si=JbJXFem_fCdbYD_D"
            title="Related Course Video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p style={{ marginLeft: "10px", fontSize: "16px" }}>Course Title 1</p>
        </div>

        {/* Video 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <iframe
            width="150"
            height="100"
            src="https://www.youtube.com/embed/icudf_w_pqU?si=zDxmPtc11bYcaqIW"
            title="Related Course Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p style={{ marginLeft: "10px", fontSize: "16px" }}>Course Title 2</p>
        </div>

        {/* Video 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <iframe
            width="150"
            height="100"
            src="https://www.youtube.com/embed/hlGoQC332VM?si=abcxyz"
            title="Related Course Video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p style={{ marginLeft: "10px", fontSize: "16px" }}>Course Title 3</p>
        </div>

        {/* Video 4 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <iframe
            width="150"
            height="100"
            src="https://www.youtube.com/embed/def456"
            title="Related Course Video 4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p style={{ marginLeft: "10px", fontSize: "16px" }}>Course Title 4</p>
        </div>

        {/* Video 5 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <iframe
            width="150"
            height="100"
            src="https://www.youtube.com/embed/ghi789"
            title="Related Course Video 5"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p style={{ marginLeft: "10px", fontSize: "16px" }}>Course Title 5</p>
        </div>

        {/* Video 6 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "center",
          }}
        >
          <iframe
            width="150"
            height="100"
            src="https://www.youtube.com/embed/jkl123"
            title="Related Course Video 6"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p style={{ marginLeft: "10px", fontSize: "16px" }}>Course Title 6</p>
        </div>
      </div>
    </div>
  </div>
</div>

{/* --------------------------------------------------------------------------------------------------------- */}







{/* ------------------------------------------------------------------------------------------------------- */}




        </section>
      </div>
    </>
  );
}

export default Video;
