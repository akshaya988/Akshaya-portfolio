import { useEffect, useRef } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import './Hero.css';

// Fiverr SVG icon (inline — no external dependency needed)
function FiverrIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 9.847h-3.23v9.046h-3.411V9.847H14.5V7.022h1.857V5.554c0-2.539 1.054-4.054 4.041-4.054h2.596v2.83H21.23c-1.216 0-1.47.454-1.47 1.306v1.386H23zM10.57 1.5c-1.168 0-2.116.95-2.116 2.12 0 1.17.948 2.118 2.116 2.118 1.17 0 2.118-.949 2.118-2.117S11.74 1.5 10.57 1.5zm1.705 5.522H8.863v11.37h3.412V7.022zM7.195 13.508C6.724 16.4 4.24 18.619 1.23 18.893L1 16.25c1.588-.233 2.844-1.4 3.19-2.899H1V7.022h6.588v5.853c0 .218-.13.444-.393.633z"/>
    </svg>
  );
}

export default function Hero() {
  const cursorRef = useRef(null);

  // Floating cursor glow effect
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || !cursorRef.current) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Background glow orb */}
      <div className="hero__glow-orb" ref={cursorRef} aria-hidden="true" />
      <div className="hero__grid-bg" aria-hidden="true" />

      <div className="container hero__container">
        {/* Status badge */}
        <div className="hero__badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="hero__badge-dot" />
          <span>Open to Internships &amp; Freelance Projects</span>
        </div>

        {/* Main heading */}
        <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <span className="hero__title-greeting mono">Hi, I'm</span>
          <br />
          <span className="hero__title-name">{personalInfo.name}</span>
        </h1>

        <p className="hero__role animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <span className="hero__role-accent">{personalInfo.role}</span>
          {' '}— crafting modern web experiences.
        </p>

        <p className="hero__bio animate-fade-up" style={{ animationDelay: '0.55s' }}>
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="hero__cta animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <button className="btn-primary" onClick={scrollToContact}>
            Let's Work Together
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-outline" onClick={scrollToAbout}>
            View My Work
          </button>
        </div>

        {/* Social Links — GitHub, LinkedIn, Fiverr */}
        <div className="hero__social animate-fade-up" style={{ animationDelay: '0.85s' }}>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero__social-link">
            <Github size={20} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero__social-link">
            <Linkedin size={20} />
          </a>
          <a href={personalInfo.fiverr} target="_blank" rel="noopener noreferrer" aria-label="Fiverr" className="hero__social-link">
            <FiverrIcon size={20} />
          </a>
          <span className="hero__social-line" />
        </div>

        {/* Stats */}
        <div className="hero__stats animate-fade-up" style={{ animationDelay: '1s' }}>
          {[
            { value: '2+', label: 'Projects Built' },
            { value: 'DSA', label: 'Problem Solving' },
            { value: 'Fiverr', label: 'Freelancing' },
          ].map(stat => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="hero__scroll" onClick={scrollToAbout} aria-label="Scroll down">
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
