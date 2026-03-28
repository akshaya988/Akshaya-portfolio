import { useInView } from '../../hooks';
import { personalInfo } from '../../data/portfolioData';
import { Download, Eye, FileText } from 'lucide-react';
import './Resume.css';

export default function Resume() {
  const [ref, isInView] = useInView();

  return (
    <section id="resume" className="resume" aria-labelledby="resume-heading">
      <div className="container">
        <div className={`resume__card ${isInView ? 'resume__card--visible' : ''}`} ref={ref}>
          {/* Decorative corner elements */}
          <span className="resume__corner resume__corner--tl" aria-hidden="true" />
          <span className="resume__corner resume__corner--tr" aria-hidden="true" />
          <span className="resume__corner resume__corner--bl" aria-hidden="true" />
          <span className="resume__corner resume__corner--br" aria-hidden="true" />

          <div className="resume__icon">
            <FileText size={32} />
          </div>

          <p className="section-label">Resume</p>
          <h2 className="resume__title" id="resume-heading">
            My Curriculum Vitae
          </h2>
          <p className="resume__text">
            A complete overview of my experience, skills, education, and accomplishments.
            Updated {new Date().getFullYear()}.
          </p>

          {/* Highlights */}
          <div className="resume__highlights">
            {[
              'Full Stack Developer',
              'Freelancer on Fiverr',
              'React & Node.js',
              'DSA Practitioner',
            ].map(item => (
              <span key={item} className="resume__highlight">
                <span className="resume__highlight-dot" />
                {item}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="resume__actions">
            <a
              href={personalInfo.resumeUrl}
              download="Akshaya_Naidu_Resume.pdf"
              className="btn-primary"
              aria-label="Download Resume PDF"
            >
              <Download size={16} />
              Download PDF
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="View Resume online"
            >
              <Eye size={16} />
              View Online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
