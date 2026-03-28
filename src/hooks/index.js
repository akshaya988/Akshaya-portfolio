import { useState, useEffect, useRef, useCallback } from 'react';

// ── useTheme: Dark/light mode with localStorage persistence ──
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
}

// ── useScrollSpy: Track which section is active in viewport ──
export function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

// ── useScrollY: Track scroll position for navbar transparency ──
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

// ── useInView: Trigger animation when element enters viewport ──
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once visible, stop observing
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, ...options }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return [ref, isInView];
}

// ── useCountUp: Animate numbers counting up ──
export function useCountUp(target, isInView, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, isInView, duration]);

  return count;
}

// ── useFormValidation: Form state + validation ──
export function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((vals) => {
    const errs = {};
    if (!vals.name?.trim()) errs.name = 'Name is required';
    else if (vals.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';

    if (!vals.email?.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) errs.email = 'Enter a valid email address';

    if (!vals.message?.trim()) errs.message = 'Message is required';
    else if (vals.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';

    return errs;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate({ ...values, [name]: value })[name] }));
    }
  }, [values, touched, validate]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(values)[name] }));
  }, [values, validate]);

  const validateAll = useCallback(() => {
    const allTouched = Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [values, validate, initialValues]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset };
}
