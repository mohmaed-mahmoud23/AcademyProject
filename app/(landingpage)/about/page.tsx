import { Metadata } from "next";
import AboutHero from "../_components/about/AboutHero";
import TeamSection from "../_components/about/TeamSection";

export const metadata: Metadata = {
  title: "About Us | Habib Academy",
  description: "Learn more about Habib Academy, our CEO Mahmoud Habib, and our dedicated support team.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <AboutHero /> 
      <TeamSection />
      
      {/* Optional: Future sections like Mission, Vision, etc. can be added here */}
    </main>
  );
}
