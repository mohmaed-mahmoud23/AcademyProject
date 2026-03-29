import Educationalpaths from "./_components/Educationalpaths";
import FloatingCards from "./_components/FloatingCards";
import Hero from "./_components/Hero";
import LatestProjects from "./_components/LatestProgects";
import LatestVedios from "./_components/LatestVedios";
import FAQSection from "./_components/Qutionsation";
import Qutionsation from "./_components/Qutionsation";
// import TopStudents from "./_components/TopStudents";
import Tracks from "./_components/Tracks";

export default function Homepage(){

    return (
      <div>
        <Hero />
        <Tracks />
        <Educationalpaths />
        <LatestProjects />
        <LatestVedios />
        <FAQSection/>
        {/* <TopStudents /> */}
        <FloatingCards />
      </div>
    );

}