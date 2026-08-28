import { Home, User, Video, Mail, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 200; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeSidebar();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
          <motion.nav 
            className="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <div className="sidebar-logo">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div>
                  <h2 style={{ margin: 0 }}>ANDY</h2>
                  <span>MACKLE</span>
                </div>
                <button
                  onClick={closeSidebar}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--color-evh-red)',
                    cursor: 'pointer',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  aria-label="Close sidebar"
                >
                  <X size={28} />
                </button>
              </div>
            </div>
            
            <ul className="nav-links">
              <li 
                className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => scrollTo('home')}
              >
                <Home className="nav-icon" size={24} />
                <span>Welcome</span>
              </li>
              <li 
                className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollTo('about')}
              >
                <User className="nav-icon" size={24} />
                <span>About Me</span>
              </li>
              <li 
                className={`nav-item ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={() => scrollTo('gallery')}
              >
                <Video className="nav-icon" size={24} />
                <span>Media</span>
              </li>
              <li 
                className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollTo('contact')}
              >
                <Mail className="nav-icon" size={24} />
                <span>Contact</span>
              </li>
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
