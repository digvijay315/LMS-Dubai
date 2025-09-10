import "../StyleCode/AllCourseCategory.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { NavLink } from "react-router-dom";

function AllCourseCategory() {
  return (
    <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px" }}>
      <Sidebar />

      <section className="main-content-section">
        <Header />

        <div className="header-div header-two">
          <div className="title-name">
            <h5>Course Category List</h5>
            <p style={{ opacity: "0.5" }}>All Category Here</p>
          </div>
          <div className="category-btn">
            <button>
              {" "}
              <NavLink to={"/createCourse"}>Add Category</NavLink>{" "}
            </button>
          </div>
        </div>

        <div className="courses-list-section">
          <table style={{ padding: "1rem" }}>
            <thead>
              <tr style={{ borderTop: "none" }}>
                <th style={{ paddingRight: "22rem" }}>Category Name</th>
                <th style={{ paddingRight: "22rem" }}>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "500" }}>Programming</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>JavaScript</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>Web Development</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>Web Design</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>UI/UX</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>Business Growth</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>Job Success</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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
                <td style={{ fontWeight: "500" }}>Basic Graphic Design</td>
                <td>
                  <div>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
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

export default AllCourseCategory;
