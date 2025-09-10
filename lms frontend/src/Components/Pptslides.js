import React, { useEffect, useState,useRef } from 'react';

export default function PptSlides({ pptUrl }) {
  const [slides, setSlides] = useState([]);
  
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

useEffect(() => {
  if (!pptUrl) return;

  const fetchSlides = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/convert-ppt?url=${encodeURIComponent(pptUrl)}`);
      console.log(res);
      

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSlides(data.slides || []);
    } catch (error) {
      console.error('Fetch error:', error);
      setSlides([]); // Optionally clear slides on error
    }
  };

  fetchSlides();
}, [pptUrl]);

  if (!slides.length) return <p>Loading slides...</p>;


  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) { /* Firefox */
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { /* IE/Edge */
        containerRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  return (
    <div>
      <button onClick={toggleFullScreen} style={{ marginBottom: 10 }}>
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: isFullScreen ? '100vh' : 'auto',
          backgroundColor: '#000',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: isFullScreen ? '100vh' : 'auto',
              marginBottom: 20,
              objectFit: 'contain',
            }}
          />
        ))}
      </div>
    </div>
  );
}
