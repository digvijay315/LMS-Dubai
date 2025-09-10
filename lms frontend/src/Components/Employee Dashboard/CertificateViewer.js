
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { base_url } from '../Utils/base_url';
// import Certificate from './Certificate';

// const CertificateViewer = ({ certificateId, onClose }) => {
//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCertificate = async () => {
//       try {
//         const response = await axios.get(`${base_url}/certificate/${certificateId}`);
//         setCertificate(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (certificateId) {
//       fetchCertificate();
//     }
//   }, [certificateId]);

//   if (loading) return <div>Loading certificate...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!certificate) return <div>Certificate not found</div>;

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
    
//     const date = new Date(dateString);
    
//     // Format as "Month Day, Year"
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Map certificate data to the Certificate component props
//   const certificateProps = {
//     recipientName: certificate.employee_name,
//     description: `For successfully completing the ${certificate.training_name} training program with a score of ${certificate.score_percentage}%.`,
//     certificateType: certificate.training_name,
//     completionDate: certificate.to_date,    
//   };

//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       padding: '20px',
//     },
//     container: {
//       width: '90%',
//       maxWidth: '1100px',
//       backgroundColor: '#fff',
//       borderRadius: '8px',
//       padding: '20px',
//       maxHeight: '90vh',
//       overflow: 'auto',
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px',
//     },
//     title: {
//       fontSize: '24px',
//       fontWeight: 'bold',
//     },
//     closeButton: {
//       backgroundColor: 'transparent',
//       border: 'none',
//       fontSize: '24px',
//       cursor: 'pointer',
//       color: '#000',
//     },
//     certificateContainer: {
//       width: '100%',
//       marginBottom: '20px',
//     },
//     buttonContainer: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginTop: '20px',
//     },
//     downloadButton: {
//       backgroundColor: '#4CAF50',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//       border: 'none',
//     }
//   };

//   // Function to handle certificate download
//   const handleDownload = async () => {
//     try {
//       window.open(`${base_url}/certificates/download/${certificateId}`, '_blank');
//     } catch (err) {
//       console.error("Error downloading certificate:", err);
//       alert("Failed to download certificate");
//     }
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.container}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>Certificate Preview</h2>
//           <button style={styles.closeButton} onClick={onClose}>&times;</button>
//         </div>
        
//         <div style={styles.certificateContainer}>
//           <Certificate {...certificateProps} />
//           {/* <Certificate/> */}
//         </div>
        
//         <div style={styles.buttonContainer}>
//           <button 
//             style={styles.downloadButton}
//             onClick={handleDownload}
//           >
//             Download Certificate
//           </button>

//           <button 
//             style={{...styles.button, ...styles.closeButton}}
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateViewer;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { base_url } from '../Utils/base_url';
import Certificate from './Certificate';

const CertificateViewer = ({ certificateId, onClose }) => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  
  // Reference to the certificate component for capturing it to PDF
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`${base_url}/certificate/${certificateId}`);
        setCertificate(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (certificateId) {
      fetchCertificate();
    }
  }, [certificateId]);

  if (loading) return <div>Loading certificate...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!certificate) return <div>Certificate not found</div>;

  // Map certificate data to the Certificate component props
  const certificateProps = {
    recipientName: certificate.employee_name,
    description: `For successfully completing the ${certificate.training_name} training program with a score of ${certificate.score_percentage}%.`,
    certificateType: certificate.training_name,
    completionDate: certificate.to_date,    
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    container: {
      width: '90%',
      maxWidth: '1100px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      maxHeight: '90vh',
      overflow: 'auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#000',
    },
    certificateContainer: {
      width: '100%',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    downloadButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      border: 'none',
      opacity: downloading ? 0.7 : 1,
    },
    button: {
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      border: 'none',
    }
  };

  // Function to handle certificate download using html2canvas and jsPDF
  const handleDownload = async () => {
    if (downloading) return;
    
    setDownloading(true);
    
    try {
      // Get the certificate component element
      const element = certificateRef.current;
      if (!element) {
        throw new Error("Certificate element not found");
      }
      
      // Use html2canvas to capture the certificate as an image
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS to load images from external sources
        logging: false, // Disable logging
        backgroundColor: null // Transparent background
      });
      
      // Calculate dimensions for the PDF (maintaining aspect ratio)
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm (210mm × 297mm)
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add the certificate image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Generate filename based on certificate data
      const filename = `Certificate_${certificate.employee_name.replace(/\s+/g, '_')}_${certificate.training_name.replace(/\s+/g, '_')}.pdf`;
      
      // Download the PDF
      pdf.save(filename);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to download certificate: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  // Alternative server-side approach if you prefer using the backend controller
  const handleServerDownload = () => {
    window.open(`${base_url}/certificates/download/${certificateId}`, '_blank');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Certificate Preview</h2>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        
        <div style={styles.certificateContainer}>
          {/* Add ref to the Certificate component */}
          <div ref={certificateRef}>
            <Certificate {...certificateProps} />
          </div>
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            style={styles.downloadButton}
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? 'Generating PDF...' : 'Download Certificate'}
          </button>

          <button 
            style={{...styles.button, backgroundColor: '#f44336', color: 'white'}}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;

