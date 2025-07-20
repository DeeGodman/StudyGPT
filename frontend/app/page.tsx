"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/layout/main-layout"
import { Plus, Mic, Send, SlidersHorizontal } from "lucide-react"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">What's on your mind today?</h1>
        <form className="w-full max-w-2xl flex flex-col items-center" onSubmit={e => e.preventDefault()}>
          <div className="w-full flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm px-6 py-4 mb-4">
            <Plus className="w-5 h-5 text-gray-400 mr-3" />
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 border-none outline-none shadow-none bg-transparent text-base px-0"
              style={{ boxShadow: "none" }}
            />
            <SlidersHorizontal className="w-5 h-5 text-gray-400 mx-3 cursor-pointer" />
            <Mic className="w-5 h-5 text-gray-400 mx-3 cursor-pointer" />
            <Button type="submit" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 ml-2">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <Button variant="outline" className="rounded-full flex items-center gap-2 px-4 py-2 text-sm">
            <span className="text-green-600">🖼️</span> Create image
          </Button>
          <Button variant="outline" className="rounded-full flex items-center gap-2 px-4 py-2 text-sm">
            <span className="text-orange-600">📝</span> Summarize text
          </Button>
          <Button variant="outline" className="rounded-full flex items-center gap-2 px-4 py-2 text-sm">
            <span className="text-yellow-500">💡</span> Make a plan
          </Button>
          <Button variant="outline" className="rounded-full flex items-center gap-2 px-4 py-2 text-sm">
            <span className="text-indigo-600">💻</span> Code
          </Button>
          <Button variant="outline" className="rounded-full flex items-center gap-2 px-4 py-2 text-sm">
            More
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
