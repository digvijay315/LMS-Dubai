import React from 'react';

const PPTPreview = ({ files }) => {
  if (!files || files.length === 0) return null;
  console.log(files);
  
  return (
    <div style={{ marginTop: '1rem' }}>
      {files.map((file, index) => (
        <div 
          key={index} 
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '0.75rem',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Simple document icon using HTML/CSS */}
            <div style={{ 
              width: '32px', 
              height: '40px', 
              border: '2px solid #3b82f6',
              borderRadius: '3px',
              position: 'relative',
              flexShrink: 0
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '0',
                height: '0',
                borderStyle: 'solid',
                borderWidth: '0 10px 10px 0',
                borderColor: 'transparent #3b82f6 transparent transparent'
              }}></div>
            </div>
            <div>
              <p style={{ 
                margin: '0',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#1f2937'
              }}>
                {file.name}
              </p>
              <p style={{ 
                margin: '4px 0 0 0',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PPTPreview;