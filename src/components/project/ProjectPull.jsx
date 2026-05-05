import Reveal from '../Reveal';

export default function ProjectPull({ pre, em, post }) {
  return (
    <section className="project-pull">
      <Reveal as="p" className="project-pull__text">
        {pre}<br />
        <em>{em}</em>{post}
      </Reveal>
    </section>
  );
}
