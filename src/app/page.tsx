import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HowToHelp from '@/components/HowToHelp';
import ContactForm from '@/components/ContactForm';
import ThankYou from '@/components/ThankYou';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import AboutProject from '@/components/AboutProject';
import AboutAsSection from '@/components/AboutAsSection';

export default function VolunteersPage() {
  return (
    <div className="w-full">
      <Navigation />
      <Hero />
      <AboutProject />
      <HowToHelp />
      <ContactForm />
      <FAQ/>
      <AboutAsSection />
      <ThankYou />
      <Footer />
    </div>
  );
}
