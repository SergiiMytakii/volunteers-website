import AboutProject from "@/components/AboutProject";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import HowToHelp from "@/components/HowToHelp";
import ThankYou from "@/components/ThankYou";

export default function DivaTraplaytsya() {
    return (
      <div className="w-full">
        <AboutProject />
        <HowToHelp />
        <ContactForm />
        <FAQ/>
        <ThankYou />
      </div>
    );
  }