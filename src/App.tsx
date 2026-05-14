import { LanguageProvider } from './contexts/LanguageContext'
import Hero from './sections/Hero'
import TrustBar from './sections/TrustBar'
import WhyPabloTour from './sections/WhyPabloTour'
import Tours from './sections/Tours'
import Story from './sections/Story'
import Difference from './sections/Difference'
import Gallery from './sections/Gallery'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'
import StickyWhatsApp from './components/StickyWhatsApp'

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative">
        <Hero />
        <TrustBar />
        <section id="why">
          <WhyPabloTour />
        </section>
        <Tours />
        <Story />
        <Difference />
        <Gallery />
        <FAQ />
        <FinalCTA />
        <Footer />
        <StickyWhatsApp />
      </div>
    </LanguageProvider>
  )
}
