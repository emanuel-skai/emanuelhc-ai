import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CaseStudies from '@/components/CaseStudies';
import Practices from '@/components/Practices';
import OperatingLog from '@/components/OperatingLog';
import Services from '@/components/Services';
import About from '@/components/About';
import LatestWriting from '@/components/LatestWriting';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import DiscoveryForm from '@/components/DiscoveryForm';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export default function Home() {
  // English originals only; each card links its Spanish translation. Titles only:
  // older article descriptions name clients, which the home page keeps anonymous.
  const latest = getAllArticles()
    .filter((a) => a.lang === 'en')
    .slice(0, 3)
    .map(({ slug, title, date, readTimeMinutes, translationSlug }) => ({
      slug,
      title,
      date,
      readTimeMinutes,
      translationSlug,
    }));

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CaseStudies />
        <Practices />
        <OperatingLog />
        <Services />
        <About />
        <LatestWriting articles={latest} />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <DiscoveryForm />
      </main>
      <Footer />
    </>
  );
}
