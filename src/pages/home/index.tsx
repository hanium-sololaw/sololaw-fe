import Navbar from './ui/Navbar'
import HeroSection from './ui/HeroSection'
import ServiceSection from './ui/ServiceSection'
import FeaturesSection from './ui/FeaturesSection'
import CTASection from './ui/CTASection'
import FAQSection from './ui/FAQSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <ServiceSection />
        <FeaturesSection />
        <CTASection />
        <FAQSection />
      </div>
    </div>
  )
}
