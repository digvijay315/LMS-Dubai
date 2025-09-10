import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css'

function Sidebar() {

    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
      setOpenSection(openSection === section ? null : section);
    };

    return (
    <>
      {/* Sidebar */}
      <div className="sidebar" style={{position:"fixed", top:"0",left:"0"}}>
        <div className="d-flex justify-content-between align-items-center px-3 py-2">
          <span>
            <i className="bi bi-list"></i> Contents
          </span>
          <button className="btn btn-close btn-close-white"></button>
        </div>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action">
            Introduction
          </a>
          
          <div>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection('section1')}
            >
              1. Fetch Data from Tables{' '}
              <i className={`bi bi-chevron-${openSection === 'section1' ? 'up' : 'down'}`}></i>
            </a>
            <div className={`collapse ${openSection === 'section1' ? 'show' : ''}`}>
              <a href="#" className="list-group-item list-group-item-action">
                Fetch Specific Columns
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Fetch All Rows
              </a>
            </div>
          </div>

          <hr style={{ border: "1px solid white" }}></hr>

          <div>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection('section2')}
            >
              2. Filtering Data{' '}
              <i className={`bi bi-chevron-${openSection === 'section2' ? 'up' : 'down'}`}></i>
            </a>
            <div className={`collapse ${openSection === 'section2' ? 'show' : ''}`}>
              <a href="#" className="list-group-item list-group-item-action">
                WHERE Clause
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Logical Operators
              </a>
            </div>
          </div>

          <hr style={{ border: "1px solid white" }}></hr>
          {/* --------------------------------------------------------------------------------------------------- */}

          <div>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection('section3')}
            >
              3. Single Row Function{' '}
              <i className={`bi bi-chevron-${openSection === 'section3' ? 'up' : 'down'}`}></i>
            </a>
            <div className={`collapse ${openSection === 'section3' ? 'show' : ''}`}>
              <a href="#" className="list-group-item list-group-item-action">
                WHERE Clause
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Logical Operators
              </a>
            </div>
          </div>
          <hr style={{ border: "1px solid white" }}></hr>

          {/* --------------------------------------------------------------------------------------------------- */}
          <div>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection('section4')}
            >
              4. Multiple Row Functions/Group Function{' '}
              <i className={`bi bi-chevron-${openSection === 'section4' ? 'up' : 'down'}`}></i>
            </a>
            <div className={`collapse ${openSection === 'section4' ? 'show' : ''}`}>
              <a href="#" className="list-group-item list-group-item-action">
                WHERE Clause
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Logical Operators
              </a>
            </div>
          </div>
          <hr style={{ border: "1px solid white" }}></hr>


          {/* ---------------------------------------------------------------------------------------------------- */}

          <div>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection('section5')}
            >
              5. Joins and Subqueries{' '}
              <i className={`bi bi-chevron-${openSection === 'section5' ? 'up' : 'down'}`}></i>
            </a>
            <div className={`collapse ${openSection === 'section5' ? 'show' : ''}`}>
              <a href="#" className="list-group-item list-group-item-action">
                WHERE Clause
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Logical Operators
              </a>
            </div>
          </div>
          <hr style={{ border: "1px solid white" }}></hr>




          {/* ------------------------------------------------------------------------------------------------------ */}

          <div>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => toggleSection('section6')}
            >
              Conclusion{' '}
              <i className={`bi bi-chevron-${openSection === 'section6' ? 'up' : 'down'}`}></i>
            </a>
            <div className={`collapse ${openSection === 'section6' ? 'show' : ''}`}>
              <a href="#" className="list-group-item list-group-item-action">
                WHERE Clause
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Logical Operators
              </a>
            </div>
          </div>





          {/* ------------------------------------------------------------------------------------------------------ */}

          {/* Other sections omitted for brevity */}

        </div>
      </div>

      {/* Video Section */}
      {/* <div className="video-container">
        <iframe
          width="800px"
          height="500px"
          src="https://www.youtube.com/embed/hlGoQC332VM?si=qQFVttaVOxf6zhQL"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </div> */}
   
{/* -----------------------------------------------icons------------------------------------------------------------- */}

    </>
  );
}

export default Sidebar;
