"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/LoadingScreen"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import Hero from "@/components/sections/Hero"
import BentoGrid from "@/components/sections/BentoGrid"
import Services from "@/components/sections/Services"
import ProcessSteps from "@/components/sections/ProcessSteps"
import Advantages from "@/components/sections/Advantages"
import Calculator from "@/components/sections/Calculator"
import Reviews from "@/components/sections/Reviews"
import MapSection from "@/components/sections/MapSection"
import Promotions from "@/components/sections/Promotions"
import FAQ from "@/components/sections/FAQ"
import FinalCTA from "@/components/sections/FinalCTA"

export default function HomePage() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 450)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <LoadingScreen done={done} />
      <Navbar />

      <main className="space-y-28 pb-16">
        <Hero />
        <BentoGrid />
        <Services />
        <ProcessSteps />
        <Advantages />
        <Calculator />
        <Reviews />
        <MapSection />
        <Promotions />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
