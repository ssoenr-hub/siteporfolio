import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Reveal from './Reveal';
import Counter from './Counter';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function About() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const imgY = useTransform(smooth, [0, 1], ['-12%', '12%']);
  const imgScale = useTransform(smooth, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__grid">
        <motion.div
          className="about__visual"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__visual-frame">
            <motion.img
              src="/assets/about/portrait.jpg"
              alt="Portrait d'Idrolle Enrique"
              loading="lazy"
              width="1000"
              height="1300"
              style={reduced ? {} : { y: imgY, scale: imgScale }}
            />
          </div>
        </motion.div>
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
