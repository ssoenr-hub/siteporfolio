import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const EXPERTISES = [
  {
    title: 'Photographie',
    desc: 'Shooting sur mesure, portrait, sport, événement, avec une mise en valeur précise et un rendu professionnel.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: 'Vidéographie',
    desc: 'Création de contenus cinématographiques, montage dynamique et storytelling visuel adapté à votre image.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="m16 10 6-3v10l-6-3Z" />
      </svg>
    ),
  },
  {
    title: 'Direction artistique',
    desc: 'Conception visuelle, mise en scène, cadrage et ambiance pour donner une identité forte à vos projets.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Création de contenu',
    desc: 'Reels, TikTok, formats courts et contenu régulier pour développer votre présence en ligne.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
];

export default function Journey() {
  return (
    <section className="journey section" id="parcours">
      <SectionTitle kicker="06 — Mon parcours">Parcours &amp; vision</SectionTitle>

      <Reveal className="journey__intro">
        <p className="journey__lead">
          De mes débuts à aujourd'hui, mon parcours s'est construit autour d'une seule idée : <em>créer des visuels qui marquent</em>.
        </p>
        <p className="journey__body">
          À travers la photographie et la vidéographie, j'ai développé une approche centrée sur l'esthétique, l'impact et la cohérence visuelle. Chaque projet est une opportunité de raconter une histoire et de valoriser une image, avec exigence et précision.
        </p>
      </Reveal>

      <div className="journey__grid">
        {EXPERTISES.map((e, i) => (
          <Reveal as="article" className="expertise" key={e.title} delay={i * 0.08}>
            <div className="expertise__icon" aria-hidden="true">{e.icon}</div>
            <h3 className="expertise__title">{e.title}</h3>
            <p className="expertise__desc">{e.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
