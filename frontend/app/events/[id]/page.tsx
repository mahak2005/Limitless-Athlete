
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { EventDetails } from "@/components/sections/event-details"
import { EventDiscussion } from "@/components/sections/event-discussion"
import { EventTeams } from "@/components/sections/event-teams"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <EventDetails eventId={params.id} />
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="teams">Find Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="prose max-w-none">
                <h2>Event Details</h2>
                <p>
                  Join us for an exciting event that brings together innovators, creators, and problem-solvers. This
                  event offers a unique opportunity to showcase your skills, learn from experts, and win amazing prizes.
                </p>

                <h3>Prizes</h3>
                <ul>
                  <li>First Prize: ₹50,000 + Internship Opportunities</li>
                  <li>Second Prize: ₹30,000 + Mentorship Program</li>
                  <li>Third Prize: ₹20,000</li>
                  <li>Special Category Prizes: ₹10,000 each</li>
                </ul>

                <h3>Timeline</h3>
                <ul>
                  <li>Registration Opens: February 1, 2025</li>
                  <li>Registration Closes: February 20, 2025</li>
                  <li>Event Start: February 21, 2025</li>
                  <li>Event End: February 22, 2025</li>
                  <li>Results Announcement: February 23, 2025</li>
                </ul>

                <h3>Eligibility</h3>
                <ul>
                  <li>Open to all college students</li>
                  <li>Team size: 1-4 members</li>
                  <li>Multiple teams from the same college are allowed</li>
                </ul>

                <h3>Judging Criteria</h3>
                <ul>
                  <li>Innovation and Creativity (30%)</li>
                  <li>Technical Complexity (25%)</li>
                  <li>Practicality and Implementation (25%)</li>
                  <li>Presentation and Documentation (20%)</li>
                </ul>

                <h3>Sponsors</h3>
                <p>
                  This event is proudly sponsored by leading companies in the industry who are committed to fostering
                  innovation and supporting emerging talent.
                </p>

                <h3>Venue</h3>
                <p>
                  Thakur College of Engineering & Technology
                  <br />
                  Mumbai, India
                </p>

                <h3>Contact</h3>
                <p>
                  For any queries, please reach out to:
                  <br />
                  Email: support@hackanova.com
                  <br />
                  Phone: +91 XXXXXXXXXX
                </p>
              </div>
            </TabsContent>
            <TabsContent value="discussion" className="mt-6">
              <EventDiscussion />
            </TabsContent>
            <TabsContent value="teams" className="mt-6">
              <EventTeams />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

