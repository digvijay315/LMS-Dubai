import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TagCourse() {
    const [show, setShow] = useState(false);
    //   const [data,setData] = useState('');
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

  return (
    <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                // onChange={(e)=>setData(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <Sidebar/>

        <section className='main-content-section'>

                <Header />

            <div className='header-div header-two'>
                <div className='title-name'>
                    <h5>Course Tag List</h5>
                    <p style={{opacity: "0.5"}}>All Course Tag Here</p>
                </div>
                <div className="category-btn">
                    <Button variant="primary" onClick={handleShow}>
                        Edit
                    </Button>

                </div>
            </div>

            <div className='courses-list-section'>
                <table style={{padding: "1rem"}}>
                    <thead>
                        <tr style={{borderTop: "none"}}>
                            <th style={{paddingRight: "52rem"}}>Tag Name</th>
                            {/* <th style={{paddingRight: "22rem"}}>Status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{fontWeight: "500"}} className='course-td'>
                                PHP
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        HTML
                        </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        Pure JS
                        </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        JavaScript
                        </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        Python
                        </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        Kotlin
                        </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
      
    </div>
  )
}

export default TagCourse


