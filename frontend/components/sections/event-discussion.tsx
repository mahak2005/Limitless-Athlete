"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const initialDiscussions = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    message: "Is there a specific format for the project presentation?",
    timestamp: "2 hours ago",
    replies: [
      {
        id: 101,
        user: {
          name: "Event Organizer",
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "EO",
        },
        message: "Yes! We'll provide a PPT template that all teams should use. It will be shared after registration.",
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Alex Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AK",
    },
    message: "Can we bring pre-built components for the hardware track?",
    timestamp: "3 hours ago",
    replies: [],
  },
]

export function EventDiscussion() {
  const [discussions, setDiscussions] = useState(initialDiscussions)
  const [newMessage, setNewMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newDiscussion = {
      id: discussions.length + 1,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "YO",
      },
      message: newMessage,
      timestamp: "Just now",
      replies: [],
    }

    setDiscussions([newDiscussion, ...discussions])
    setNewMessage("")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            placeholder="Ask a question or start a discussion..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="mb-4"
          />
          <Button type="submit">Post</Button>
        </form>

        <div className="space-y-6">
          {discussions.map((discussion) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                  <AvatarFallback>{discussion.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{discussion.user.name}</h3>
                    <span className="text-sm text-muted-foreground">{discussion.timestamp}</span>
                  </div>
                  <p className="text-slate-600 mb-4">{discussion.message}</p>
                  {discussion.replies.map((reply) => (
                    <div key={reply.id} className="ml-8 mt-4 flex gap-4">
                      <Avatar>
                        <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                        <AvatarFallback>{reply.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{reply.user.name}</h4>
                          <span className="text-sm text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-slate-600">{reply.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

