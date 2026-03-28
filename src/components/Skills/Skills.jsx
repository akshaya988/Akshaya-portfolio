import { useInView } from '../../hooks';
import { skills, techIcons } from '../../data/portfolioData';
import './Skills.css';

// Animated skill bar
function SkillBar({ name, level, isInView, delay }) {
  return (
    <div className="skill-bar" style={{ transitionDelay: `${delay}s` }}>
      <div className="skill-bar__info">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level mono">{isInView ? level : 0}%</span>
      </div>
      <div className="skill-bar__track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name}: ${level}%`}>
        <div
          className="skill-bar__fill"
          style={{ width: isInView ? `${level}%` : '0%', transitionDelay: `${delay + 0.1}s` }}
        />
      </div>
    </div>
  );
}

// Skills column
function SkillColumn({ title, skillList, isInView, delayBase }) {
  return (
    <div className="skills__column">
      <h3 className="skills__column-title mono">{title}</h3>
      <div className="skills__bars">
        {skillList.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            isInView={isInView}
            delay={delayBase + i * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, isInView] = useInView();
  const [headerRef, headerInView] = useInView();

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="container">
        {/* Header */}
        <div
          className={`skills__header ${headerInView ? 'skills__header--visible' : ''}`}
          ref={headerRef}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title" id="skills-heading">
            Skills & Technologies
          </h2>
          <p className="section-subtitle">
            The tools I use to build modern web applications.
            Continuously learning and growing every day.
          </p>
        </div>

        {/* Skill bars */}
        <div className="skills__grid" ref={ref}>
          <SkillColumn title="// Frontend" skillList={skills.frontend} isInView={isInView} delayBase={0} />
          <SkillColumn title="// Backend & Database" skillList={skills.backend} isInView={isInView} delayBase={0.1} />
          <SkillColumn title="// DSA & Tools" skillList={skills.tools} isInView={isInView} delayBase={0.2} />
        </div>

        {/* Tech icon cloud */}
        <div className={`skills__cloud ${isInView ? 'skills__cloud--visible' : ''}`}>
          <p className="skills__cloud-label mono">Also worked with /</p>
          <div className="skills__cloud-tags">
            {techIcons.map((tech, i) => (
              <span
                key={tech}
                className="skills__cloud-tag"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
