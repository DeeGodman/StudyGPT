"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquarePlus,
  Search,
  Library,
  Bot,
  Share,
  Copy,
  Edit3,
  Settings,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MessageSquare,
  Plus,
  Mic,
  ChevronDown,
} from "lucide-react"

export default function Component() {
  const [inputValue, setInputValue] = useState("")

  const chatHistory = [
    "Software Architecture Assistance",
    "Expert System vs LLM",
    "Compiler Design Quiz Study",
    "UK Visitor Visa Summary",
    "Dinner Funding Help",
    "Cloud Service for Architecture ...",
    "Uber-like App Design",
    "IDS Implementation in Campus...",
    "Questions on Academic Excelle...",
  ]

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <MessageSquarePlus className="w-4 h-4" />
            New chat
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <Search className="w-4 h-4" />
            Search chats
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <Library className="w-4 h-4" />
            Library
          </Button>
        </div>

        {/* GPTs Section */}
        <div className="px-3 mt-4">
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <Bot className="w-4 h-4" />
            GPTs
          </Button>

          <div className="ml-7 mt-2">
            <Button variant="ghost" className="w-full justify-start text-sm bg-gray-200 text-gray-900">
              StudyGPT
            </Button>
          </div>
        </div>

        {/* Chats Section */}
        <div className="px-3 mt-6 flex-1">
          <div className="text-xs font-medium text-gray-500 mb-2 px-3">Chats</div>
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {chatHistory.map((chat, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm text-gray-700 h-auto py-2 px-3 text-left whitespace-normal"
                >
                  {chat}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Bottom User */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-green-100 text-green-700">D</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">Dee 990</div>
              <div className="text-xs text-gray-500">Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">StudyGPT</h1>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <div className="w-4 h-4 grid grid-cols-3 gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Integration Flow Message */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-blue-500 rounded flex items-center justify-center">
                  <MessageSquare className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">Integration Flow (Planned)</span>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-2">plaintext</div>
                <div className="font-mono text-sm">
                  {
                    "User types (Twi/Ewe/etc) → Ghana NLP Translate → English → GPT → English response → Ghana NLP Transl"
                  }
                </div>
              </div>
            </div>

            {/* Next Step Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-lg">Next Step:</span>
              </div>

              <p className="text-gray-700">Would you like me to:</p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-medium">1.</span>
                  <div>
                    <span className="font-medium">Add Ghana NLP API integration</span>
                    <span className="text-gray-700"> to the FastAPI backend now?</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-medium">2.</span>
                  <div>
                    <span className="text-gray-700">Help you </span>
                    <span className="font-medium">deploy the backend first?</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">Let me know which you'd like to do first.</p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything"
                className="pr-20 py-3 rounded-xl border-gray-300"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Notice */}
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <div className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  </div>
                  New version of GPT available
                </span>
                {" - Continue chatting to use the old version, or start a "}
                <button className="text-blue-600 hover:underline">new chat</button>
                {" for the latest version."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
