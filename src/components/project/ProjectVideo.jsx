import Reveal from '../Reveal';

export default function ProjectVideo({ src, poster }) {
  if (!src) return null;
  return (
    <>
      <section className="project-pull">
        <Reveal as="p" className="project-pull__text">La vidéo.</Reveal>
      </section>
      <figure className="project-video project-video--vertical">
        <video controls muted loop playsInline preload="metadata" poster={poster}>
          <source src={src} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
      </figure>
    </>
  );
}
