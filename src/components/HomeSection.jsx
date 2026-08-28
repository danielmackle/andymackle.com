import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const evhStripes = [
  // Background layer (moves slightly)
  { id: 1, color: '#000000', top: '15%', left: '-20%', width: '150%', height: '50px', rotate: 12, depth: 0.2 },
  { id: 2, color: '#ffffff', top: '-10%', left: '25%', width: '60px', height: '150%', rotate: 8, depth: 0.3 },
  { id: 3, color: '#000000', top: '75%', left: '-10%', width: '120%', height: '25px', rotate: -8, depth: 0.25 },
  { id: 4, color: '#ffffff', top: '85%', left: '-20%', width: '150%', height: '35px', rotate: 5, depth: 0.15 },
  
  // Mid layer
  { id: 5, color: '#ffffff', top: '45%', left: '-20%', width: '150%', height: '70px', rotate: -22, depth: 0.5 },
  { id: 6, color: '#000000', top: '-20%', left: '65%', width: '60px', height: '150%', rotate: -18, depth: 0.45 },
  { id: 7, color: '#000000', top: '-10%', left: '15%', width: '20px', height: '130%', rotate: 35, depth: 0.55 },
  { id: 8, color: '#ffffff', top: '10%', left: '-20%', width: '150%', height: '25px', rotate: 28, depth: 0.6 },
  
  // Foreground layer (moves a lot, casts shadows)
  { id: 9, color: '#000000', top: '35%', left: '-20%', width: '150%', height: '90px', rotate: 4, depth: 0.9 },
  { id: 10, color: '#ffffff', top: '25%', left: '-10%', width: '120%', height: '30px', rotate: -35, depth: 1.1 },
  { id: 11, color: '#ffffff', top: '-20%', left: '55%', width: '20px', height: '150%', rotate: 15, depth: 0.8 },
  { id: 12, color: '#000000', top: '65%', left: '-10%', width: '120%', height: '15px', rotate: 42, depth: 1.0 },
];

const HomeSection = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the mouse values
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize mouse position from -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

  // Ambient idle drift for touch devices (no mouse to drive the parallax)
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    let frame;
    const animate = (t) => {
      mouseX.set(Math.sin(t / 3000));
      mouseY.set(Math.cos(t / 4000));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{ backgroundColor: 'var(--color-evh-red)', overflow: 'hidden' }}
    >
      {/* Interactive Parallax Stripes */}
      {evhStripes.map(stripe => {
        // Calculate dynamic offset based on mouse position and stripe depth
        const xOffset = useTransform(smoothX, [-1, 1], [-80 * stripe.depth, 80 * stripe.depth]);
        const yOffset = useTransform(smoothY, [-1, 1], [-80 * stripe.depth, 80 * stripe.depth]);
        
        return (
          <motion.div
            key={stripe.id}
            style={{
              position: 'absolute',
              top: stripe.top,
              left: stripe.left,
              width: stripe.width,
              height: stripe.height,
              backgroundColor: stripe.color,
              rotate: `${stripe.rotate}deg`,
              x: xOffset,
              y: yOffset,
              transformOrigin: 'center center',
              boxShadow: stripe.depth > 0.6 ? '0 10px 30px rgba(0,0,0,0.6)' : 'none',
              zIndex: Math.floor(stripe.depth * 10), // Ensure foreground is on top
            }}
          />
        );
      })}
      
      <div className="content-panel" style={{ maxWidth: '800px', zIndex: 50 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(2.2rem, 9vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1rem', color: 'var(--color-white)' }}
        >
          ANDREW<br/>
          <span style={{ color: 'var(--color-evh-red)' }}>MACKLE</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '500px' }}
        >
          Seasoned Musician, Full-Time Pro, & Dedicated Tutor.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            className="jagged-btn"
            onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: 'transparent',
              color: 'var(--color-white)',
              border: '2px solid var(--color-evh-red)',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-evh-red)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            See Me In Action
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
