import { Link } from 'react-router-dom';
import Reveal from '../Reveal';

export default function ProjectClose() {
  return (
    <section className="project-close">
      <Reveal as="p" className="project-close__kicker">Fin du projet</Reveal>
      <Reveal as="h2" className="project-close__title">
        Votre tour.<br />Travaillons<br />ensemble.
      </Reveal>
      <Reveal>
        <Link to="/#contact" className="btn btn--primary">
          <span>Démarrer un projet</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
