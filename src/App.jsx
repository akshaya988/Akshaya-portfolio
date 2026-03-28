import { useState, useEffect } from 'react';
import { useTheme } from './hooks';

// Layout
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Sections
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';

// UI utilities
import LoadingScreen from './components/UI/LoadingScreen';
import ScrollToTop from './components/UI/ScrollToTop';

// Global styles
import './styles/globals.css';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading — hides after assets mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Noise grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Main app — hidden until loading is done */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {/* Fixed navigation */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Page sections */}
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Resume />
          <Contact />
        </main>

        <Footer />

        {/* Floating scroll-to-top button */}
        <ScrollToTop />
      </div>
    </>
  );
}
