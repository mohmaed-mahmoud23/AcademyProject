import AboutHero from "./_components/about/AboutHero";
import TeamSection from "./_components/about/TeamSection";
import Educationalpaths from "./_components/Educationalpaths";
import FloatingCards from "./_components/FloatingCards";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import OurWork from "./_components/OurWork";
import FAQSection from "./_components/Qutionsation";
import Tracks from "./_components/Tracks";

export default function Homepage(){

    return (
      <div>
        <Hero />
        <Tracks />
        <HowItWorks />
        <Educationalpaths />
        <OurWork />
        <AboutHero />
        <TeamSection />
        <FloatingCards />
        <FAQSection/>
      </div>
    );

}