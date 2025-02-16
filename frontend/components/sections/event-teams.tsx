"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Users } from "lucide-react"

const initialTeams = [
  {
    id: 1,
    name: "Team Innovators",
    description: "Looking for a ML expert and a UI/UX designer for our AI-powered solution.",
    members: [
      {
        name: "John Doe",
        role: "Team Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
    ],
    openRoles: ["ML Engineer", "UI/UX Designer"],
    track: "Software Track",
  },
  {
    id: 2,
    name: "Hardware Wizards",
    description: "Need an embedded systems programmer and a PCB designer for our IoT project.",
    members: [
      {
        name: "Mike Chen",
        role: "Hardware Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
    ],
    openRoles: ["Embedded Systems Programmer", "PCB Designer"],
    track: "Hardware Track",
  },
]

export function EventTeams() {
  const [teams] = useState(initialTeams)

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Find or Create a Team</h2>
            <p className="text-muted-foreground">
              Join an existing team or create your own to participate in the hackathon
            </p>
          </div>
          <Button>Create Team</Button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search teams by name, skills, or roles needed..." />
          </div>
        </div>

        <div className="space-y-6">
          {teams.map((team) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{team.name}</h3>
                  <Badge variant="secondary">{team.track}</Badge>
                </div>
                <Button>Request to Join</Button>
              </div>

              <p className="text-slate-600 mb-6">{team.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Current Members</h4>
                  </div>
                  <div className="space-y-3">
                    {team.members.map((member) => (
                      <div key={member.name} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Open Roles</h4>
                  <div className="space-y-2">
                    {team.openRoles.map((role) => (
                      <div key={role} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

