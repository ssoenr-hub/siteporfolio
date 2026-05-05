import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProjectHero from '../components/project/ProjectHero';
import ProjectIntro from '../components/project/ProjectIntro';
import ProjectGallery from '../components/project/ProjectGallery';
import ProjectPull from '../components/project/ProjectPull';
import ProjectVideo from '../components/project/ProjectVideo';
import ProjectClose from '../components/project/ProjectClose';
import ProjectNext from '../components/project/ProjectNext';
import FybCatalog from '../components/project/FybCatalog';
import { getProject, getNextInCategory } from '../data/projects';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.tileTitle} · Azashoots`;
    return () => { document.title = 'Idrolle Enrique — Photographe & vidéaste · Azashoots'; };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const next = getNextInCategory(slug);

  return (
    <article className="project-page">
      <ProjectHero project={project} />
      {project.intro && <ProjectIntro>{project.intro}</ProjectIntro>}

      {project.catalog ? (
        <FybCatalog />
      ) : (
        <ProjectGallery images={project.gallery} name={project.tileTitle} />
      )}

      {project.pull && (
        <ProjectPull pre={project.pull.pre} em={project.pull.em} post={project.pull.post} />
      )}

      <ProjectVideo src={project.video} poster={project.videoPoster} />

      <ProjectClose />
      <ProjectNext next={next} fallbackCategory={project.category} />
    </article>
  );
}
