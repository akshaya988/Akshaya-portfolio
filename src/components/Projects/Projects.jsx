import { useState } from 'react';
import { projects } from '../../data/portfolioData';
import { useInView } from '../../hooks';
import { Github, ExternalLink, Star } from 'lucide-react';
import './Projects.css';

// Individual Project Card
function ProjectCard({ project, index }) {
  const [cardRef, isInView] = useInView();

  return (
    <article
      ref={cardRef}
      className={`project-card ${isInView ? 'project-card--visible' : ''} ${project.featured ? 'project-card--featured' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
      aria-label={project.title}
    >
      {/* Header */}
      <div className="project-card__header">
        <div className="project-card__top">
          {project.featured && (
            <span className="project-card__featured">
              <Star size={11} fill="currentColor" />
              Featured
            </span>
          )}
          <span className="project-card__year mono">{project.year}</span>
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="project-card__tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-card__tag mono">{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div className="project-card__links">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link" aria-label={`View ${project.title} on GitHub`}>
          <Github size={15} />
          Code
        </a>
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--accent" aria-label={`View ${project.title} live demo`}>
          Live Demo
          <ExternalLink size={13} />
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [headerRef, headerInView] = useInView();

  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags).slice(0, 6))];

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="container">
        {/* Header */}
        <div className={`projects__header ${headerInView ? 'projects__header--visible' : ''}`} ref={headerRef}>
          <p className="section-label">Work</p>
          <h2 className="section-title" id="projects-heading">
            Selected Projects
          </h2>
          <p className="section-subtitle">
            Things I've built, shipped, and learned from.
            Each project represents a unique challenge solved.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="projects__filters" role="tablist" aria-label="Filter projects by technology">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`projects__filter ${filter === tag ? 'projects__filter--active' : ''}`}
              onClick={() => setFilter(tag)}
              role="tab"
              aria-selected={filter === tag}
            >
              {tag === 'all' ? 'All Projects' : tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="projects__cta">
          <p className="projects__cta-text">Want to see more?</p>
          <a href="https://github.com/alexrivera" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Github size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
