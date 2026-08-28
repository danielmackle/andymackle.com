import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="section" style={{ backgroundColor: '#0e0e1a' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div
          className="flex-layout"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginTop: '2rem' }}>
          <motion.div 
            style={{ flex: '1 1 400px' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* High-quality guitar imagery representation */}
            <div style={{ 
              width: '100%', 
              height: '500px', 
              backgroundImage: 'url("https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid #222',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                width: '100px',
                height: '100px',
                borderTop: '4px solid var(--color-evh-red)',
                borderLeft: '4px solid var(--color-evh-red)',
                pointerEvents: 'none'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '100px',
                height: '100px',
                borderBottom: '4px solid var(--color-evh-red)',
                borderRight: '4px solid var(--color-evh-red)',
                pointerEvents: 'none'
              }}></div>
            </div>
          </motion.div>

          <motion.div 
            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 style={{ fontSize: '2rem', color: 'var(--color-evh-red)', margin: 0 }}>Hi, I'm Andrew.</h3>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>
              Music isn't just what I do—it’s how I see the world. I’ve been playing guitar for 39 years, a journey that has taken me from mastering my very first chords to touring extensively across the world. Over the decades, I’ve lived and breathed live performance, and nothing matches the energy of turning a passion into a lifestyle.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              Today, as a professional musician and dedicated guitar and bass instructor, my goal is to pass that fire on to the next generation of players. I want to strip away the frustration of learning an instrument and replace it with the genuine excitement of making music.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              Whether you're picking up a guitar for the very first time, looking to master classic rock riffs, or wanting to lock down a rock-solid groove on the bass, I tailor my approach to your unique goals. Because of my time on the road and in the studio, I don't believe in rigid, one-size-fits-all lesson plans. Instead, we focus on the music you actually love, building real-world technique and practical fundamentals along the way.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              When I’m not teaching or playing, you can usually find me working on new projects in the studio, staying active, or enjoying some downtime at home.
            </p>
            <p style={{ color: 'var(--color-white)', fontSize: '1.1rem', fontWeight: 'bold', margin: '1rem 0 0 0' }}>
              Let's get playing. Grab a spot on my schedule today.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
