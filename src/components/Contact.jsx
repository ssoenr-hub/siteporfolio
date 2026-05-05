import Reveal from './Reveal';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <Reveal as="p" className="section__kicker">09 — Contact</Reveal>
        <Reveal as="h2" className="contact__title">
          Projets sérieux uniquement.<br />
          Créons quelque chose <em>d'impactant</em>.
        </Reveal>

        <form
          className="form"
          id="contactForm"
          action="mailto:enriqueidrlpro@gmail.com"
          method="POST"
          encType="text/plain"
        >
          <div className="form__row">
            <label className="form__field">
              <span>Nom</span>
              <input type="text" name="name" required autoComplete="name" placeholder="Votre nom…" />
            </label>
            <label className="form__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                spellCheck="false"
                placeholder="vous@domaine.com"
              />
            </label>
          </div>
          <label className="form__field">
            <span>Votre projet</span>
            <textarea
              name="message"
              rows={6}
              required
              autoComplete="off"
              placeholder="Décrivez votre projet, budget approximatif, échéance…"
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block">
            <span>Envoyer la demande</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
        </form>

        <div className="contact__direct">
          <a href="mailto:enriqueidrlpro@gmail.com" className="contact__link">enriqueidrlpro@gmail.com</a>
          <a href="tel:+33601760142" className="contact__link">+33 6 01 76 01 42</a>
          <a
            href="https://instagram.com/azashoots.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            @azashoots.fr
          </a>
        </div>
      </div>
    </section>
  );
}
