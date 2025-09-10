// CertificateDesign1.js – Enhanced Classic Blue-Gold Design with Top-Left Logo
const CertificateDesign1 = ({
  recipientName,
  certificateType,
  description,
  completionDate,
  companyName,
  signerName1,
  signerTitle1,
  signerName2,
  signerTitle2,
  textColor = '#003876',
  accentColor = '#D4AF37',
  bgColor = '#ffffff',
  logoImage,
  backgroundImage,
  badgeImage
}) => {
  const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      style={{
        color: textColor,
        backgroundColor: bgColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: `20px solid ${accentColor}`,
        padding: '60px',
        fontFamily: '"Times New Roman", serif',
        position: 'relative',
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        maxWidth: '900px',
        margin: '0 auto',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundClip: 'padding-box',
        borderImage: `linear-gradient(45deg, ${accentColor}, #f5d78e, ${accentColor}) 30`,
        borderImageSlice: 1
      }}
    >
      {/* Header with logo positioned top-left */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {logoImage ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src={logoImage} 
              alt="Company Logo" 
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain'
              }} 
            />
            <div style={{
              marginTop: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {companyName}
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                transform: 'rotate(45deg)',
                border: `2px solid ${textColor}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: accentColor
                }}></div>
              </div>
            </div>
            <div style={{
              marginTop: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {companyName}
            </div>
          </div>
        )}
      </div>

      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        borderLeft: `3px solid ${accentColor}`,
        borderTop: `3px solid ${accentColor}`
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRight: `3px solid ${accentColor}`,
        borderTop: `3px solid ${accentColor}`
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        borderLeft: `3px solid ${accentColor}`,
        borderBottom: `3px solid ${accentColor}`
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRight: `3px solid ${accentColor}`,
        borderBottom: `3px solid ${accentColor}`
      }}></div>

      {/* Certificate header */}
      <h1 style={{ 
        fontSize: '42px', 
        letterSpacing: '4px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        CERTIFICATE
      </h1>
      
      <h2 style={{ 
        fontSize: '28px', 
        marginBottom: '40px',
        fontWeight: 'normal',
        fontStyle: 'italic',
        color: accentColor
      }}>
        of {certificateType.toUpperCase()}
      </h2>

      {/* Badge/Seal positioned top-right */}
      {badgeImage && (
        <img
          src={badgeImage}
          alt="Badge"
          style={{ 
            width: '90px', 
            height: '90px', 
            position: 'absolute', 
            top: '40px', 
            right: '40px',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}
        />
      )}

      {/* Recipient section */}
      <p style={{ 
        fontSize: '18px',
        marginBottom: '10px'
      }}>
        This certificate is proudly presented to
      </p>
      
      <h2 style={{ 
        fontSize: '32px', 
        borderBottom: `2px solid ${accentColor}`, 
        display: 'inline-block', 
        padding: '0 30px 10px 30px',
        margin: '20px 0',
        fontWeight: 'bold',
        fontStyle: 'italic'
      }}>
        {recipientName}
      </h2>

      {/* Description */}
      <p style={{ 
        margin: '30px auto',
        fontSize: '18px',
        lineHeight: '1.6',
        maxWidth: '700px'
      }}>
        {description}
      </p>

      {/* Date */}
      <p style={{ 
        fontStyle: 'italic', 
        marginBottom: '40px',
        fontSize: '16px'
      }}>
        {formattedDate}
      </p>

      {/* Signatures */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around',
        marginTop: 'auto',
        paddingTop: '40px'
      }}>
        <div style={{ width: '200px' }}>
          <div style={{ 
            width: '150px', 
            height: '2px', 
            backgroundColor: textColor, 
            margin: '0 auto 10px auto',
            opacity: 0.7
          }}></div>
          <p style={{ fontWeight: 'bold' }}>{signerName1}</p>
          <p style={{ fontSize: '14px', fontStyle: 'italic' }}>{signerTitle1}</p>
        </div>

        <div style={{ width: '200px' }}>
          <div style={{ 
            width: '150px', 
            height: '2px', 
            backgroundColor: textColor, 
            margin: '0 auto 10px auto',
            opacity: 0.7
          }}></div>
          <p style={{ fontWeight: 'bold' }}>{signerName2}</p>
          <p style={{ fontSize: '14px', fontStyle: 'italic' }}>{signerTitle2}</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateDesign1;