const CertificateDesign2 = ({
  recipientName,
  certificateType,
  description,
  completionDate,
  companyName,
  signerName1,
  signerTitle1,
  signerName2,
  signerTitle2,
  textColor = '#1e3a8a',
  accentColor = '#d4af37',
  bgColor = '#fdfcf9',
  logoImage,
  backgroundImage
}) => {
  const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{
      background: `repeating-linear-gradient(45deg, #fff9e6, #fff9e6 10px, #fbeec1 10px, #fbeec1 20px)`,
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        color: textColor,
        backgroundColor: bgColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '1000px',
        height: '650px',
        fontFamily: '"Crimson Text", Georgia, serif',
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '20px double #d4af37',
        boxShadow: '0 0 25px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.2)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>

        {/* Logo Top Left */}
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                  alignItems: 'center',
                  backgroundColor: accentColor
                }}></div>
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

        {/* Certificate Title */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: textColor,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: '"Playfair Display", serif'
        }}>
          Certificate of {certificateType}
        </h1>

        <div style={{
          width: '120px',
          height: '5px',
          backgroundColor: accentColor,
          margin: '0 auto 20px',
          borderRadius: '2px'
        }}></div>

        {/* Recipient Name */}
        <p style={{ fontSize: '20px', fontStyle: 'italic', color: textColor }}>
          This is to certify that
        </p>

        <h2 style={{
          fontSize: '38px',
          fontWeight: 'bold',
          margin: '20px 0',
          paddingBottom: '10px',
          position: 'relative',
          fontFamily: '"Playfair Display", serif',
          color: textColor
        }}>
          {recipientName}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '25%',
            width: '50%',
            height: '2px',
            background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`
          }}></div>
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '18px',
          maxWidth: '800px',
          margin: '0 auto 30px',
          color: textColor,
          lineHeight: '1.6'
        }}>
          {description}
        </p>

        {/* Date */}
        <p style={{
          fontSize: '16px',
          fontStyle: 'italic',
          marginBottom: '30px',
          color: textColor
        }}>
          Awarded on {formattedDate}
        </p>

        {/* Signatures */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: `1px solid ${accentColor}`
        }}>
          <div>
            <div style={{
              width: '150px',
              height: '2px',
              background: `linear-gradient(to right, ${textColor}, ${accentColor})`,
              margin: '0 auto 10px'
            }}></div>
            <p style={{ fontWeight: 'bold', color: textColor }}>{signerName1}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: textColor }}>{signerTitle1}</p>
          </div>

          <div>
            <div style={{
              width: '150px',
              height: '2px',
              background: `linear-gradient(to right, ${textColor}, ${accentColor})`,
              margin: '0 auto 10px'
            }}></div>
            <p style={{ fontWeight: 'bold', color: textColor }}>{signerName2}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: textColor }}>{signerTitle2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDesign2;
