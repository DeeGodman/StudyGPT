"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageSquare, Trash2, Star } from "lucide-react"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const chatHistory = [
    {
      id: 1,
      title: "Software Architecture Assistance",
      preview: "Help me design a microservices architecture for an e-commerce platform...",
      date: "2024-01-15",
      messageCount: 23,
      starred: true,
    },
    {
      id: 2,
      title: "Expert System vs LLM",
      preview: "What are the key differences between expert systems and large language models?",
      date: "2024-01-14",
      messageCount: 15,
      starred: false,
    },
    {
      id: 3,
      title: "Compiler Design Quiz Study",
      preview: "Can you help me prepare for my compiler design exam with practice questions?",
      date: "2024-01-13",
      messageCount: 45,
      starred: true,
    },
    {
      id: 4,
      title: "UK Visitor Visa Summary",
      preview: "I need help understanding the requirements for a UK visitor visa application...",
      date: "2024-01-12",
      messageCount: 8,
      starred: false,
    },
    {
      id: 5,
      title: "Dinner Funding Help",
      preview: "How can I write a compelling grant proposal for a community dinner program?",
      date: "2024-01-11",
      messageCount: 12,
      starred: false,
    },
  ]

  const filteredHistory = chatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-medium">Chat History</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Chat List */}
          <div className="space-y-4">
            {filteredHistory.map((chat) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{chat.title}</h3>
                        {chat.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{chat.preview}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{chat.date}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{chat.messageCount} messages</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
              <p className="text-gray-600">
                {searchQuery ? "Try adjusting your search terms" : "Start a new conversation to see it here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
