import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <motion.button
        className="menu-toggle-btn"
        animate={{ left: isSidebarOpen ? 400 : 20 }}
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
