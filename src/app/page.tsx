import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyMe from '@/components/WhyMe';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import LatestWriting from '@/components/LatestWriting';
import FAQ from '@/components/FAQ';
import DiscoveryForm from '@/components/DiscoveryForm';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export default function Home() {
  // English originals only; each row links its Spanish translation. Titles only:
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
        <Services />
        <WhyMe />
        <Process />
        <Pricing />
        <LatestWriting articles={latest} />
        <FAQ />
        <DiscoveryForm />
      </main>
      <Footer />
    </>
  );
}
