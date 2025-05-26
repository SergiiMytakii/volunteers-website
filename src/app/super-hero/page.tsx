import AboutProject from "@/components/AboutProject";
import FAQ from "@/components/FAQ";
import HowToHelp from "@/components/HowToHelp";
import ThankYou from "@/components/ThankYou";

export default function SuperHeroPage() { 
    return (
      <div className="w-full">
        {/* TODO: Create these API endpoints: /api/translations/superHeroAboutProject and /api/images/superHeroAbout */}
        <AboutProject translationsApiEndpoint="/api/translations/superHeroAboutProject" imagesApiEndpoint="/api/images/superHeroAbout" />
        {/* TODO: Create these API endpoints: /api/translations/superHeroHowToHelp and /api/superHeroSheets */}
        <HowToHelp translationsApiEndpoint="/api/translations/superHeroHowToHelp" childrenDataApiEndpoint="/api/superHeroSheets" giftButton={false} donationDialogApiEndpoint="/api/translations/superHeroDonationDialog"/>
        {/* TODO: Create this API endpoint: /api/translations/superHeroFaq */}
        <FAQ translationsApiEndpoint="/api/translations/superHeroFaq" />
        <ThankYou />
      </div>
    );
  }