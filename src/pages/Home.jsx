import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import PortfolioSection from '../components/PortfolioSection';
import About from '../components/About';
import Journey from '../components/Journey';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { categories, getByCategory } from '../data/projects';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      {categories.map((cat) => (
        <PortfolioSection
          key={cat.id}
          id={cat.id}
          kicker={cat.kicker}
          title={cat.label}
          projects={getByCategory(cat.id)}
          layout={cat.layout}
          wide={cat.wide}
        />
      ))}
      <About />
      <Journey />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
