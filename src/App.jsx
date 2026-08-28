import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import ErrorBoundary from './components/ErrorBoundary';

const getSidebarWidth = () => {
  const w = window.innerWidth;
  if (w >= 1024) return 380;
  if (w >= 768) return Math.min(w * 0.75, 380);
  return Math.min(w * 0.85, 320);
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(getSidebarWidth);

  useEffect(() => {
    const handleResize = () => setSidebarWidth(getSidebarWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      <motion.button
        className="menu-toggle-btn"
        animate={{ left: isSidebarOpen ? sidebarWidth + 20 : 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        <img src="/pick.png" alt="Menu Toggle" />
      </motion.button>

      <ErrorBoundary>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </ErrorBoundary>
      
      <main className="main-content">
        <ErrorBoundary>
          <HomeSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <AboutSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <GallerySection />
        </ErrorBoundary>
        <ErrorBoundary>
          <ContactSection />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
