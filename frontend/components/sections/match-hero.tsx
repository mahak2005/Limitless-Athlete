"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
// import {
//   Select
// } from "@/components/ui/select"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// const sportsLeagues = ["MLB/BASEBALL", "NFL/FOOTBALL", "NBA/BASKETBALL", "NHL/HOCKEY", "COLLEGE"]

export default function MatchHero() {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-blue-900 to-lightblue-900">
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
            Search through our extensive database of {">"}20,000 athletes, events and teams, in over 40 countries and 50
            sports to find the right sports sponsorship for your campaign.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SPORTS</label>
            <Select>
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
            <Select>
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
            <Input type="text" placeholder="Enter location" />
          </div>
        </div>


          {/* <div className="flex flex-wrap gap-2 mb-6">
            {sportsLeagues.map((league) => (
              <Button key={league} variant="outline" size="sm" className="hover:bg-teal-50">
                {league}
              </Button>
            ))}
          </div> */}

          <div className="flex justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-400">
              VIEW ALL ATHLETES
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="outline" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            SPEAK TO A SPORTS MARKETING EXPERT
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

