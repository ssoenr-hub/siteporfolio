import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const SERVICES = [
  {
    num: '01',
    title: 'Photo',
    items: ['Direction artistique', 'Shooting sur mesure', 'Retouche premium'],
  },
  {
    num: '02',
    title: 'Vidéo',
    items: ['Concept & scénarisation', 'Tournage cinématique', 'Montage & étalonnage'],
  },
  {
    num: '03',
    title: 'Photo\n+ Vidéo',
    featured: true,
    items: ['Pack complet photo & vidéo', 'Optimisé réseaux sociaux', 'Identité visuelle cohérente'],
  },
];

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="services__bg" aria-hidden="true"></div>
      <SectionTitle kicker="07 — Prestations">Prestations</SectionTitle>
      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <Reveal
            as="article"
            className={`service ${s.featured ? 'service--featured' : ''}`}
            key={s.num}
            delay={i * 0.08}
          >
            <div className="service__num">{s.num}</div>
            <h3 className="service__title">
              {s.title.split('\n').map((line, j) => (
                <span key={j}>{line}{j < s.title.split('\n').length - 1 && <br />}</span>
              ))}
            </h3>
            <ul className="service__list">
              {s.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
            <p className="service__price">Sur demande</p>
            <Link to="/#contact" className="service__cta">Demander un devis →</Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
