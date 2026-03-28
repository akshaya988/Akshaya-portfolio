import { useInView } from '../../hooks';
import { personalInfo, education, experience } from '../../data/portfolioData';
import { MapPin, Mail, Briefcase, GraduationCap } from 'lucide-react';
import './About.css';

export default function About() {
  const [ref, isInView] = useInView();

  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__layout" ref={ref}>
          {/* Left — Text */}
          <div className={`about__left ${isInView ? 'about__left--visible' : ''}`}>
            <p className="section-label">About Me</p>
            <h2 className="section-title" id="about-heading">
              Passionate about building<br />
              <em>impactful</em> web experiences.
            </h2>
            <p className="about__text">
              I'm a passionate Full Stack Web Developer focusing on building modern,
              responsive web applications using React and Node.js. I enjoy turning
              ideas into clean, functional products — from UI design to backend logic.
            </p>
            <p className="about__text">
              I also work as a Freelance Web Developer on Fiverr, where I deliver
              premium, responsive websites for clients globally. Alongside development,
              I actively practice Data Structures &amp; Algorithms to sharpen my
              problem-solving skills every day.
            </p>

            {/* Contact info */}
            <div className="about__info">
              <div className="about__info-item">
                <MapPin size={15} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="about__info-item">
                <Mail size={15} />
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
            </div>

            {/* Interests */}
            <div className="about__interests">
              <p className="about__interests-label mono">Interests /</p>
              <div className="about__tags">
                {['React', 'Node.js', 'DSA', 'Freelancing', 'UI/UX', 'Open Source'].map(tag => (
                  <span key={tag} className="about__tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Experience & Education */}
          <div className={`about__right ${isInView ? 'about__right--visible' : ''}`}>
            {/* Experience */}
            <div className="about__timeline">
              <h3 className="about__timeline-title">
                <Briefcase size={16} />
                Experience
              </h3>
              {experience.map((exp, i) => (
                <div key={i} className="about__timeline-item">
                  <div className="about__timeline-dot" />
                  <div className="about__timeline-content">
                    <div className="about__timeline-header">
                      <span className="about__timeline-role">{exp.role}</span>
                      <span className="about__timeline-period mono">{exp.period}</span>
                    </div>
                    <span className="about__timeline-company">{exp.company}</span>
                    <p className="about__timeline-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="about__timeline" style={{ marginTop: '2.5rem' }}>
              <h3 className="about__timeline-title">
                <GraduationCap size={16} />
                Education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="about__timeline-item">
                  <div className="about__timeline-dot" />
                  <div className="about__timeline-content">
                    <div className="about__timeline-header">
                      <span className="about__timeline-role">{edu.degree}</span>
                      <span className="about__timeline-period mono">{edu.year}</span>
                    </div>
                    <span className="about__timeline-company">{edu.school}</span>
                    <p className="about__timeline-desc">{edu.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
