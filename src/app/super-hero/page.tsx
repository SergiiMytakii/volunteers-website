import AboutProject from "@/components/AboutProject";
import FAQ from "@/components/FAQ";
import HowToHelp from "@/components/HowToHelp";
import ThankYou from "@/components/ThankYou";
import Report from "@/components/Report";

export default function SuperHeroPage() { 
    return (
      <div className="w-full">
        <AboutProject translationsApiEndpoint="/api/translations/superHeroAboutProject" imagesApiEndpoint="/api/images/superHeroAbout" />
        <HowToHelp translationsApiEndpoint="/api/translations/superHeroHowToHelp" childrenDataApiEndpoint="/api/superHeroSheets" giftButton={false} donationDialogApiEndpoint="/api/translations/superHeroDonationDialog"/>
        <FAQ translationsApiEndpoint="/api/translations/superHeroFaq" />
        <Report
          title="Report"
          photosApiEndpoint="/api/images/superHeroReport"
          videosApiEndpoint="/api/videos/superHeroReport"
        />
        <ThankYou />
      </div>
    );
  }