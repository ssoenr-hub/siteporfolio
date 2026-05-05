import Reveal from '../Reveal';

export default function ProjectIntro({ children }) {
  return (
    <section className="project-intro">
      <Reveal as="p" className="project-intro__kicker">Le brief</Reveal>
      <Reveal as="p" className="project-intro__text">{children}</Reveal>
    </section>
  );
}
