import MatchHero from "@/components/sections/match-hero"
import SportBrowser from "@/components/sections/sport-browser"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function MatchWithAthletesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <MatchHero />
        <SportBrowser />
      </main>
      <Footer />
    </div>
  )
}

