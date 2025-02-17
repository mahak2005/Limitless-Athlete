"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2, Instagram, Twitter, Facebook } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";

const defaultAthleteData = {
//   id: "1",
  name: "Arvind Sharma",
  image: "/1.png",
  country: "India",
  basicInfo: {
    fullName: "Arvind Sharma",
    age: 21,
    gender: "Male",
    nationality: "Indian",
    state: "Uttar Pradesh",
    sport: "Athletics",
    category: "State-Level",
    currentRanking: "State Player",
  },
  about:
    "I am a dedicated and hardworking athlete from Uttar Pradesh, specializing in the 100m sprint. Born and raised in a small town, I developed a passion for athletics at a young age and has since become one of the top sprinters in my state. My journey into athletics began in school.",
  achievements: {
    medals: ["State Championship Winner (2023): Gold medal in the 100m sprint at the Uttar Pradesh Athletics Championship."],
    records: [
      "Set a new state record with a time of 10.6 seconds in the 100m sprint.",
      "Youngest player to win the state championship.",
    ],
    awards: ["Best Performance: Ranked among the top 10 sprinters at the All-India Athletics Meet in 2022."],
  },
  sponsorship: {
    needs: ["Brand Partnerships", "Equipments"],
    impact: "A sponsorship would not only support my athletic journey but would also aid in inspiring the next generation of athletes in my region, proving that with determination and the right support, athletes can reach their highest potential.",
  },
  social: {
    instagram: "arvind",
    twitter: "arvind",
    facebook: "arvind",
  },
  contact: {
    email: "contact@arvind.com",
    phone: "+91 XXX-XXXX",
  },
};

export default function UserProfile() {
  const [athlete, setAthlete] = useState(defaultAthleteData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(defaultAthleteData);

  useEffect(() => {
    const storedData = localStorage.getItem("athleteProfile");
    if (storedData) {
      setAthlete(JSON.parse(storedData));
    }
  }, []);

  type BasicInfoKey = keyof typeof defaultAthleteData.basicInfo;

  const handleEdit = () => {
    setEditing(true);
    setFormData(athlete);
  };

  const handleSave = () => {
    setAthlete(formData);
    localStorage.setItem("athleteProfile", JSON.stringify(formData));
    setEditing(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-600 to-blue-300 text-white p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto bg-blue-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <Image
              src={athlete.image || "/placeholder.svg"}
              alt={athlete.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-200 px-2 rounded"
                  />
                ) : (
                  athlete.name
                )}
                {/* <span> {athlete.country}</span> */}
              </h1>
              <p className="text-sm text-gray-200">
                {athlete.basicInfo.sport} • {athlete.basicInfo.category}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              size="icon"
              variant="ghost"
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Share2 className="h-5 w-5 text-white" />
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 px-6"
              onClick={handleEdit}
            >
              EDIT PROFILE
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg p-6 mt-6 shadow-lg">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="flex justify-around border-b">
              <TabsTrigger value="about" className="py-2 text-lg font-semibold">
                About
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="py-2 text-lg font-semibold"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="sponsorship"
                className="py-2 text-lg font-semibold"
              >
                Sponsorship
              </TabsTrigger>
            </TabsList>

            {/* About Section */}
            <TabsContent value="about">
              <h2 className="text-xl font-bold mb-3">Basic Information</h2>
              {Object.keys(athlete.basicInfo).map((key) => {
                const typedKey = key as BasicInfoKey;
                return (
                  <div key={typedKey} className="mb-2">
                    <strong>
                      {typedKey.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.basicInfo[typedKey]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basicInfo: {
                              ...formData.basicInfo,
                              [typedKey]: e.target.value,
                            },
                          })
                        }
                        className="ml-2 px-2 py-1 border rounded"
                      />
                    ) : (
                      ` ${athlete.basicInfo[typedKey]}`
                    )}
                  </div>
                );
              })}
              <h2 className="text-xl font-bold mt-4">About</h2>
              {editing ? (
                <textarea
                  className="w-full p-4 border rounded-lg"
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-600">{athlete.about}</p>
              )}
            </TabsContent>

            {/* Achievements Section */}
            <TabsContent value="achievements">
              <h2 className="text-xl font-bold mb-3">Medals & Awards</h2>
              {(
                Object.keys(athlete.achievements) as Array<
                  keyof typeof athlete.achievements
                >
              ).map((category) => (
                <div key={category}>
                  <strong>
                    {category.charAt(0).toUpperCase() + category.slice(1)}:
                  </strong>
                  {editing ? (
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      value={formData.achievements[category].join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          achievements: {
                            ...formData.achievements,
                            [category]: e.target.value.split(", "),
                          },
                        })
                      }
                    />
                  ) : (
                    <ul className="list-disc pl-5 text-gray-700">
                      {athlete.achievements[category].map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </TabsContent>

            {/* Sponsorship Section */}
            <TabsContent value="sponsorship">
              <h2 className="text-xl font-bold mb-3">Sponsorship Needs</h2>
              {editing ? (
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={formData.sponsorship.needs.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sponsorship: {
                        ...formData.sponsorship,
                        needs: e.target.value.split(", "),
                      },
                    })
                  }
                />
              ) : (
                <ul className="list-disc pl-5 text-gray-700">
                  {athlete.sponsorship.needs.map(
                    (need: string, index: number) => (
                      <li key={index}>{need}</li>
                    )
                  )}
                </ul>
              )}

              <h2 className="text-xl font-bold mt-4">Sponsorship Impact</h2>
              {editing ? (
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={formData.sponsorship.impact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sponsorship: {
                        ...formData.sponsorship,
                        impact: e.target.value,
                      },
                    })
                  }
                />
              ) : (
                <p className="text-gray-600">{athlete.sponsorship.impact}</p>
              )}
            </TabsContent>
          </Tabs>

          {editing && (
            <Button
              className="bg-blue-500 w-full hover:bg-blue-600 mt-4"
              onClick={handleSave}
            >
              SAVE CHANGES
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
