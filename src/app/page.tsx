import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import CaseStudies from '@/components/CaseStudies';
import About from '@/components/About';
import Pricing from '@/components/Pricing';
import DiscoveryForm from '@/components/DiscoveryForm';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <About />
        <Process />
        <Pricing />
        <DiscoveryForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
