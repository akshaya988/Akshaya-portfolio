import { useState } from 'react';
import { useInView, useFormValidation } from '../../hooks';
import { personalInfo } from '../../data/portfolioData';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './Contact.css';

// Fiverr SVG icon
function FiverrIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 9.847h-3.23v9.046h-3.411V9.847H14.5V7.022h1.857V5.554c0-2.539 1.054-4.054 4.041-4.054h2.596v2.83H21.23c-1.216 0-1.47.454-1.47 1.306v1.386H23zM10.57 1.5c-1.168 0-2.116.95-2.116 2.12 0 1.17.948 2.118 2.116 2.118 1.17 0 2.118-.949 2.118-2.117S11.74 1.5 10.57 1.5zm1.705 5.522H8.863v11.37h3.412V7.022zM7.195 13.508C6.724 16.4 4.24 18.619 1.23 18.893L1 16.25c1.588-.233 2.844-1.4 3.19-2.899H1V7.022h6.588v5.853c0 .218-.13.444-.393.633z"/>
    </svg>
  );
}

// Status messages
const STATUS = {
  idle: null,
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState(STATUS.idle);
  const [ref, isInView] = useInView();
  const [headerRef, headerInView] = useInView();

  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } =
    useFormValidation({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitStatus(STATUS.loading);

    // Simulated API call — replace with EmailJS or your backend endpoint
    // Example EmailJS integration:
    // await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', values, 'PUBLIC_KEY');
    try {
      await new Promise(resolve => setTimeout(resolve, 1800)); // simulate network
      setSubmitStatus(STATUS.success);
      reset();
      setTimeout(() => setSubmitStatus(STATUS.idle), 5000);
    } catch {
      setSubmitStatus(STATUS.error);
      setTimeout(() => setSubmitStatus(STATUS.idle), 4000);
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="container">
        {/* Header */}
        <div
          className={`contact__header ${headerInView ? 'contact__header--visible' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title" id="contact-heading">
            Let's Build Something<br />
            <em>Together</em>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, a freelance gig, or just want to connect?
            I'm always open to new opportunities and conversations.
          </p>
        </div>

        <div className={`contact__layout ${isInView ? 'contact__layout--visible' : ''}`} ref={ref}>
          {/* Left — Info */}
          <div className="contact__info">
            <div className="contact__info-items">
              <a href={`mailto:${personalInfo.email}`} className="contact__info-item">
                <div className="contact__info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="contact__info-label mono">Email</p>
                  <p className="contact__info-value">{personalInfo.email}</p>
                </div>
              </a>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="contact__info-label mono">Location</p>
                  <p className="contact__info-value">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="contact__availability">
              <span className="contact__availability-dot" />
              <div>
                <p className="contact__availability-title">Open to Opportunities</p>
                <p className="contact__availability-desc">
                  Available for internships, freelance projects, and full-time roles.
                  Also accepting Fiverr orders for web development.
                </p>
              </div>
            </div>

            {/* Socials — GitHub, LinkedIn, Fiverr */}
            <div className="contact__socials">
              <p className="contact__socials-label mono">Find me online /</p>
              <div className="contact__socials-links">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="Fiverr — Hire me for freelance web development"
                >
                  <FiverrIcon size={18} />
                  <span>Fiverr — Hire Me</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            {/* Row 1 */}
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`contact__input ${touched.name && errors.name ? 'contact__input--error' : ''} ${touched.name && !errors.name && values.name ? 'contact__input--valid' : ''}`}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={touched.name && !!errors.name}
                  disabled={submitStatus === STATUS.loading}
                />
                {touched.name && errors.name && (
                  <p className="contact__error" id="name-error" role="alert">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="contact__field">
                <label htmlFor="email" className="contact__label">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="john@example.com"
                  className={`contact__input ${touched.email && errors.email ? 'contact__input--error' : ''} ${touched.email && !errors.email && values.email ? 'contact__input--valid' : ''}`}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={touched.email && !!errors.email}
                  disabled={submitStatus === STATUS.loading}
                />
                {touched.email && errors.email && (
                  <p className="contact__error" id="email-error" role="alert">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="contact__field">
              <label htmlFor="subject" className="contact__label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Project inquiry, collaboration, Fiverr order, etc."
                className="contact__input"
                disabled={submitStatus === STATUS.loading}
              />
            </div>

            {/* Message */}
            <div className="contact__field">
              <label htmlFor="message" className="contact__label">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell me about your project or opportunity..."
                rows={5}
                className={`contact__input contact__textarea ${touched.message && errors.message ? 'contact__input--error' : ''} ${touched.message && !errors.message && values.message ? 'contact__input--valid' : ''}`}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={touched.message && !!errors.message}
                disabled={submitStatus === STATUS.loading}
              />
              <div className="contact__field-footer">
                {touched.message && errors.message ? (
                  <p className="contact__error" id="message-error" role="alert">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                ) : <span />}
                <span className="contact__char-count mono">
                  {values.message.length} chars
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`contact__submit ${submitStatus === STATUS.loading ? 'contact__submit--loading' : ''}`}
              disabled={submitStatus === STATUS.loading}
            >
              {submitStatus === STATUS.loading ? (
                <><Loader size={16} className="contact__spinner" /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === STATUS.success && (
              <div className="contact__status contact__status--success" role="status" aria-live="polite">
                <CheckCircle size={18} />
                <div>
                  <p className="contact__status-title">Message sent!</p>
                  <p className="contact__status-desc">I'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {submitStatus === STATUS.error && (
              <div className="contact__status contact__status--error" role="alert">
                <AlertCircle size={18} />
                <div>
                  <p className="contact__status-title">Something went wrong</p>
                  <p className="contact__status-desc">Please try again or email me directly.</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
