// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AthleteProfile } from "@/components/sections/athlete-profile"

export default function AthletePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <AthleteProfile id={params.id} />
      </main>
      <Footer />
    </div>
  )
}

