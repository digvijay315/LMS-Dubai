const CertificateDesign3 = ({
  recipientName,
  certificateType,
  description,
  completionDate,
  companyName,
  signerName1,
  signerTitle1,
  signerName2,
  signerTitle2,
  textColor = '#065f46',
  accentColor = '#b45309',
  bgColor = '#f8fafc',
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
    <div style={{
      color: textColor,
      backgroundColor: bgColor,
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '60px',
      fontFamily: '"Cormorant Garamond", serif',
      position: 'relative',
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // Elegant frame design
      border: '20px solid transparent',
      borderImage: `linear-gradient(to right, ${textColor}, ${accentColor}, ${textColor}) 1`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Decorative corner elements */}
      {[1, 2, 3, 4].map((corner) => (
        <div key={corner} style={{
          position: 'absolute',
          width: '60px',
          height: '60px',
          border: `2px solid ${accentColor}`,
          ...(corner === 1 && { top: '20px', left: '20px', borderRight: 'none', borderBottom: 'none' }),
          ...(corner === 2 && { top: '20px', right: '20px', borderLeft: 'none', borderBottom: 'none' }),
          ...(corner === 3 && { bottom: '20px', left: '20px', borderRight: 'none', borderTop: 'none' }),
          ...(corner === 4 && { bottom: '20px', right: '20px', borderLeft: 'none', borderTop: 'none' })
        }}></div>
      ))}

      {/* Logo positioned top-left */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
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
                objectFit: 'contain',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
              }} 
            />
            <div style={{
              marginTop: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: textColor
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
              textAlign: 'center',
              color: textColor
            }}>
              {companyName}
            </div>
          </div>
        )}
      </div>

      {/* Certificate content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '20px'
      }}>
        <h6 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          marginBottom: '10px',
          color: textColor,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Certificate of Achievement
        </h6>
        
        <div style={{
          width: '100px',
          height: '2px',
          backgroundColor: accentColor,
          margin: '0 auto 30px'
        }}></div>
        
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold',
          margin: '20px 0',
          color: textColor,
          position: 'relative'
        }}>
          {recipientName}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '25%',
            width: '50%',
            height: '1px',
            background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`
          }}></div>
        </h2>
        
        <p style={{ 
          fontSize: '18px',
          marginBottom: '10px',
          fontStyle: 'italic',
          color: textColor
        }}>
          For excellence in {certificateType}
        </p>
        
        <p style={{ 
          fontSize: '16px',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '30px auto',
          color: textColor
        }}>
          {description}
        </p>
        
        <p style={{ 
          fontSize: '16px',
          fontStyle: 'italic',
          marginBottom: '40px',
          color: textColor
        }}>
          {formattedDate}
        </p>

        {/* Signatures */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          marginTop: '40px',
          paddingTop: '40px',
          borderTop: `1px solid ${accentColor}`
        }}>
          <div style={{ width: '200px' }}>
            <div style={{ 
              width: '150px', 
              height: '1px', 
              background: `linear-gradient(to right, ${textColor}, ${accentColor})`,
              margin: '0 auto 10px auto'
            }}></div>
            <p style={{ fontWeight: 'bold', color: textColor }}>{signerName1}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: textColor }}>{signerTitle1}</p>
          </div>

          <div style={{ width: '200px' }}>
            <div style={{ 
              width: '150px', 
              height: '1px', 
              background: `linear-gradient(to right, ${textColor}, ${accentColor})`,
              margin: '0 auto 10px auto'
            }}></div>
            <p style={{ fontWeight: 'bold', color: textColor }}>{signerName2}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: textColor }}>{signerTitle2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDesign3;