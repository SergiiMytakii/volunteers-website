import Hero from '@/components/Hero';
import AboutAsSection from '@/components/AboutAsSection';
import NavigationCards from '@/components/NavigationCards';

export default function VolunteersPage() {
  return (
    <div className="w-full">
      <Hero />

      <NavigationCards />
      <AboutAsSection />
    </div>
  );
}
