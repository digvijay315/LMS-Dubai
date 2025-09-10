import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';

const Certificate = ({
  recipientName = '',
  description,
  certificateType,
  completionDate,
}) => {

  const [certificateData, setCertificateData] = useState({});
    const [logoPreview, setLogoPreview] = useState('');
  const [bgPreview, setBgPreview] = useState('');

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

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${base_url}/get-certificate-data`);
      console.log(res);
      const data = res.data;
      setCertificateData(res.data);

      if (data) {
        const { logoPreview, bgPreview, ...rest } = data;
        setCertificateData(prev => ({ ...prev, ...rest }));
        if (logoPreview) setLogoPreview(logoPreview);
        if (bgPreview) setBgPreview(bgPreview);
      }
    } catch (err) {
      console.error('Error fetching certificate data:', err);
    }
  };

  fetchData();
}, []);

  const formattedDate = formatDate(completionDate);
  
    const certificateStyle = {
    ...styles.certificate,
    color: certificateData.textColor,
    backgroundColor: certificateData.bgColor,
    backgroundImage: certificateData.bgPreview ? `url(${certificateData.bgPreview})` : 'url(/api/placeholder/1100/800)',
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
        {certificateData.logoPreview ? (
          <div style={styles.logoContainer}>
            <img src={certificateData.logoPreview} alt="Company Logo" style={styles.logo} />
            <div style={styles.companyName}>{certificateData.companyName}</div>
          </div>
        ) : (
          <div style={styles.logoContainer}>
            <div style={styles.defaultLogo}>
              <div style={{...styles.diamondShape, borderColor: certificateData.textColor}}>
                <div style={{...styles.innerDiamond, backgroundColor: certificateData.accentColor}}></div>
              </div>
            </div>
            <div style={styles.companyName}>{certificateData.companyName}</div>
          </div>
        )}
        
        <div style={styles.certificateTitleContainer}>
          <h1 style={{...styles.certificateTitle, color: certificateData.textColor}}>CERTIFICATE</h1>
          <h2 style={{...styles.certificateSubtitle, color: certificateData.textColor}}>OF {certificateType}</h2>
        </div>
        
                {/* Badge/Seal container */}
        <div style={styles.sealContainer}>
          {certificateData.badgePreview ? (
            <img src={certificateData.badgePreview} alt="Certificate Badge" style={styles.badgeImage} />
          ) : (
            <div style={{...styles.seal, backgroundColor: certificateData.accentColor}}>
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
        
        <h2 style={{...styles.recipientName, borderColor: certificateData.textColor}}>{recipientName}</h2>
        
        <p style={styles.description}>{description}</p>
        
        <p style={styles.date}>{formattedDate}</p>
      </div>
      
      {/* Footer with signatures */}
      <div style={styles.footer}>
        <div style={styles.signature}>
          <div style={{...styles.signatureLine, backgroundColor: certificateData.textColor}}></div>
          <h3 style={styles.signerName}>{certificateData.signerName1}</h3>
          <p style={styles.signerTitle}>{certificateData.signerTitle1}</p>
        </div>
        
        <div style={styles.signature}>
          <div style={{...styles.signatureLine, backgroundColor: certificateData.textColor}}></div>
          <h3 style={styles.signerName}>{certificateData.signerName2}</h3>
          <p style={styles.signerTitle}>{certificateData.signerTitle2}</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;


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

  // Custom styles
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