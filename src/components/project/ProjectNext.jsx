import { Link } from 'react-router-dom';

// Link to next project in same category (or back to category section if last).
export default function ProjectNext({ next, fallbackCategory }) {
  if (next) {
    return (
      <Link to={`/projects/${next.slug}`} className="project-next">
        <div className="project-next__media">
          <img src={next.cover} alt={`Projet suivant — ${next.tileTitle}`} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <div className="project-next__content">
          <p className="project-next__kicker">Projet suivant</p>
          <h3 className="project-next__title">{next.tileTitle}</h3>
          <p className="project-next__arrow">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M10 24h28M28 12l12 12-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </p>
        </div>
      </Link>
    );
  }
  // Fallback: back to category
  return (
    <Link to={`/#${fallbackCategory}`} className="project-next">
      <div className="project-next__content">
        <p className="project-next__kicker">Retour</p>
        <h3 className="project-next__title">Voir tous les projets</h3>
        <p className="project-next__arrow">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M10 24h28M28 12l12 12-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </p>
      </div>
    </Link>
  );
}
