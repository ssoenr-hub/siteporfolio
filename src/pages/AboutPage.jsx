import { motion } from 'framer-motion';
import { useEffect } from 'react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutPage() {
  useEffect(() => {
    document.title = 'À propos / Contact · Azashoots';
  }, []);

  return (
    <article className="about-edt">
      <motion.header className="about-edt__head" {...fade(0.05)}>
        <p className="about-edt__kicker">À propos</p>
        <h1 className="about-edt__title">
          Idrolle <em>Enrique</em>
        </h1>
        <p className="about-edt__role">Photographe &amp; vidéaste cinématique · NYC du Nord</p>
      </motion.header>

      <section className="about-edt__body">
        <motion.div className="about-edt__portrait" {...fade(0.15)}>
          <img src="/assets/about/portrait.jpg" alt="Portrait Idrolle Enrique" loading="lazy" />
        </motion.div>

        <motion.div className="about-edt__bio" {...fade(0.25)}>
          <p>
            Vidéaste et photographe basé entre <strong>Lille</strong> &amp; <strong>Valenciennes</strong>, je crée des visuels cinématographiques avec une approche centrée sur <em>l'impact</em>, <em>l'esthétique</em> et la <em>cohérence d'image</em>.
          </p>
          <p>
            Mon travail consiste à transformer une idée, une personne ou un projet en un visuel fort, capable de capter l'attention et de marquer durablement. Chaque réalisation est pensée dans les détails — direction artistique, cadrage, lumière, étalonnage.
          </p>
          <p>
            J'interviens sur fitness, barber, événementiel, automobile et particuliers premium. Disponible partout en France et en Europe.
          </p>

          <ul className="about-edt__stats">
            <li><strong>6+</strong><span>Années photo</span></li>
            <li><strong>2+</strong><span>Années vidéo</span></li>
            <li><strong>50+</strong><span>Projets livrés</span></li>
          </ul>
        </motion.div>
      </section>

      <motion.section className="about-edt__contact" id="contact" {...fade(0.35)}>
        <h2 className="about-edt__contact-title">
          Démarrons <em>un projet</em>.
        </h2>

        <div className="about-edt__contact-grid">
          <div className="about-edt__contact-info">
            <dl>
              <div><dt>Email</dt><dd><a href="mailto:enriqueidrlpro@gmail.com" data-cursor="Écrire">enriqueidrlpro@gmail.com</a></dd></div>
              <div><dt>Téléphone</dt><dd><a href="tel:+33656661189" data-cursor="Appeler">+33 6 56 66 11 89</a></dd></div>
              <div><dt>Instagram</dt><dd><a href="https://instagram.com/azashoots.fr" target="_blank" rel="noopener noreferrer" data-cursor="Suivre">@azashoots.fr</a></dd></div>
              <div><dt>Disponibilité</dt><dd>Hauts-de-France · Belgique · Europe</dd></div>
            </dl>
          </div>

          <form className="about-edt__form" action="mailto:enriqueidrlpro@gmail.com" method="POST" encType="text/plain">
            <label className="about-edt__field">
              <span>Nom</span>
              <input type="text" name="name" required autoComplete="name" placeholder="Votre nom" />
            </label>
            <label className="about-edt__field">
              <span>Email</span>
              <input type="email" name="email" required autoComplete="email" placeholder="vous@domaine.com" />
            </label>
            <label className="about-edt__field">
              <span>Projet</span>
              <textarea name="message" rows={5} required placeholder="Décrivez votre projet…" />
            </label>
            <button type="submit" className="about-edt__submit" data-cursor="Envoyer">
              Envoyer la demande <span>↗</span>
            </button>
          </form>
        </div>

        <ul className="about-edt__awards">
          <li><span>2026</span> Portfolio en activité — Vol. 02</li>
          <li><span>50+</span> Projets livrés depuis 2020</li>
          <li><span>—</span> Disponible pour tout type de projet</li>
        </ul>
      </motion.section>
    </article>
  );
}
