"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function EventsHeader() {
  return (
    <section className="py-12 bg-white border-b">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">Discover Sports Events</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find and participate in sports events, tournaments, and competitions around the world
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search events..." />
            </div>
            <Button>Search</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

