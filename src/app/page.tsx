import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import HowToHelp from '@/components/HowToHelp';
import ContactForm from '@/components/ContactForm';
import ThankYou from '@/components/ThankYou';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function VolunteersPage() {
  return (
    <div className="w-full">
      <Navigation />
      <Hero />
      <About />
      <HowToHelp />
      <ContactForm />
      <FAQ/>
      <ThankYou />
      <Footer />
      <ChatWidget />

    </div>
  );
}
