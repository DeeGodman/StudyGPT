"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquarePlus, Search, Library, Bot, Settings, User, History, HelpCircle, Info } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

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

  const isActive = (path: string) => pathname === path

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4">
        <Link href="/">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="px-3 space-y-2">
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${isActive("/") ? "bg-gray-200" : "text-gray-700"}`}
          >
            <MessageSquarePlus className="w-4 h-4" />
            New chat
          </Button>
        </Link>

        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
          <Search className="w-4 h-4" />
          Search chats
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
          <Library className="w-4 h-4" />
          Library
        </Button>

        <Link href="/history">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${isActive("/history") ? "bg-gray-200" : "text-gray-700"}`}
          >
            <History className="w-4 h-4" />
            History
          </Button>
        </Link>

        <Link href="/settings">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${isActive("/settings") ? "bg-gray-200" : "text-gray-700"}`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>

        <Link href="/profile">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${isActive("/profile") ? "bg-gray-200" : "text-gray-700"}`}
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
        </Link>

        <Link href="/help">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${isActive("/help") ? "bg-gray-200" : "text-gray-700"}`}
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </Link>

        <Link href="/about">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${isActive("/about") ? "bg-gray-200" : "text-gray-700"}`}
          >
            <Info className="w-4 h-4" />
            About
          </Button>
        </Link>
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
  )
}
