import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StatsBand from '@/components/StatsBand';
import CaseStudies from '@/components/CaseStudies';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import DiscoveryForm from '@/components/DiscoveryForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatsBand />
        <CaseStudies />
        <Services />
        <Process />
        <About />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <DiscoveryForm />
      </main>
      <Footer />
    </>
  );
}
