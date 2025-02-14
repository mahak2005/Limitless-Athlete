"use client"

import { motion } from "framer-motion"
import { EventCard } from "@/components/ui/event-card"

const events = [
  {
    id: 1,
    title: "Realms",
    type: "Match",
    themes: ["Football", "Soccer"],
    status: {
      mode: "OFFLINE",
      state: "OPEN",
      date: "STARTS 19/02/25",
    },
    participants: {
      count: "+500",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      discord: "#",
    },
  },
  {
    id: 2,
    title: "ZK Online for Athletes",
    type: "MeetUp",
    themes: ["Athletes"],
    status: {
      mode: "ONLINE",
      state: "OPEN",
      isLive: true,
    },
    participants: {
      count: "+500",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    title: "SIT'Novate",
    type: "Competition",
    themes: ["NO RESTRICTIONS"],
    status: {
      mode: "OFFLINE",
      state: "OPEN",
      date: "STARTS 19/02/25",
    },
    participants: {
      count: "+500",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      instagram: "#",
    },
  },
  {
    id: 4,
    title: "Tournament 6.0",
    type: "Tournament",
    themes: ["Taekwondo", "Martial Arts"],
    status: {
      mode: "ONLINE",
      state: "OPEN",
      isLive: true,
    },
    participants: {
      count: "+1000",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      twitter: "#",
    },
  },
]

export function EventsGrid() {
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

