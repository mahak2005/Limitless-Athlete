"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AthleteGrid } from "@/components/sections/athlete-grid"

const sportsLeagues = ["MLB/BASEBALL", "NFL/FOOTBALL", "NBA/BASKETBALL", "NHL/HOCKEY", "COLLEGE"]

interface Athlete {
  id: number
  name: string
  gender: string
  team: string
  sport: string
  location: string
  image: string
  status: string
}

const athletes: Athlete[] = [
  {
    id: 1,
    name: "Neeraj Chopra",
    gender: "male",
    team: "Independent",
    sport: "Javelin Throw",
    location: "Haryana",
    image: "/1.png",
    status: "National Icon",
  },
  {
    id: 2,
    name: "PV Sindhu",
    gender: "female",
    team: "Independent",
    sport: "Badminton",
    location: "Telangana",
    image: "/placeholder.svg?height=400&width=400",
    status: "Global STAR",
  },
  {
    id: 3,
    name: "Virat Kohli",
    gender: "male",
    team: "Royal Challengers Bangalore",
    sport: "Cricket",
    location: "Delhi",
    image: "/placeholder.svg?height=400&width=400",
    status: "Global STAR",
  },
  {
    id: 4,
    name: "Harmanpreet Kaur",
    gender: "female",
    team: "Mumbai Indians",
    sport: "Cricket",
    location: "Punjab",
    image: "/placeholder.svg?height=400&width=400",
    status: "National Icon",
  },
  {
    id: 5,
    name: "Mary Kom",
    gender: "female",
    team: "Independent",
    sport: "Boxing",
    location: "Manipur",
    image: "/placeholder.svg?height=400&width=400",
    status: "Legend",
  },
  {
    id: 6,
    name: "Rohan Bopanna",
    gender: "male",
    team: "Independent",
    sport: "Tennis",
    location: "Karnataka",
    image: "/placeholder.svg?height=400&width=400",
    status: "Veteran Star",
  },
  {
    id: 7,
    name: "Dipa Karmakar",
    gender: "female",
    team: "Independent",
    sport: "Gymnastics",
    location: "Tripura",
    image: "/placeholder.svg?height=400&width=400",
    status: "National Icon",
  },
  {
    id: 8,
    name: "Bajrang Punia",
    gender: "male",
    team: "Independent",
    sport: "Wrestling",
    location: "Haryana",
    image: "/placeholder.svg?height=400&width=400",
    status: "Global STAR",
  },
]

export default function MatchHero() {
  const [selectedSport, setSelectedSport] = useState<string>("")
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [showAthletes, setShowAthletes] = useState(false)

  // Filter function to pass the values to AthleteGrid
  const filteredAthletes = athletes.filter((athlete) => {
    const sportMatch = selectedSport ? athlete.sport.toLowerCase() === selectedSport.toLowerCase() : true
    const genderMatch = selectedGender ? athlete.gender.toLowerCase() === selectedGender.toLowerCase() : true
    const locationMatch = location ? athlete.location.toLowerCase().includes(location.toLowerCase()) : true
    return sportMatch && genderMatch && locationMatch
  })

  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-teal-900 to-emerald-900">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Browse our industry-leading sports sponsorship database
        </motion.h1>

        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-slate-600 mb-6">
            Search through our extensive database of over 20,000 athletes, events and teams, in over 40 countries and 50
            sports to find the right sports sponsorship for your campaign.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SPORTS</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soccer">Soccer</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GENDER</label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">LOCATION</label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => setShowAthletes(!showAthletes)}
            >
              {showAthletes ? "HIDE ATHLETES" : "VIEW ALL ATHLETES"}
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="outline" size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
            SPEAK TO A SPORTS MARKETING EXPERT
          </Button>
        </motion.div>
      </div>
      
      {showAthletes && <AthleteGrid athletes={filteredAthletes} />}
    </section>
  )
}
