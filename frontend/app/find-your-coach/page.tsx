import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CoachGrid } from "@/components/sections/coach-grid"
import { CoachCategories } from "@/components/sections/coach-categories"

export default function FindYourCoachPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20">
        <div className="container bg-gradient-to-b from-blue-400 to-lightblue-300 px-4 mx-auto px-4 py-8">
          <h1 className="text-3xl text-white font-bold text-center mb-8">Find Your Perfect Coach</h1>
          <CoachGrid />
          <CoachCategories />
        </div>
      </main>
      <Footer />
    </div>
  )
}

