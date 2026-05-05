export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">IDROLLE ENRIQUE</p>
          <p className="footer__tag">Photographe &amp; vidéaste</p>
        </div>
        <div className="footer__meta">
          <p>© <span>{year}</span> Idrolle Enrique — Tous droits réservés.</p>
          <p>Basé en France · Disponible dans toute l'Europe</p>
        </div>
      </div>
    </footer>
  );
}
