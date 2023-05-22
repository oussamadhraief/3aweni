import React from "react";
import Hero from "../components/Hero";
import CreateFundraiserSection from "../components/CreateFundraiserSection";
import SectionThree from "../components/SectionThree";
import WhyUse3aweniSection from "../components/WhyUse3aweniSection";
import HowToCreate3aweniSection from "../components/HowToCreate3aweniSection";
import GuideSection from "../components/GuideSection";
import ExploreSection from "../components/ExploreSection";
import CreateAccountSection from "../components/CreateAccountSection";

function App() {
  return (
    <main className="mc" id="luxy">
      <Hero />
      <CreateFundraiserSection />
      <WhyUse3aweniSection />
      <HowToCreate3aweniSection />
      <GuideSection />
      <ExploreSection />
      <CreateAccountSection />
    </main>
  );
}

export default App;
