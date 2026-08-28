import { useState } from 'react';
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
      <button 
        className="menu-toggle-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        <img src="/pick.png" alt="Menu Toggle" />
      </button>

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
