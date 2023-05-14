import React from 'react'
import Hero from '../components/Hero'
import SectionTwo from '../components/CreateFundraiserSection'
import SectionThree from '../components/SectionThree'
import SectionFour from '../components/WhyUse3aweniSection'
import SectionFive from '../components/SectionFive'
import SectionSix from '../components/SectionSix'
import SectionSeven from '../components/SectionSeven'
import SectionEight from '../components/SectionEight'

function App() {
  return (
    <main className="mc" id='luxy'>
      <Hero />
      <SectionTwo />
      {/* <SectionThree /> */}
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
    </main>
  );
}

export default App;
