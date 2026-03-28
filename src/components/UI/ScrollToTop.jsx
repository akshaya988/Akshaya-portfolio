import { useScrollY } from '../../hooks';
import { ArrowUp } from 'lucide-react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const scrollY = useScrollY();
  const isVisible = scrollY > 400;

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'scroll-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
