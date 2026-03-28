import { useState, useCallback } from 'react';
import { useScrollY, useScrollSpy } from '../../hooks';
import { Moon, Sun, Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Resume', href: 'resume' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollY();
  const activeSection = useScrollSpy(NAV_LINKS.map(l => l.href));

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  }, []);

  const isScrolled = scrollY > 60;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">
          {/* Logo */}
          <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Go to top">
            <span className="navbar__logo-bracket">&lt;</span>
            <span className="navbar__logo-name">AR</span>
            <span className="navbar__logo-bracket">/&gt;</span>
          </button>

          {/* Desktop Nav Links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <button
                  className={`navbar__link ${activeSection === link.href ? 'navbar__link--active' : ''}`}
                  onClick={() => scrollTo(link.href)}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                >
                  <span className="navbar__link-num mono">0{i + 1}.</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile toggle */}
            <button
              className="navbar__mobile-toggle"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <ul role="list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <button
                className={`mobile-menu__link ${activeSection === link.href ? 'mobile-menu__link--active' : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                <span className="mono" style={{ color: 'var(--accent)', marginRight: '0.75rem', fontSize: '0.8rem' }}>0{i + 1}.</span>
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
