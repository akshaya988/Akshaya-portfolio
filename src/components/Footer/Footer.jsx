import { personalInfo } from '../../data/portfolioData';
import { Github, Linkedin, Heart, ArrowUp } from 'lucide-react';
import './Footer.css';

// Fiverr SVG icon
function FiverrIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 9.847h-3.23v9.046h-3.411V9.847H14.5V7.022h1.857V5.554c0-2.539 1.054-4.054 4.041-4.054h2.596v2.83H21.23c-1.216 0-1.47.454-1.47 1.306v1.386H23zM10.57 1.5c-1.168 0-2.116.95-2.116 2.12 0 1.17.948 2.118 2.116 2.118 1.17 0 2.118-.949 2.118-2.117S11.74 1.5 10.57 1.5zm1.705 5.522H8.863v11.37h3.412V7.022zM7.195 13.508C6.724 16.4 4.24 18.619 1.23 18.893L1 16.25c1.588-.233 2.844-1.4 3.19-2.899H1V7.022h6.588v5.853c0 .218-.13.444-.393.633z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: 'about' },
    { label: 'Projects', href: 'projects' },
    { label: 'Skills', href: 'skills' },
    { label: 'Resume', href: 'resume' },
    { label: 'Contact', href: 'contact' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-bracket">&lt;</span>
              <span>AN</span>
              <span className="footer__logo-bracket">/&gt;</span>
            </div>
            <p className="footer__tagline">
              Building modern web experiences<br />
              one line of code at a time.
            </p>
            <div className="footer__socials">
              {[
                { href: personalInfo.github, icon: <Github size={17} />, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: <Linkedin size={17} />, label: 'LinkedIn' },
                { href: personalInfo.fiverr, icon: <FiverrIcon size={17} />, label: 'Fiverr' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="footer__nav-label mono">Navigation</p>
            <ul className="footer__nav-list" role="list">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    className="footer__nav-link"
                    onClick={() => scrollTo(link.href)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact quick-links */}
          <div>
            <p className="footer__nav-label mono">Get in Touch</p>
            <ul className="footer__nav-list" role="list">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="footer__nav-link">
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                  github.com/akshaya988
                </a>
              </li>
              <li>
                <a href={personalInfo.fiverr} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                  Fiverr Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {currentYear} {personalInfo.name}. Built with{' '}
            <Heart size={12} className="footer__heart" aria-label="love" />
            {' '}using React & Vite.
          </p>
          <p className="footer__credit mono">
            Designed & developed by Akshaya Naidu
          </p>
          <button
            className="footer__back-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
