"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const features = [
  {
    title: "Find Athletes",
    description:
      "Find your perfect athlete from 1M+ discovered athletes. Find each athlete's OpenSponsorship for your campaign.",
    image: "/hero/1.png",
  },
  {
    title: "Manage Campaigns",
    description: "Approve and build your campaign in minutes. Collaborate with your brand.",
    image: "/hero/2.png",
  },
  {
    title: "Review Results",
    description:
      "Understand your results with a simple click. Once your campaign is completed, the results feature makes it easy to see the metrics for each athlete.",
    image: "/hero/3.png",
  },
]

export function Features() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-6 hover:bg-blue shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-4">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

