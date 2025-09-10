  // const saveData = () => {
  //   // Save certificate data to localStorage
  //   localStorage.setItem('certificateData', JSON.stringify(certificateData));
    
  //   // Save image previews to localStorage
  //   if (logoPreview) {
  //     localStorage.setItem('logoPreview', logoPreview);
  //   }
    
  //   if (bgPreview) {
  //     localStorage.setItem('bgPreview', bgPreview);
  //   }
    
  //   // Show save status message
  //   setSaveStatus('Data saved successfully!');
    
  //   // Clear status message after 3 seconds
  //   setTimeout(() => {
  //     setSaveStatus('');
  //   }, 3000);
  // };


  //   // Load saved data from localStorage on component mount
  // useEffect(() => {
  //   const savedData = localStorage.getItem('certificateData');
  //   const savedLogoPreview = localStorage.getItem('logoPreview');
  //   const savedBgPreview = localStorage.getItem('bgPreview');
    
  //   if (savedData) {
  //     setCertificateData(JSON.parse(savedData));
  //   }
    
  //   if (savedLogoPreview) {
  //     setLogoPreview(savedLogoPreview);
  //   }
    
  //   if (savedBgPreview) {
  //     setBgPreview(savedBgPreview);
  //   }
  // }, []);



// import { useState, useRef, useEffect } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import { base_url } from '../Utils/base_url';

// const CertificateGenerator = ({ recipientName = '', certificateType = '', completionDate = '', description = '' }) => {
//   const [certificateData, setCertificateData] = useState({
//     recipientName: 'Vivek Kumar Gupta',
//     description: 'For outstanding achievement and dedication to excellence.',
//     signerName1: 'Bruce Wayne',
//     signerTitle1: 'Chief Executive Officer',
//     signerName2: 'Virat Kohli',
//     signerTitle2: 'General Manager',
//     certificateType: '',
//     companyName: 'TALENTS BUILDER',
//     completionDate: '',
//     textColor: '#003876',
//     accentColor: '#D4AF37',
//     bgColor: '#ffffff'
//   });

//   const [logoImage, setLogoImage] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [logoPreview, setLogoPreview] = useState('');
//   const [bgPreview, setBgPreview] = useState('');
//   const [saveStatus, setSaveStatus] = useState('');

//   const certificateRef = useRef();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${base_url}/get-certificate-data`);
//         const data = res.data;

//         if (data) {
//           const { logoPreview, bgPreview, ...rest } = data;
//           setCertificateData(prev => ({ ...prev, ...rest }));
//           if (logoPreview) setLogoPreview(logoPreview);
//           if (bgPreview) setBgPreview(bgPreview);
//         }
//       } catch (err) {
//         console.error('Error fetching certificate data:', err);
//       }
//     };

//     fetchData();
//   }, []);



//   // Effect to update props when they change
//   useEffect(() => {
//     const updates = {};
    
//     if (recipientName) {
//       updates.recipientName = recipientName;
//     }
    
//     if (certificateType) {
//       updates.certificateType = certificateType;
//     }
    
//     if (completionDate) {
//       updates.completionDate = completionDate;
//     }

//     if(description) {
//       updates.description = description;
//     }
    
//     if (Object.keys(updates).length > 0) {
//       setCertificateData(prevData => ({
//         ...prevData,
//         ...updates
//       }));
//     }
//   }, [recipientName, certificateType, completionDate]);
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCertificateData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLogoImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogoPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleBackgroundUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBackgroundImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBgPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const saveData = async () => {
//     const payload = { ...certificateData };

//     delete payload.recipientName;
//     delete payload.certificateType;
//     delete payload.completionDate;

//     if (logoPreview) payload.logoPreview = logoPreview;
//     if (bgPreview) payload.bgPreview = bgPreview;

//     try {
//       const res = await axios.post(`${base_url}/save-certificate-data`, payload);
//       if (res.status === 200) {
//         setSaveStatus('Data saved to database successfully!');
//         setTimeout(() => setSaveStatus(''), 3000);
//       }
//     } catch (error) {
//       console.error(error);
//       setSaveStatus('Error saving data.');
//     }
//   };

//   const generatePDF = async () => {
//     const element = certificateRef.current;
//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       orientation: 'landscape',
//       unit: 'px',
//       format: [canvas.width, canvas.height],
//     });
//     pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//     pdf.save(`${certificateData.recipientName}-certificate.pdf`);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.heading}>Certificate Generator</h2>
        
//         <div style={styles.formGrid}>
//           <div style={styles.formColumn}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Recipient Name</label>
//               <input
//                 type="text"
//                 name="recipientName"
//                 value={certificateData.recipientName}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Certificate Type</label>
//               <input
//                 type="text"
//                 name="certificateType"
//                 value={certificateData.certificateType}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Company Name</label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={certificateData.companyName}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea
//                 name="description"
//                 value={certificateData.description}
//                 onChange={handleInputChange}
//                 style={{...styles.input, height: '100px'}}
//                 rows="4"
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Completion Date</label>
//               <input
//                 type="date"
//                 name="completionDate"
//                 value={certificateData.completionDate}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
//           </div>
          
//           <div style={styles.formColumn}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>First Signer Name</label>
//               <input
//                 type="text"
//                 name="signerName1"
//                 value={certificateData.signerName1}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>First Signer Title</label>
//               <input
//                 type="text"
//                 name="signerTitle1"
//                 value={certificateData.signerTitle1}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Second Signer Name</label>
//               <input
//                 type="text"
//                 name="signerName2"
//                 value={certificateData.signerName2}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Second Signer Title</label>
//               <input
//                 type="text"
//                 name="signerTitle2"
//                 value={certificateData.signerTitle2}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
            
//             <div style={styles.colorGroup}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Text Color</label>
//                 <div style={styles.colorInputWrapper}>
//                   <input
//                     type="color"
//                     name="textColor"
//                     value={certificateData.textColor}
//                     onChange={handleInputChange}
//                     style={styles.colorPicker}
//                   />
//                   <input
//                     type="text"
//                     name="textColor"
//                     value={certificateData.textColor}
//                     onChange={handleInputChange}
//                     style={styles.colorInput}
//                   />
//                 </div>
//               </div>
              
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Accent Color</label>
//                 <div style={styles.colorInputWrapper}>
//                   <input
//                     type="color"
//                     name="accentColor"
//                     value={certificateData.accentColor}
//                     onChange={handleInputChange}
//                     style={styles.colorPicker}
//                   />
//                   <input
//                     type="text"
//                     name="accentColor"
//                     value={certificateData.accentColor}
//                     onChange={handleInputChange}
//                     style={styles.colorInput}
//                   />
//                 </div>
//               </div>
              
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Background Color</label>
//                 <div style={styles.colorInputWrapper}>
//                   <input
//                     type="color"
//                     name="bgColor"
//                     value={certificateData.bgColor}
//                     onChange={handleInputChange}
//                     style={styles.colorPicker}
//                   />
//                   <input
//                     type="text"
//                     name="bgColor"
//                     value={certificateData.bgColor}
//                     onChange={handleInputChange}
//                     style={styles.colorInput}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div style={styles.fileUploads}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Upload Logo</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleLogoUpload}
//               style={styles.fileInput}
//             />
//             {logoPreview && (
//               <div style={styles.previewContainer}>
//                 <img src={logoPreview} alt="Logo Preview" style={styles.previewImage} />
//               </div>
//             )}
//           </div>
          
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Upload Background Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBackgroundUpload}
//               style={styles.fileInput}
//             />
//             {bgPreview && (
//               <div style={styles.previewContainer}>
//                 <img src={bgPreview} alt="Background Preview" style={styles.previewImage} />
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div style={styles.buttonContainer}>
//           <button
//             onClick={saveData}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Save Data
//           </button>

//           <button
//             onClick={generatePDF}
//             style={styles.button}
//           >
//             Generate PDF
//           </button>
//         </div>

//         {saveStatus && (
//           <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center">
//             {saveStatus}
//           </div>
//         )}
//       </div>
      
//       <div style={styles.certificateContainer} ref={certificateRef}>
//         <Certificate 
//           {...certificateData}
//           logoImage={logoPreview}
//           backgroundImage={bgPreview}
//         />
//       </div>
//     </div>
//   );
// };

// const formatDate = (dateString) => {
//   if (!dateString) return '';
  
//   const date = new Date(dateString);
  
//   // Format as "Month Day, Year"
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// };

// const Certificate = ({
//   recipientName,
//   description,
//   signerName1,
//   signerTitle1,
//   signerName2,
//   signerTitle2,
//   certificateType,
//   companyName,
//   completionDate,
//   textColor,
//   accentColor,
//   bgColor,
//   logoImage,
//   backgroundImage
// }) => {
  
//   const formattedDate = formatDate(completionDate);
  
//   const certificateStyle = {
//     ...styles.certificate,
//     color: textColor,
//     backgroundColor: bgColor,
//     backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'url(/api/placeholder/1100/800)',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     position: 'relative'
//   };
  
//   return (
//     <div style={certificateStyle}>
//       {/* Diagonal white background pattern - simulated with a pseudo-element in actual CSS */}
//       <div style={styles.diagonalPattern}></div>
      
//       {/* Left corner design */}
//       <div style={styles.leftCorner}></div>
      
//       {/* Right corner design */}
//       <div style={styles.rightCorner}></div>
    
//       {/* Header */}
//       <div style={styles.header}>
//         {logoImage ? (
//           <div style={styles.logoContainer}>
//             <img src={logoImage} alt="Company Logo" style={styles.logo} />
//             <div style={styles.companyName}>{companyName}</div>
//           </div>
//         ) : (
//           <div style={styles.logoContainer}>
//             <div style={styles.defaultLogo}>
//               <div style={{...styles.diamondShape, borderColor: textColor}}>
//                 <div style={{...styles.innerDiamond, backgroundColor: accentColor}}></div>
//               </div>
//             </div>
//             <div style={styles.companyName}>{companyName}</div>
//           </div>
//         )}
        
//         <div style={styles.certificateTitleContainer}>
//           <h1 style={{...styles.certificateTitle, color: textColor}}>CERTIFICATE</h1>
//           <h2 style={{...styles.certificateSubtitle, color: textColor}}>OF {certificateType}</h2>
//         </div>
        
//         <div style={styles.sealContainer}>
//           <div style={{...styles.seal, backgroundColor: accentColor}}>
//             <div style={styles.sealInner}></div>
//             <div style={styles.ribbon1}></div>
//             <div style={styles.ribbon2}></div>
//           </div>
//         </div>
//       </div>
      
//       {/* Body */}
//       <div style={styles.body}>
//         <p style={styles.recognition}>This is to recognize and honor</p>
        
//         <h2 style={{...styles.recipientName, borderColor: textColor}}>{recipientName}</h2>
        
//         <p style={styles.description}>{description}</p>
        
//         <p style={styles.date}>{formattedDate}</p>
//       </div>
      
//       {/* Footer with signatures */}
//       <div style={styles.footer}>
//         <div style={styles.signature}>
//           <div style={{...styles.signatureLine, backgroundColor: textColor}}></div>
//           <h3 style={styles.signerName}>{signerName1}</h3>
//           <p style={styles.signerTitle}>{signerTitle1}</p>
//         </div>
        
//         <div style={styles.signature}>
//           <div style={{...styles.signatureLine, backgroundColor: textColor}}></div>
//           <h3 style={styles.signerName}>{signerName2}</h3>
//           <p style={styles.signerTitle}>{signerTitle2}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px'
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     padding: '30px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     marginBottom: '40px'
//   },
//   heading: {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     marginBottom: '24px',
//     color: '#333'
//   },
//   formGrid: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: '20px',
//     marginBottom: '20px'
//   },
//   formColumn: {
//     flex: '1 1 400px',
//     minWidth: '300px'
//   },
//   formGroup: {
//     marginBottom: '16px'
//   },
//   label: {
//     display: 'block',
//     marginBottom: '8px',
//     fontWeight: '600',
//     fontSize: '15px',
//     color: '#555'
//   },
//   input: {
//     width: '100%',
//     padding: '10px 12px',
//     fontSize: '16px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     boxSizing: 'border-box'
//   },
//   colorGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px'
//   },
//   colorInputWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px'
//   },
//   colorPicker: {
//     width: '40px',
//     height: '40px',
//     border: 'none',
//     padding: '0',
//     backgroundColor: 'transparent',
//     cursor: 'pointer'
//   },
//   colorInput: {
//     flex: '1',
//     padding: '10px 12px',
//     border: '1px solid #ddd',
//     borderRadius: '4px',
//     fontSize: '16px'
//   },
//   fileUploads: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: '20px',
//     marginTop: '20px'
//   },
//   fileInput: {
//     display: 'block',
//     width: '100%',
//     padding: '10px 0',
//     marginBottom: '10px'
//   },
//   previewContainer: {
//     width: '100px',
//     height: '100px',
//     border: '1px solid #ddd',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     borderRadius: '4px'
//   },
//   previewImage: {
//     maxWidth: '100%',
//     maxHeight: '100%'
//   },
//   buttonContainer: {
//     marginTop: '30px',
//     display: 'flex',
//     justifyContent: 'flex-start'
//   },
//   button: {
//     backgroundColor: '#003876',
//     color: 'white',
//     border: 'none',
//     padding: '12px 24px',
//     borderRadius: '4px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s'
//   },
//   certificateContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '40px'
//   },
  
//   // Certificate Styles
//   certificate: {
//     width: '1100px',
//     height: '800px',
//     position: 'relative',
//     backgroundColor: '#ffffff',
//     border: '1px solid #000',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//     padding: '40px',
//     boxSizing: 'border-box',
//     overflow: 'hidden',
//     fontFamily: 'Arial, sans-serif'
//   },
//   diagonalPattern: {
//     position: 'absolute',
//     top: '0',
//     left: '0',
//     width: '100%',
//     height: '100%',
//     backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95) 75%, transparent 75%)',
//     backgroundSize: '40px 40px',
//     zIndex: '1'
//   },
//   leftCorner: {
//     position: 'absolute',
//     bottom: '0',
//     left: '0',
//     width: '0',
//     height: '0',
//     borderStyle: 'solid',
//     borderWidth: '250px 0 0 350px',
//     borderColor: 'transparent transparent transparent #0077c2',
//     zIndex: '2'
//   },
//   rightCorner: {
//     position: 'absolute',
//     bottom: '0',
//     right: '0',
//     width: '0',
//     height: '0',
//     borderStyle: 'solid',
//     borderWidth: '0 0 250px 350px',
//     borderColor: 'transparent transparent #00308F transparent',
//     zIndex: '2'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '20px',
//     position: 'relative',
//     zIndex: '3'
//   },
//   logoContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '150px'
//   },
//   logo: {
//     width: '80px',
//     height: '80px',
//     objectFit: 'contain'
//   },
//   defaultLogo: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80px',
//     height: '80px'
//   },
//   diamondShape: {
//     width: '60px',
//     height: '60px',
//     transform: 'rotate(45deg)',
//     position: 'relative',
//     border: '2px solid #003876',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   innerDiamond: {
//     width: '30px',
//     height: '30px',
//     backgroundColor: '#D4AF37'
//   },
//   companyName: {
//     marginTop: '10px',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   certificateTitleContainer: {
//     textAlign: 'center',
//     flex: '1'
//   },
//   certificateTitle: {
//     fontSize: '54px',
//     fontWeight: 'bold',
//     margin: '0 0 5px 0',
//     letterSpacing: '2px'
//   },
//   certificateSubtitle: {
//     fontSize: '24px',
//     fontWeight: 'normal',
//     margin: '0',
//     letterSpacing: '1px'
//   },
//   sealContainer: {
//     width: '150px',
//     display: 'flex',
//     justifyContent: 'flex-end'
//   },
//   seal: {
//     width: '100px',
//     height: '100px',
//     borderRadius: '50%',
//     backgroundColor: '#D4AF37',
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   sealInner: {
//     width: '80px',
//     height: '80px',
//     borderRadius: '50%',
//     background: 'radial-gradient(circle, #f0d78c 0%, #D4AF37 100%)'
//   },
//   ribbon1: {
//     position: 'absolute',
//     bottom: '-20px',
//     right: '20px',
//     width: '15px',
//     height: '40px',
//     backgroundColor: '#D4AF37',
//     transform: 'rotate(30deg)'
//   },
//   ribbon2: {
//     position: 'absolute',
//     bottom: '-20px',
//     right: '35px',
//     width: '15px',
//     height: '40px',
//     backgroundColor: '#D4AF37',
//     transform: 'rotate(-30deg)'
//   },
//   body: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px 100px',
//     position: 'relative',
//     zIndex: '3'
//   },
//   recognition: {
//     fontSize: '18px',
//     textAlign: 'center',
//     margin: '20px 0'
//   },
//   recipientName: {
//     fontSize: '48px',
//     fontWeight: 'normal',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     margin: '20px 0',
//     padding: '15px 0',
//     borderTop: '1px solid',
//     borderBottom: '1px solid',
//     width: '100%'
//   },
//   description: {
//     fontSize: '18px',
//     lineHeight: '1.5',
//     textAlign: 'center',
//     margin: '30px 0',
//     maxWidth: '700px'
//   },
//   date: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     margin: '20px 0'
//   },
//   footer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '60%',
//     margin: '0px auto 0',
//     position: 'relative',
//     zIndex: '3',
//   },
//   signature: {
//     width: '200px',
//     textAlign: 'center'
//   },
//   signatureLine: {
//     width: '100%',
//     height: '1px',
//     backgroundColor: '#000',
//     margin: '0 0 10px 0'
//   },
//   signerName: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     margin: '5px 0'
//   },
//   signerTitle: {
//     fontSize: '16px',
//     margin: '5px 0'
//   }
// };

// export default CertificateGenerator;




import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import CertificateDesign1 from './CertificateDesign1'
import CertificateDesign2 from './CertificateDesign2';
import CertificateDesign3 from './CertificateDesign3';




const CertificateGenerator = ({ recipientName = '', certificateType = '', completionDate = '', description = '' }) => {
  const [certificateData, setCertificateData] = useState({
    recipientName: 'Vivek Kumar Gupta',
    description: 'For outstanding achievement and dedication to excellence.',
    signerName1: 'Bruce Wayne',
    signerTitle1: 'Chief Executive Officer',
    signerName2: 'Virat Kohli',
    signerTitle2: 'General Manager',
    certificateType: '',
    companyName: 'TALENTS BUILDER',
    completionDate: '',
    textColor: '#003876',
    accentColor: '#D4AF37',
    bgColor: '#ffffff'
  });

  const [logoImage, setLogoImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [badgeImage, setBadgeImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [bgPreview, setBgPreview] = useState('');
  const [badgePreview, setBadgePreview] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const certificateRef = useRef();
  const [selectedDesign, setSelectedDesign] = useState('design1'); // Default to design1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${base_url}/get-certificate-data`);
        const data = res.data;

        if (data) {
          const { logoPreview, bgPreview, badgePreview, ...rest } = data;
          setCertificateData(prev => ({ ...prev, ...rest }));
          if (logoPreview) setLogoPreview(logoPreview);
          if (bgPreview) setBgPreview(bgPreview);
          if (badgePreview) setBadgePreview(badgePreview);
        }
      } catch (err) {
        console.error('Error fetching certificate data:', err);
      }
    };

    fetchData();
  }, []);

  // Effect to update props when they change
  useEffect(() => {
    const updates = {};
    
    if (recipientName) {
      updates.recipientName = recipientName;
    }
    
    if (certificateType) {
      updates.certificateType = certificateType;
    }
    
    if (completionDate) {
      updates.completionDate = completionDate;
    }

    if(description) {
      updates.description = description;
    }
    
    if (Object.keys(updates).length > 0) {
      setCertificateData(prevData => ({
        ...prevData,
        ...updates
      }));
    }
  }, [recipientName, certificateType, completionDate, description]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBadgeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBadgeImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBadgePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogoImage = async () => {
    setLogoImage(null);
    setLogoPreview('');
    
    try {
      const payload = { ...certificateData };
      delete payload.recipientName;
      delete payload.certificateType;
      delete payload.completionDate;
      
      payload.logoPreview = ''; // Clear the logo in database
      
      if (bgPreview) payload.bgPreview = bgPreview;
      if (badgePreview) payload.badgePreview = badgePreview;
      
      const res = await axios.post(`${base_url}/save-certificate-data`, payload);
      if (res.status === 200) {
        setSaveStatus('Logo removed successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setSaveStatus('Error removing logo.');
    }
  };

  const removeBackgroundImage = async () => {
    setBackgroundImage(null);
    setBgPreview('');
    
    try {
      const payload = { ...certificateData };
      delete payload.recipientName;
      delete payload.certificateType;
      delete payload.completionDate;
      
      if (logoPreview) payload.logoPreview = logoPreview;
      payload.bgPreview = ''; // Clear the background in database
      if (badgePreview) payload.badgePreview = badgePreview;
      
      const res = await axios.post(`${base_url}/save-certificate-data`, payload);
      if (res.status === 200) {
        setSaveStatus('Background image removed successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setSaveStatus('Error removing background image.');
    }
  };

  const removeBadgeImage = async () => {
    setBadgeImage(null);
    setBadgePreview('');
    
    try {
      const payload = { ...certificateData };
      delete payload.recipientName;
      delete payload.certificateType;
      delete payload.completionDate;
      
      if (logoPreview) payload.logoPreview = logoPreview;
      if (bgPreview) payload.bgPreview = bgPreview;
      payload.badgePreview = ''; // Clear the badge in database
      
      const res = await axios.post(`${base_url}/save-certificate-data`, payload);
      if (res.status === 200) {
        setSaveStatus('Badge image removed successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setSaveStatus('Error removing badge image.');
    }
  };

  const saveData = async () => {
    const payload = { ...certificateData };

    delete payload.recipientName;
    delete payload.certificateType;
    delete payload.completionDate;

    if (logoPreview) payload.logoPreview = logoPreview;
    if (bgPreview) payload.bgPreview = bgPreview;
    if (badgePreview) payload.badgePreview = badgePreview;

    try {
      const res = await axios.post(`${base_url}/save-certificate-data`, payload);
      if (res.status === 200) {
        setSaveStatus('Data saved to database successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setSaveStatus('Error saving data.');
    }
  };

  const generatePDF = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${certificateData.recipientName}-certificate.pdf`);
  };

  // Styles for image preview containers
  const imagePreviewContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    marginTop: '10px'
  };

  const removeButtonStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#ff4d4f',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '2px solid white',
    boxShadow: '0 0 3px rgba(0,0,0,0.3)'
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Certificate Generator</h2>
        
        <div style={styles.formGrid}>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={certificateData.recipientName}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Certificate Type</label>
              <input
                type="text"
                name="certificateType"
                value={certificateData.certificateType}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>



            
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={certificateData.companyName}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={certificateData.description}
                onChange={handleInputChange}
                style={{...styles.input, height: '100px'}}
                rows="4"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={certificateData.completionDate}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          </div>
          
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Signer Name</label>
              <input
                type="text"
                name="signerName1"
                value={certificateData.signerName1}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>First Signer Title</label>
              <input
                type="text"
                name="signerTitle1"
                value={certificateData.signerTitle1}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Second Signer Name</label>
              <input
                type="text"
                name="signerName2"
                value={certificateData.signerName2}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Second Signer Title</label>
              <input
                type="text"
                name="signerTitle2"
                value={certificateData.signerTitle2}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.colorGroup}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Text Color</label>
                <div style={styles.colorInputWrapper}>
                  <input
                    type="color"
                    name="textColor"
                    value={certificateData.textColor}
                    onChange={handleInputChange}
                    style={styles.colorPicker}
                  />
                  <input
                    type="text"
                    name="textColor"
                    value={certificateData.textColor}
                    onChange={handleInputChange}
                    style={styles.colorInput}
                  />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Accent Color</label>
                <div style={styles.colorInputWrapper}>
                  <input
                    type="color"
                    name="accentColor"
                    value={certificateData.accentColor}
                    onChange={handleInputChange}
                    style={styles.colorPicker}
                  />
                  <input
                    type="text"
                    name="accentColor"
                    value={certificateData.accentColor}
                    onChange={handleInputChange}
                    style={styles.colorInput}
                  />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Background Color</label>
                <div style={styles.colorInputWrapper}>
                  <input
                    type="color"
                    name="bgColor"
                    value={certificateData.bgColor}
                    onChange={handleInputChange}
                    style={styles.colorPicker}
                  />
                  <input
                    type="text"
                    name="bgColor"
                    value={certificateData.bgColor}
                    onChange={handleInputChange}
                    style={styles.colorInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.fileUploads}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={styles.fileInput}
            />
            {logoPreview && (
              <div style={imagePreviewContainerStyle}>
                <img src={logoPreview} alt="Logo Preview" style={styles.previewImage} />
                <div style={removeButtonStyle} onClick={removeLogoImage}>✕</div>
              </div>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              style={styles.fileInput}
            />
            {bgPreview && (
              <div style={imagePreviewContainerStyle}>
                <img src={bgPreview} alt="Background Preview" style={styles.previewImage} />
                <div style={removeButtonStyle} onClick={removeBackgroundImage}>✕</div>
              </div>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Badge/Seal Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBadgeUpload}
              style={styles.fileInput}
            />
            {badgePreview && (
              <div style={imagePreviewContainerStyle}>
                <img src={badgePreview} alt="Badge Preview" style={styles.previewImage} />
                <div style={removeButtonStyle} onClick={removeBadgeImage}>✕</div>
              </div>
            )}
          </div>
        </div>
        
        <div style={styles.buttonContainer}>
          <button
            onClick={saveData}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Data
          </button>

          <button
            onClick={generatePDF}
            style={styles.button}
          >
            Generate PDF
          </button>
        </div>




        <div style={styles.formGroup}>
  <label style={styles.label}>Certificate Design</label>
  <select
    value={selectedDesign}
    onChange={(e) => setSelectedDesign(e.target.value)}
    style={styles.input}
  >
    <option value="default">Default Design</option>
    <option value="design1">Design 1 (Classic)</option>
    <option value="design2">Design 2 (Modern)</option>
    <option value="design3">Design 3 (Elegant)</option>
  </select>
</div>


        {saveStatus && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center">
            {saveStatus}
          </div>
        )}
      </div>

      
      
      <div style={styles.certificateContainer} ref={certificateRef}>
  {selectedDesign === 'default' && (
    <Certificate 
      {...certificateData}
      logoImage={logoPreview}
      backgroundImage={bgPreview}
      badgeImage={badgePreview}
    />
  )}
  {selectedDesign === 'design1' && (
    <CertificateDesign1 
      {...certificateData}
      logoImage={logoPreview}
      backgroundImage={bgPreview}
      badgeImage={badgePreview}
    />
  )}
  {selectedDesign === 'design2' && (
    <CertificateDesign2 
      {...certificateData}
      logoImage={logoPreview}
      backgroundImage={bgPreview}
      badgeImage={badgePreview}
    />
  )}
  {selectedDesign === 'design3' && (
    <CertificateDesign3 
      {...certificateData}
      logoImage={logoPreview}
      backgroundImage={bgPreview}
      badgeImage={badgePreview}
    />
  )}
</div>




    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Format as "Month Day, Year"
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Certificate = ({
  recipientName,
  description,
  signerName1,
  signerTitle1,
  signerName2,
  signerTitle2,
  certificateType,
  companyName,
  completionDate,
  textColor,
  accentColor,
  bgColor,
  logoImage,
  backgroundImage,
  badgeImage
}) => {
  
  const formattedDate = formatDate(completionDate);
  
  const certificateStyle = {
    ...styles.certificate,
    color: textColor,
    backgroundColor: bgColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  };
  
  return (
    <div style={certificateStyle}>
      {/* Diagonal white background pattern - simulated with a pseudo-element in actual CSS */}
      <div style={styles.diagonalPattern}></div>
      
      {/* Left corner design */}
      <div style={styles.leftCorner}></div>
      
      {/* Right corner design */}
      <div style={styles.rightCorner}></div>
    
      {/* Header */}
      <div style={styles.header}>
        {logoImage ? (
          <div style={styles.logoContainer}>
            <img src={logoImage} alt="Company Logo" style={styles.logo} />
            <div style={styles.companyName}>{companyName}</div>
          </div>
        ) : (
          <div style={styles.logoContainer}>
            <div style={styles.defaultLogo}>
              <div style={{...styles.diamondShape, borderColor: textColor}}>
                <div style={{...styles.innerDiamond, backgroundColor: accentColor}}></div>
              </div>
            </div>
            <div style={styles.companyName}>{companyName}</div>
          </div>
        )}
        
        <div style={styles.certificateTitleContainer}>
          <h1 style={{...styles.certificateTitle, color: textColor}}>CERTIFICATE</h1>
          <h2 style={{...styles.certificateSubtitle, color: textColor}}>OF {certificateType}</h2>
        </div>
        
        {/* Badge/Seal container */}
        <div style={styles.sealContainer}>
          {badgeImage ? (
            <img src={badgeImage} alt="Certificate Badge" style={styles.badgeImage} />
          ) : (
            <div style={{...styles.seal, backgroundColor: accentColor}}>
              <div style={styles.sealInner}></div>
              <div style={styles.ribbon1}></div>
              <div style={styles.ribbon2}></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Body */}
      <div style={styles.body}>
        <p style={styles.recognition}>This is to recognize and honor</p>
        
        <h2 style={{...styles.recipientName, borderColor: textColor}}>{recipientName}</h2>
        
        <p style={styles.description}>{description}</p>
        
        <p style={styles.date}>{formattedDate}</p>
      </div>
      
      {/* Footer with signatures */}
      <div style={styles.footer}>
        <div style={styles.signature}>
          <div style={{...styles.signatureLine, backgroundColor: textColor}}></div>
          <h3 style={styles.signerName}>{signerName1}</h3>
          <p style={styles.signerTitle}>{signerTitle1}</p>
        </div>
        
        <div style={styles.signature}>
          <div style={{...styles.signatureLine, backgroundColor: textColor}}></div>
          <h3 style={styles.signerName}>{signerName2}</h3>
          <p style={styles.signerTitle}>{signerTitle2}</p>
        </div>
      </div>
    </div>
  );
};

// Maintain the same styles object from the original component
const styles = {
  container: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#333'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
    '&:focus': {
      borderColor: '#4a90e2'
    }
  },
  colorGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  colorInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  colorPicker: {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    background: 'transparent'
  },
  colorInput: {
    width: 'calc(100% - 50px)',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  fileUploads: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  fileInput: {
    display: 'block',
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  previewContainer: {
    marginTop: '10px'
  },
  previewImage: {
    width: '120px',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  badgeImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain'
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '15px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#3a7bc8'
    }
  },
  certificateContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: '1100px',
    aspectRatio: '1.4',
    margin: '0 auto'
  },
  
  // Certificate styles
  certificate: {
    width: '100%',
    height: '100%',
    border: '20px solid #fff',
    backgroundColor: '#ffffff',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    padding: '40px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  diagonalPattern: {
    position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.95) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95) 75%, transparent 75%)',
      backgroundSize: '40px 40px',
      zIndex: '1'
  },
  leftCorner: {
    position: 'absolute',
      bottom: '0',
      left: '0',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '250px 0 0 350px',
      borderColor: 'transparent transparent transparent #0077c2',
      zIndex: '2'
  },
  rightCorner: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '0 0 250px 350px',
      borderColor: 'transparent transparent #00308F transparent',
      zIndex: '2'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '50px',
    position: 'relative',
    zIndex: 2
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  logo: {
    width: '80px',
    height: '80px',
    objectFit: 'contain'
  },
  defaultLogo: {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  diamondShape: {
    width: '50px',
    height: '50px',
    transform: 'rotate(45deg)',
    borderWidth: '3px',
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerDiamond: {
    width: '30px',
    height: '30px'
  },
  companyName: {
    marginTop: '10px',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center'
  },
  certificateTitleContainer: {
    textAlign: 'center'
  },
  certificateTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '5px',
    letterSpacing: '4px'
  },
  certificateSubtitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    letterSpacing: '2px'
  },
  sealContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seal: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sealInner: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '2px dashed rgba(255,255,255,0.8)'
  },
  ribbon1: {
    position: 'absolute',
    bottom: '-20px',
    right: '15px',
    width: '15px',
    height: '40px',
    backgroundColor: '#aaa',
    transform: 'rotate(15deg)'
  },
  ribbon2: {
    position: 'absolute',
    bottom: '-20px',
    left: '15px',
    width: '15px',
    height: '40px',
    backgroundColor: '#aaa',
    transform: 'rotate(-15deg)'
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    textAlign: 'center'
  },
  recognition: {
    fontSize: '20px',
    marginBottom: '20px'
  },
  recipientName: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '20px',
    padding: '10px 40px',
    borderBottom: '2px solid'
  },
  description: {
    fontSize: '18px',
    maxWidth: '80%',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  date: {
    fontSize: '18px',
    fontStyle: 'italic',
    marginBottom: '20px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    margin: '0 auto 20px auto',
    position: 'relative',
    zIndex: 2
  },
  signature: {
    width: '200px',
    textAlign: 'center'
  },
  signatureLine: {
    width: '100%',
    height: '2px',
    marginBottom: '10px'
  },
  signerName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  signerTitle: {
    fontSize: '16px',
    fontStyle: 'italic'
  }
};

export default CertificateGenerator;

