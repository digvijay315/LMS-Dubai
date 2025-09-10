import "../StyleCode/AllSubjectList.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { NavLink } from "react-router-dom";

function AllSubjectList() {
  return (
    <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px" }}>
      <Sidebar />

      <section className="main-content-section">
        <Header />

        <div className="header-div header-two">
          <div className="title-name">
            <h5>Subject List</h5>
            <p style={{ opacity: "0.5" }}>All Subject Here</p>
          </div>
          <div className="category-btn">
            <button>
              {" "}
              <NavLink to={"/createSubject"}>Add Subject</NavLink>{" "}
            </button>
          </div>
        </div>

        <div className="courses-list-section">
          <table style={{ padding: "1rem" }}>
            <thead>
              <tr style={{ borderTop: "none" }}>
                <th style={{ paddingRight: "52rem" }}>Subject Name</th>
                {/* <th style={{paddingRight: "22rem"}}>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "500" }} className="course-td">
                  <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/admin/top-course/top-course-1.png" />
                  <div className="course-info">
                    <p>02 Apr 2024</p>
                    <h6>UI/UX Design</h6>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "500" }} className="course-td">
                  <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/admin/top-course/top-course-2.png" />
                  <div className="course-info">
                    <p>02 Apr 2024</p>
                    <h6>Web Development</h6>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "500" }} className="course-td">
                  <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/admin/top-course/top-course-3.png" />
                  <div className="course-info">
                    <p>02 Apr 2024</p>
                    <h6>Data Science</h6>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "500" }} className="course-td">
                  <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/admin/top-course/top-course-4.png" />
                  <div className="course-info">
                    <p>02 Apr 2024</p>
                    <h6>Aeronotics Engineering</h6>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "500" }} className="course-td">
                  <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/admin/top-course/top-course-2.png" />
                  <div className="course-info">
                    <p>02 Apr 2024</p>
                    <h6>Cyber Security</h6>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "500" }} className="course-td">
                  <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/admin/top-course/top-course-1.png" />
                  <div className="course-info">
                    <p>02 Apr 2024</p>
                    <h6>Machine Learning</h6>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AllSubjectList;
