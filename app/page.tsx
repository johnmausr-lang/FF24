import Hero from "@/components/sections/Hero"
import BentoGrid from "@/components/sections/BentoGrid"
import ProcessSteps from "@/components/sections/ProcessSteps"
import Calculator from "@/components/sections/Calculator"
import FAQ from "@/components/sections/FAQ"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="space-y-32">
      <Hero />
      <BentoGrid />
      <ProcessSteps />
      <Calculator />
      <FAQ />
      <Footer />
    </main>
  )
}
