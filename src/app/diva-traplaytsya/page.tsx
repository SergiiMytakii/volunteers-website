import AboutProject from "@/components/AboutProject";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import HowToHelp from "@/components/HowToHelp";
import ThankYou from "@/components/ThankYou";

export default function DivaTraplaytsya() {
    return (
      <div className="w-full">
        <AboutProject translationsApiEndpoint="/api/translations/aboutProject" imagesApiEndpoint="/api/images/about" />
        <HowToHelp translationsApiEndpoint="/api/translations/help" childrenDataApiEndpoint="/api/sheets" giftButton={true} donationDialogApiEndpoint="/api/translations/donationDialog" />
        <ContactForm translationsApiEndpoint="/api/translations/contactForm" />
        <FAQ translationsApiEndpoint="/api/translations/faq" />
        <ThankYou />
      </div>
    );
  }