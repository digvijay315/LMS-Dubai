// // Frontend Component (ExcelUploader.jsx)
// import React, { useState } from 'react';
// import axios from 'axios';
// import { base_url } from './Utils/base_url';
// import { toast } from 'react-toastify';
// import * as XLSX from 'xlsx';

// const ExcelUploader = () => {
//     const [loading, setLoading] = useState(false);
//     const [progress, setProgress] = useState(0);

//     const processExcelFile = async (file) => {
//         try {
//             setLoading(true);
//             setProgress(0);

//             const reader = new FileReader();
//             reader.onload = async (e) => {
//                 try {
//                     const workbook = XLSX.read(e.target.result, { type: 'array' });
//                     const allSheetData = {};

//                     // Process each sheet in the workbook
//                     workbook.SheetNames.forEach((sheetName) => {
//                         const worksheet = workbook.Sheets[sheetName];
//                         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//                         allSheetData[sheetName] = jsonData;
//                     });

//                     // Send data to backend
//                     const response = await axios.post(`${base_url}/upload_excel`, allSheetData, {
//                         onUploadProgress: (progressEvent) => {
//                             const percentCompleted = Math.round(
//                                 (progressEvent.loaded * 100) / progressEvent.total
//                             );
//                             setProgress(percentCompleted);
//                         }
//                     });

//                     if (response.data.success) {
//                         toast.success('Excel data uploaded successfully!');
//                     } else {
//                         toast.error('Failed to upload excel data');
//                     }
//                 } catch (error) {
//                     console.error('Error processing excel:', error);
//                     toast.error('Error processing excel file');
//                 }
//                 setLoading(false);
//                 setProgress(0);
//             };

//             reader.readAsArrayBuffer(file);
//         } catch (error) {
//             console.error('Error reading file:', error);
//             toast.error('Error reading file');
//             setLoading(false);
//             setProgress(0);
//         }
//     };

//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const fileExtension = file.name.split('.').pop().toLowerCase();
//         if (!['xlsx', 'xls'].includes(fileExtension)) {
//             toast.error('Please upload only Excel files (.xlsx or .xls)');
//             return;
//         }

//         await processExcelFile(file);
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-2xl font-bold mb-4">Excel File Upload</h2>
                
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Upload Excel File (.xlsx, .xls)
//                     </label>
//                     <div className="flex items-center justify-center w-full">
//                         <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
//                             <div className="flex flex-col items-center justify-center pt-7">
//                                 <svg xmlns="http://www.w3.org/2000/svg" 
//                                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600" 
//                                      viewBox="0 0 20 20"
//                                      fill="currentColor">
//                                     <path fillRule="evenodd" 
//                                           d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
//                                           clipRule="evenodd" />
//                                 </svg>
//                                 <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
//                                     {loading ? 'Processing...' : 'Select Excel file'}
//                                 </p>
//                             </div>
//                             <input type="file" 
//                                    className="opacity-0" 
//                                    accept=".xlsx,.xls" 
//                                    onChange={handleFileUpload}
//                                    disabled={loading} />
//                         </label>
//                     </div>
//                 </div>

//                 {loading && progress > 0 && (
//                     <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                         <div className="bg-blue-600 h-2.5 rounded-full" 
//                              style={{ width: `${progress}%` }}></div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ExcelUploader;


// Fetch Excel Data
// import React, { useState } from 'react';
// import axios from 'axios';
// import { base_url } from './Utils/base_url';
// import { toast } from 'react-toastify';
// import * as XLSX from 'xlsx';

// const styles = {
//   container: {
//     maxWidth: '800px',
//     margin: '20px auto',
//     padding: '24px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     backgroundColor: 'white'
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//     color: '#333'
//   },
//   uploadBox: {
//     border: '2px dashed #ccc',
//     borderRadius: '6px',
//     padding: '20px',
//     textAlign: 'center',
//     cursor: 'pointer',
//     marginBottom: '20px',
//     transition: 'all 0.3s ease'
//   },
//   input: {
//     display: 'none'
//   },
//   button: {
//     backgroundColor: '#2563eb',
//     color: 'white',
//     padding: '10px 20px',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     marginBottom: '20px'
//   },
//   progressBar: {
//     width: '100%',
//     height: '8px',
//     backgroundColor: '#e5e7eb',
//     borderRadius: '4px',
//     marginTop: '20px'
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#2563eb',
//     borderRadius: '4px',
//     transition: 'width 0.3s ease'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '20px'
//   },
//   th: {
//     backgroundColor: '#f3f4f6',
//     padding: '12px',
//     textAlign: 'left',
//     borderBottom: '2px solid #e5e7eb'
//   },
//   td: {
//     padding: '12px',
//     borderBottom: '1px solid #e5e7eb'
//   }
// };

// const ExcelUploader = () => {
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [projectData, setProjectData] = useState([]);

//   const simulateProgress = () => {
//     let currentProgress = 0;
//     const interval = setInterval(() => {
//       currentProgress += 5;
//       if (currentProgress <= 90) {
//         setProgress(currentProgress);
//       } else {
//         clearInterval(interval);
//       }
//     }, 100);
//     return interval;
//   };

//   const processExcelFile = async () => {
//     if (!selectedFile) return;

//     try {
//       setLoading(true);
//       setProgress(0);
//       const progressInterval = simulateProgress();

//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         try {
//           const workbook = XLSX.read(e.target.result, { type: 'array' });
//           const projectSheet = workbook.Sheets['Project Code'];
          
//           if (!projectSheet) {
//             toast.error("Project Code sheet not found in the Excel file");
//             return;
//           }

//           const jsonData = XLSX.utils.sheet_to_json(projectSheet);
//           const filteredData = jsonData.map(row => ({
//             projectCode: row['Project Code'] || row.__EMPTY,
//             projectName: row['Project Name'] || row.__EMPTY_1,
//             region: row['Region'] || row.__EMPTY_2,
//             projectManager: row['Project Manager'] || row.__EMPTY_3
//           }));

//           await new Promise(resolve => setTimeout(resolve, 2000));

//           const response = await axios.post(`${base_url}/upload_excel`, {
//             sheetName: 'Project Code',
//             data: filteredData
//           });

//           clearInterval(progressInterval);
//           setProgress(100);
          
//           if (response.data.success) {
//             setProjectData(filteredData);
//             toast.success('Excel data processed successfully!');
//           } else {
//             toast.error('Failed to process excel data');
//           }
//         } catch (error) {
//           console.error('Error processing excel:', error);
//           toast.error('Error processing excel file');
//         }
//         setLoading(false);
//         setProgress(0);
//       };

//       reader.readAsArrayBuffer(selectedFile);
//     } catch (error) {
//       console.error('Error reading file:', error);
//       toast.error('Error reading file');
//       setLoading(false);
//       setProgress(0);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const fileExtension = file.name.split('.').pop().toLowerCase();
//     if (!['xlsx', 'xls'].includes(fileExtension)) {
//       toast.error('Please upload only Excel files (.xlsx or .xls)');
//       return;
//     }

//     setSelectedFile(file);
//     setProjectData([]);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Project Data Upload</h2>
      
//       <div style={styles.uploadBox}>
//         <input
//           type="file"
//           style={styles.input}
//           accept=".xlsx,.xls"
//           onChange={handleFileSelect}
//           disabled={loading}
//           id="file-upload"
//         />
//         <label htmlFor="file-upload">
//           {selectedFile ? selectedFile.name : 'Select Excel file'}
//         </label>
//       </div>

//       <button
//         style={styles.button}
//         onClick={processExcelFile}
//         disabled={!selectedFile || loading}
//       >
//         {loading ? 'Processing...' : 'Upload File'}
//       </button>

//       {loading && (
//         <div style={styles.progressBar}>
//           <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
//         </div>
//       )}

//       {projectData.length > 0 && (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Project Code</th>
//               <th style={styles.th}>Project Name</th>
//               <th style={styles.th}>Region</th>
//               <th style={styles.th}>Project Manager</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projectData.map((project, index) => (
//               <tr key={index}>
//                 <td style={styles.td}>{project.projectCode}</td>
//                 <td style={styles.td}>{project.projectName}</td>
//                 <td style={styles.td}>{project.region}</td>
//                 <td style={styles.td}>{project.projectManager}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ExcelUploader;



import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from './Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  uploadBox: {
    border: '2px dashed #ccc',
    borderRadius: '6px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#666',
      backgroundColor: '#f7f7f7'
    }
  },
  input: {
    display: 'none'
  },
  icon: {
    width: '48px',
    height: '48px',
    margin: '0 auto 12px',
    color: '#666'
  },
  text: {
    color: '#666',
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#7A1CAC',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#1d4ed8'
    },
    ':disabled': {
      backgroundColor: '#93c5fd',
      cursor: 'not-allowed'
    }
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    marginTop: '20px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E073F',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  }
};

const ExcelUploader = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress <= 90) {
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 100);
    return interval;
  };

  const processExcelFile = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setProgress(0);
      const progressInterval = simulateProgress();

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'array' });
          const allSheetData = {};

          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            allSheetData[sheetName] = jsonData;
          });

          // Add artificial delay
          await new Promise(resolve => setTimeout(resolve, 2000));

          const response = await axios.post(`${base_url}/upload_excel`, allSheetData);

          clearInterval(progressInterval);
          setProgress(100);
          
          await new Promise(resolve => setTimeout(resolve, 500));

          if (response.data.success) {
            toast.success('Excel file uploaded successfully!');
            setSelectedFile(null);
          } else {
            toast.error('Failed to upload excel file');
          }
        } catch (error) {
          console.error('Error processing excel:', error);
          toast.error('Error processing excel file');
        }
        setLoading(false);
        setProgress(0);
      };

      reader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error('Error reading file:', error);
      toast.error('Error reading file');
      setLoading(false);
      setProgress(0);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(fileExtension)) {
      toast.error('Please upload only Excel files (.xlsx or .xls)');
      return;
    }

    setSelectedFile(file);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Excel File Upload</h2>
      
      <div style={styles.uploadBox}>
        <input
          type="file"
          style={styles.input}
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          disabled={loading}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <svg 
            style={styles.icon}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" 
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" 
                  clipRule="evenodd" />
          </svg>
          <p style={styles.text}>
            {selectedFile ? selectedFile.name : 'Select Excel file'}
          </p>
        </label>
      </div>

      <button
        style={styles.button}
        onClick={processExcelFile}
        disabled={!selectedFile || loading}
      >
        {loading ? 'Uploading...' : 'Upload File'}
      </button>

      {loading && (
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
        </div>
      )}

      <ToastContainer/>
    </div>
  );
};

export default ExcelUploader;