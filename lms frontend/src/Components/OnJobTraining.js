// import React from 'react'
// import Sidebar from './Sidebar'
// import Header from './Header'

// function OnJobTraining() {

//     function get_activity() {
//         const select_ojt = document.getElementById('select-ojt-id').value;

//         if(select_ojt === '100P1OJT'){
//             document.getElementById('activity-data-id').style.display = "block";
//             document.getElementById('activityTwo-data-id').style.display = "none";
//         } else if(select_ojt === '200P2OJT'){
//             document.getElementById('activity-data-id').style.display = "none";
//             document.getElementById('activityTwo-data-id').style.display = "block";
//         }
        
//     }

//   return (

//     <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>

//     <style>{
//         `
//         .activity-data{
//         display: none;
//         }
//         `
//         }</style>

//         <Sidebar/>

//         <section className='main-content-section'>
//             <Header/>

//             <div className="header-div header-two">
//           <div className="title-name">
//             <h5>On Job Training</h5>
//             <p>
//               <a
//                 onClick={() => window.location.reload()}
//                 style={{ cursor: "pointer", color: "#099ded" }}
//               >
//                 Home
//               </a>{" "}
//               <i class="fa-solid fa-caret-right"></i>On Job Training
//             </p>
//           </div>
//         </div>

//         <div className="attendene-list">
//           <div className="title-div-two">
//             <h2>
//               On Job <span style={{ fontWeight: "300" }}>Training</span>
//             </h2>
//           </div>

//           <div className="upload-attendene" style={{ fontSize: "14px" }}>
//             <div className="info-div-item">
//               <label>Employee ID</label>
//               <select
//                 className="employee-id"
//                 name="employee-id"
//                 id="employee-id-ojt"
                
//               >
//                 <option>Employee 1</option>
//                 <option>Employee 2</option>
//                 <option>Employee 3</option>
//                 <option>Employee 4</option>
//               </select>
//             </div>
            
//             <div className="date-div">
//               <div className="info-div-item">
//                 <label>Date from</label>
//                 <input
//                   type="date"
//                   id="date_from_atten"
                  
//                 />
//               </div>
//               <div className="info-div-item">
//                 <label>Date to</label>
//                 <input
//                   type="date"
//                   id="date_to_atten"
                 
//                 />
//               </div>
//             </div>
//             <div className="time-div">
//               <div className="info-div-item">
//                 <label>Time from</label>
//                 <input
//                   type="time"
//                   id="time_from_atten"
                  
//                 />
//               </div>
//               <div className="info-div-item">
//                 <label>Time to</label>
//                 <input
//                   type="time"
//                   id="time_to_atten"
                  
//                 />
//               </div>
//             </div>

//             <div className="info-div-item">
//               <label>Select OJT</label>
//               <select
//                 className="select-ojt"
//                 name="select-ojt"
//                 id="select-ojt-id"
//                 onChange={get_activity}
//               >
//                 <option>-- Select --</option>
//                 <option>100P1OJT</option>
//                 <option>200P2OJT</option>
//                 <option>Venue 3</option>
//                 <option>Venue 4</option>
//                 <option>Venue 5</option>
//               </select>
//             </div>

//             <div className='activity-data' id='activity-data-id'>
//             <div className='activity-1'>
//                 <h4>Activity 1.1</h4>
//             <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} > 
//                 <thead>
//                     <tr>
//                         <td>CheckList</td>
//                         <td>Sr No.</td>
//                         <td>Description</td>
//                         <td>Trainer checkbox</td>
//                         <td>Employee checkbox</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                 </tbody>
//             </table>
//             </div>

//             <div className='activity-2'>
//                 <h4>Activity 1.2</h4>
//             <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} > 
//                 <thead>
//                     <tr>
//                         <td>CheckList</td>
//                         <td>Sr No.</td>
//                         <td>Description</td>
//                         <td>Trainer checkbox</td>
//                         <td>Employee checkbox</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                 </tbody>
//             </table>
//             </div>
//             </div>
//             <div className='activity-data' id='activityTwo-data-id'>
//             <div className='activity-1'>
//                 <h4>Activity 2.1</h4>
//             <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} > 
//                 <thead>
//                     <tr>
//                         <td>CheckList</td>
//                         <td>Sr No.</td>
//                         <td>Description</td>
//                         <td>Trainer checkbox</td>
//                         <td>Employee checkbox</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                 </tbody>
//             </table>
//             </div>

//             <div className='activity-2'>
//                 <h4>Activity 2.2</h4>
//             <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} > 
//                 <thead>
//                     <tr>
//                         <td>CheckList</td>
//                         <td>Sr No.</td>
//                         <td>Description</td>
//                         <td>Trainer checkbox</td>
//                         <td>Employee checkbox</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                     <tr>
//                         <td><input type='checkbox' /></td>
//                         <td>1</td>
//                         <td>This is the acticity 1</td>
//                         <td> <input type='checkbox' /> Trainer</td>
//                         <td> <input type='checkbox' /> Employee</td> 
//                     </tr>
//                 </tbody>
//             </table>
//             </div>
//             </div>
//           </div>

//           <div className="upload-btn" style={{ width: "5rem" }}>
//             <button
//               className="form-control form-control-sm"
//               style={{
//                 backgroundColor: "#7A1CAC",
//                 color: "#ffffff",
//                 height: "3rem",
//               }}
//             >
//               Upload
//             </button>
//           </div>
//         </div>
//         </section>
      
//     </div>
//   )
// }

// export default OnJobTraining
