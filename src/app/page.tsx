import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { ServicesSection } from '../components/ServicesSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { ContactSection } from '../components/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      {/* Content sections positioned after the 3D hero */}
      <div className="relative z-20 bg-white">
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </main>
  )
}