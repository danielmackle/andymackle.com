import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const mediaItems = [
  { 
    id: 1, 
    type: 'video', 
    title: 'Heart - Alone', 
    description: `• Difficulty: Medium-High\n• Techniques: Melodic string bending, wide vocal-like vibrato, sustained notes, precise pick attacks.\n• Style: Power ballad emotion with clean, soaring articulation.`,
    videoUrl: '/videos/Alone Instagram July 2026.mp4', 
    thumbnail: '/videos/Alone Instagram July 2026.mp4#t=0.5' 
  },
  { 
    id: 2, 
    type: 'video', 
    title: 'Van Halen - Dreams', 
    description: `• Difficulty: High\n• Techniques: Rapid two-handed tapping, high-gain pinch harmonics, whammy bar dives, fast alternate picking runs.\n• Style: High-energy, virtuosic 80s arena rock.`,
    videoUrl: '/videos/Dreams Instagram July 2026.mp4', 
    thumbnail: '/videos/Dreams Instagram July 2026.mp4#t=0.5' 
  },
  { 
    id: 3, 
    type: 'video', 
    title: 'Bon Jovi - Dry County', 
    description: `• Difficulty: Extremely High\n• Techniques: High-speed alternate picking, sweep picking arpeggios, wide interval stretches, aggressive blues-rock bends.\n• Style: Epic rock solo demanding peak stamina and synchronization.`,
    videoUrl: '/videos/Dry County Solo 2 August 2026.mp4', 
    thumbnail: '/videos/Dry County Solo 2 August 2026.mp4#t=0.5' 
  },
  { 
    id: 4, 
    type: 'video', 
    title: 'Pat Benatar - Hit Me With Your Best Shot', 
    description: `• Difficulty: Medium\n• Techniques: Dynamic double stops, melodic hooks, classic rock bends, rapid pentatonic runs.\n• Style: Tight, punchy pop-rock hooks.`,
    videoUrl: '/videos/Hit Me With Your Best Shot Instagram July 2026.mp4', 
    thumbnail: '/videos/Hit Me With Your Best Shot Instagram July 2026.mp4#t=0.5' 
  },
  { 
    id: 5, 
    type: 'video', 
    title: 'Slipping', 
    description: `• Difficulty: Medium\n• Techniques: Rhythmic pocket playing, dynamic slides, melodic double-stops, clean bluesy articulation.\n• Style: Smooth, expressive rock/blues phrasing.`,
    videoUrl: '/videos/Slipping July 2026.mp4', 
    thumbnail: '/videos/Slipping July 2026.mp4#t=0.5' 
  },
  { 
    id: 6, 
    type: 'slideshow', 
    title: 'Custom Frankenstrat Build & Tour', 
    description: 'Take a close look at this custom hand-striped tribute guitar. Featuring heavy relic detailing, accurate 1971 quarter placement, and custom wound humbuckers for the ultimate "brown sound" live performance.',
    images: [
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525201548912-c231bb6578a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80'
  }
];

// Dedicated VideoPlayer component with proper ref handling
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Pause all other videos when this one plays
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      if (video !== videoRef.current) {
        video.pause();
      }
    });

    // Cleanup: pause this video when component unmounts (modal closes)
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [src]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isLoading && (
        <div style={{ color: '#888', fontSize: '0.9rem' }}>Loading video...</div>
      )}
      <video
        ref={videoRef}
        src={src}
        controls
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#000',
          display: hasError ? 'none' : 'block'
        }}
      />
      {hasError && (
        <div style={{ color: '#d11013', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
          Unable to load video. Please check the file path.
        </div>
      )}
    </div>
  );
};

const Slideshow = ({ images, imageZoom = 1, onTouchMove, onTouchEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Slider View */}
      <div
        style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', touchAction: 'none' }}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: imageZoom }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'grab', userSelect: 'none' }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button onClick={prevSlide} style={arrowLeftStyle} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} style={arrowRightStyle} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Control / Progress Bar */}
      <div style={{ padding: '1rem', background: '#09090f', display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid #222' }}>
        <button 
          onClick={() => setIsPaused(!isPaused)} 
          style={playPauseButtonStyle}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? <Play size={16} fill="white" /> : <Pause size={16} fill="white" />}
        </button>

        {/* Progress Bar Container */}
        <div style={{ flex: 1, height: '4px', backgroundColor: '#222', position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
          <motion.div
            key={`${currentIndex}-${isPaused}`}
            initial={{ width: '0%' }}
            animate={isPaused ? { width: '0%' } : { width: '100%' }}
            transition={isPaused ? { duration: 0 } : { duration: 10, ease: 'linear' }}
            onAnimationComplete={() => {
              if (!isPaused) nextSlide();
            }}
            style={{ height: '100%', backgroundColor: 'var(--color-evh-red)' }}
          />
        </div>

        {/* Dot Indicators */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {images.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              style={{
                width: '8px',
                height: '8px',
                padding: 0,
                border: 'none',
                borderRadius: '50%',
                backgroundColor: i === currentIndex ? 'var(--color-evh-red)' : '#444',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset zoom and stop all audio/video when modal closes
  useEffect(() => {
    setImageZoom(1);
    if (!selectedItem) {
      // Stop all videos when modal closes
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
      });
    }
  }, [selectedItem]);

  // Pinch-to-zoom gesture handler using native Touch events
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      // Store initial distance on first pinch
      if (!e.target.dataset.initialDistance) {
        e.target.dataset.initialDistance = distance;
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      const initialDistance = parseFloat(e.target.dataset.initialDistance || 0);
      if (initialDistance > 0 && e.changedTouches.length === 2) {
        const touch1 = e.changedTouches[0];
        const touch2 = e.changedTouches[1];
        const finalDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const scale = finalDistance / initialDistance;
        setImageZoom((prev) => Math.max(1, Math.min(prev * scale, 3)));
      }
      e.target.dataset.initialDistance = '';
    }
  };

  return (
    <section id="gallery" className="section" style={{ backgroundColor: '#0a0a0a' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Media & Gallery
        </motion.h2>

        <motion.div
          className="gallery-grid"
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(e, info) => {
            // Swipe left (negative offset) → scroll gallery
            if (info.offset.x < -50) {
              window.scrollBy({ left: 300, behavior: 'smooth' });
            }
            // Swipe right (positive offset) → scroll back
            if (info.offset.x > 50) {
              window.scrollBy({ left: -300, behavior: 'smooth' });
            }
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
            cursor: 'grab',
            touchAction: 'pan-y'
          }}>
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="jagged-box"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              style={{
                backgroundColor: '#111',
                overflow: 'hidden',
                border: '2px solid #222',
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: '16/10',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-evh-red)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Thumbnail (Video or Image) */}
              {item.type === 'video' ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#1a1a1a',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <video
                    src={item.videoUrl}
                    preload="metadata"
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.6,
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
                    onMouseOut={(e) => e.currentTarget.style.opacity = 0.6}
                    onError={() => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(209, 16, 19, 0.9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                  }}>
                    <Play size={24} fill="white" color="white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.6,
                    transition: 'opacity 0.3s ease',
                    backgroundColor: '#1a1a1a'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 0.6}
                  onError={(e) => {
                    e.target.style.backgroundColor = '#1a1a1a';
                  }}
                />
              )}

              {/* Info Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.2rem',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.95))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}>
                <p style={{ color: 'var(--color-white)', fontSize: '0.95rem', fontWeight: 'bold', margin: 0, textShadow: '1px 1px 2px black' }}>
                  {item.title}
                </p>
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: item.type === 'video' ? 'var(--color-evh-red)' : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-white)',
                  flexShrink: 0
                }}>
                  {item.type === 'video' ? <Play size={16} fill="white" /> : <ImageIcon size={16} />}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            style={modalOverlayStyle}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="jagged-box"
              style={{
                ...modalContentStyle,
                flexDirection: isMobile ? 'column' : 'row',
                height: isMobile ? '90vh' : '80vh'
              }}
            >
              {/* Close button on Left section for visibility */}
              <button style={closeButtonStyle} onClick={() => setSelectedItem(null)} aria-label="Close viewer">
                <X size={24} />
              </button>

              {/* Media Player Pane (Left) */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', height: isMobile ? '55%' : '100%' }}>
                {selectedItem.type === 'video' ? (
                  <VideoPlayer src={selectedItem.videoUrl} />
                ) : (
                  <Slideshow images={selectedItem.images} imageZoom={imageZoom} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />
                )}
              </div>

              {/* Description Panel Pane (Right) */}
              <motion.div 
                initial={{ x: isMobile ? 0 : '100%', y: isMobile ? '100%' : 0 }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: isMobile ? 0 : '100%', y: isMobile ? '100%' : 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                style={{
                  ...descriptionPanelStyle,
                  width: isMobile ? '100%' : '320px',
                  height: isMobile ? '45%' : '100%',
                  borderLeft: isMobile ? 'none' : '2px solid #222',
                  borderTop: isMobile ? '2px solid #222' : 'none'
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    backgroundColor: selectedItem.type === 'video' ? 'var(--color-evh-red)' : 'rgba(255,255,255,0.1)',
                    color: 'var(--color-white)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {selectedItem.type}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-white)', margin: '0 0 1.2rem 0', lineHeight: '1.3' }}>
                  {selectedItem.title}
                </h3>
                
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                  {selectedItem.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  backdropFilter: 'blur(8px)',
  zIndex: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem'
};

const modalContentStyle = {
  backgroundColor: '#0c0c16',
  width: '90vw',
  maxWidth: '1200px',
  position: 'relative',
  border: '2px solid var(--color-evh-red)',
  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
  overflow: 'hidden',
  display: 'flex'
};

const descriptionPanelStyle = {
  backgroundColor: '#09090f',
  padding: '2.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  boxSizing: 'border-box',
  overflowY: 'auto',
  zIndex: 10
};

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  left: '15px', // Placed on top left to not interfere with right sliding description pane
  backgroundColor: 'rgba(0,0,0,0.7)',
  border: 'none',
  color: 'var(--color-white)',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s ease'
};

const arrowLeftStyle = {
  position: 'absolute',
  left: '15px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: 'var(--color-white)',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 5,
  transition: 'background-color 0.3s ease'
};

const arrowRightStyle = {
  ...arrowLeftStyle,
  left: 'auto',
  right: '15px'
};

const playPauseButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'var(--color-white)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px'
};

export default GallerySection;


