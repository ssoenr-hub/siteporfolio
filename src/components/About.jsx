import Reveal from './Reveal';
import Counter from './Counter';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        <Reveal className="about__visual">
          <img src="/assets/about/portrait.jpg" alt="Portrait d'Idrolle Enrique" loading="lazy" width="1000" height="1300" />
        </Reveal>
        <div className="about__content">
          <Reveal as="p" className="section__kicker">05 — Derrière l'objectif</Reveal>
          <Reveal as="h2" className="about__title">Derrière<br />l'objectif</Reveal>
          <Reveal as="p" className="about__name">Idrolle Enrique</Reveal>
          <Reveal as="p" className="about__role">Vidéaste &amp; photographe cinématique</Reveal>

          <Reveal as="p" className="about__lead">
            Je suis vidéaste et photographe spécialisé dans la création de visuels cinématographiques, avec une approche centrée sur <em>l'impact</em>, <em>l'esthétique</em> et la <em>cohérence d'image</em>.
          </Reveal>
          <Reveal as="p" className="about__text">
            Mon travail consiste à transformer une idée, une personne ou un projet en un visuel fort, capable de capter l'attention et de marquer durablement. Chaque réalisation est pensée dans les détails, de la direction artistique jusqu'au rendu final.
          </Reveal>
          <Reveal as="p" className="about__text">
            J'interviens sur différents types de projets : fitness, barber, événementiel, mais aussi pour des particuliers et des professionnels souhaitant valoriser leur image avec un rendu propre, moderne et impactant.
          </Reveal>
          <Reveal as="p" className="about__text">
            Au-delà de la simple création de contenu, j'apporte une vision : <em>cadrage</em>, <em>lumière</em>, <em>ambiance</em>, <em>storytelling</em>. L'objectif n'est pas seulement de produire une image, mais de construire une présence visuelle cohérente et qualitative.
          </Reveal>
          <Reveal as="p" className="about__text">
            Je m'adapte à chaque projet avec une exigence constante, afin de proposer des visuels qui correspondent réellement à l'univers et aux attentes de mes clients.
          </Reveal>

          <Reveal as="p" className="about__location">
            <span className="about__location-pin" aria-hidden="true"></span>
            Basé à <strong>Lille</strong> &amp; <strong>Valenciennes</strong> · Disponible pour tout type de projet.
          </Reveal>

          <Reveal as="ul" className="about__stats">
            <li><strong><Counter target={6} suffix="+" /></strong><span>Années photo</span></li>
            <li><strong><Counter target={2} suffix="+" /></strong><span>Années vidéo</span></li>
            <li><strong><Counter target={50} suffix="+" /></strong><span>Projets livrés</span></li>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
