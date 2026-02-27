import Hero from "@/components/amos/Hero";
import ProblemSection from "@/components/amos/ProblemSection";
import HowItWorks from "@/components/amos/HowItWorks";
import LayersSection from "@/components/amos/LayersSection";
import ComparisonSection from "@/components/amos/ComparisonSection";
import UseCasesSection from "@/components/amos/UseCasesSection";
import PrinciplesAndTech from "@/components/amos/PrinciplesAndTech";
import QuoteAndFooter from "@/components/amos/QuoteAndFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Hero />
    <ProblemSection />
    <HowItWorks />
    <LayersSection />
    <ComparisonSection />
    <UseCasesSection />
    <PrinciplesAndTech />
    <QuoteAndFooter />
  </div>
);

export default Index;
