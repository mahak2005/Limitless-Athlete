"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "To grow referrals and leads of business looking",
    features: [
      "Data Sources: Up to 3 Accounts",
      "1 Workspace",
      "1 User",
      "Analytics Dashboard",
      "Google Add-on",
      "Reporting",
    ],
    cta: "Get Started for Free",
    popular: false,
  },
  {
    name: "Starter",
    price: { monthly: 19, yearly: 15.2 },
    description: "To grow referrals and leads of business looking",
    features: [
      "Data Sources: Up to 10 Accounts",
      "1 Workspace",
      "1 User",
      "Analytics Dashboard",
      "Google Add-on",
      "Reporting",
    ],
    cta: "Get Starter",
    popular: true,
  },
  {
    name: "Professional",
    price: { monthly: 39, yearly: 31.2 },
    description: "To grow referrals and leads of business looking",
    features: [
      "Data Sources: Up to 3 Accounts",
      "1 Workspace",
      "1 User",
      "Analytics Dashboard",
      "Google Add-on",
      "Reporting",
    ],
    cta: "Get Professional",
    popular: false,
  },
  {
    name: "Team",
    price: { monthly: 99, yearly: 79.2 },
    description: "To grow referrals and leads of business looking",
    features: [
      "Data Sources: Up to 3 Accounts",
      "1 Workspace",
      "1 User",
      "Analytics Dashboard",
      "Google Add-on",
      "Reporting",
    ],
    cta: "Get Team",
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-sm font-medium text-slate-600 mb-2">Pricing</div>
          <h1 className="text-4xl font-bold mb-8">Flexible Pricing, built for growth</h1>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsYearly(false)}
              className={`text-sm font-medium ${!isYearly ? "text-blue-600" : "text-slate-600"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`text-sm font-medium ${isYearly ? "text-blue-600" : "text-slate-600"}`}
            >
              Yearly
            </button>
            {isYearly && (
              <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-lg border p-6 ${
                plan.popular ? "border-blue-200 shadow-lg" : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                <span className="text-slate-600">/month</span>
              </div>
              <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

