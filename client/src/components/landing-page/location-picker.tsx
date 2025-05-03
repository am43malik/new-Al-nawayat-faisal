"use client"

import { useState } from "react"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

export function LocationPicker() {
  const [location, setLocation] = useState("Mumbai")
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredCities = cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 py-2 border-b border-green-200">
      <div className="container px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>Delivering to:</span>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-green-600 hover:text-green-700 hover:bg-green-100 px-2 font-medium"
              >
                {location}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Choose your delivery location</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <Input
                    placeholder="Search for your city"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence>
                    {filteredCities.map((city, index) => (
                      <motion.div
                        key={city}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                      >
                        <Button
                          variant="outline"
                          className={`justify-start w-full ${location === city ? "border-green-500 bg-green-50" : ""}`}
                          onClick={() => {
                            setLocation(city)
                            setOpen(false)
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4 text-green-500" />
                          {city}
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
