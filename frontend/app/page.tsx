"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquarePlus, Search, Library, Share, ChevronDown, Send, ImageIcon, FileText, Calendar, Code, MoreHorizontal, Menu, BookOpen, Target, Lightbulb, NotebookPen, Bookmark, HelpCircle, Clock, CheckCircle, Mic } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  topic?: string;
  keyPoints?: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");

  const chatHistory = [
    "Software Architecture Assistance",
    "Expert System vs LLM",
    "Compiler Design Quiz Study",
    "Cloud Service for Architecture ...",
    "Uber-like App Design",
    "IDS Implementation in Campus...",
    "Questions on Academic Excelle...",
  ];

  /* ---------- helper helpers ---------- */
  const getTopicFromQuery = (q: string) =>
    q.toLowerCase().includes("stack") ? "Data Structures"
    : q.toLowerCase().includes("machine learning") ? "Machine Learning"
    : q.toLowerCase().includes("calculus") ? "Mathematics"
    : q.toLowerCase().includes("ghana") || q.toLowerCase().includes("nlp") ? "Natural Language Processing"
    : "General Studies";

  const getDifficultyForQuery = (q: string) =>
    q.toLowerCase().includes("stack") ? "Beginner"
    : q.toLowerCase().includes("machine learning") ? "Intermediate"
    : q.toLowerCase().includes("calculus") ? "Advanced"
    : q.toLowerCase().includes("ghana") || q.toLowerCase().includes("nlp") ? "Advanced"
    : "Beginner";

  const getKeyPointsForQuery = (q: string) =>
    q.toLowerCase().includes("stack")
      ? ["LIFO principle","Push and Pop operations","Peek/Top operation","Used in function calls","Array or linked-list implementation"]
      : q.toLowerCase().includes("ghana") || q.toLowerCase().includes("nlp")
        ? ["Translation pipeline","API integration","Error handling","Backend deployment","Caching"]
        : ["Key concept","Practical applications","Important considerations"];

  /* ---------- live backend call ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    const currentInput = inputValue;
    setInputValue("");
    if (messages.length === 0) setCurrentTopic(getTopicFromQuery(currentInput));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://studygpt-7gg2.onrender.com"}/query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: currentInput }),
        }
      );
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.answer,
        timestamp: new Date(),
        topic: getTopicFromQuery(currentInput),
        keyPoints: getKeyPointsForQuery(currentInput),
        difficulty: getDifficultyForQuery(currentInput),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: `Error: ${err.message}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- action buttons ---------- */
  const actionButtons = [
    { icon: ImageIcon, label: "Create image", color: "bg-teal-100 text-teal-700" },
    { icon: FileText, label: "Summarize text", color: "bg-orange-100 text-orange-700" },
    { icon: Calendar, label: "Make a plan", color: "bg-yellow-100 text-yellow-700" },
    { icon: Code, label: "Code", color: "bg-blue-100 text-blue-700" },
    { icon: MoreHorizontal, label: "More", color: "bg-gray-100 text-gray-700" },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold text-lg">StudyGPT</span>
          </div>
        </div>

        <div className="px-3 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <MessageSquarePlus className="w-4 h-4" /> New chat
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <Search className="w-4 h-4" /> Search chats
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <Library className="w-4 h-4" /> Library
          </Button>
        </div>

        <div className="px-3 mt-6 flex-1">
          <div className="text-xs font-medium text-gray-500 mb-2 px-3">Chats</div>
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {chatHistory.map((chat, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start text-sm text-gray-700 h-auto py-2 px-3 text-left whitespace-normal">
                  {chat}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

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
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">StudyGPT</h1>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          {messages.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share className="w-4 h-4" /> Share
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6">
              <div className="max-w-4xl w-full">
                <div className="text-center mb-16">
                  <h1 className="text-5xl font-normal text-gray-900 mb-16">What do you want to Study today?</h1>
                </div>
                <div className="max-w-3xl mx-auto mb-8">
                  <form onSubmit={handleSubmit} className="relative">
                    <Input 
                      value={inputValue} 
                      onChange={(e) => setInputValue(e.target.value)} 
                      placeholder="Ask anything..." 
                      className="w-full py-4 px-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      disabled={isLoading}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {actionButtons.map((button, index) => (
                    <Button key={index} variant="outline" className={`rounded-full flex items-center gap-2 px-4 py-2 text-sm ${button.color}`}>
                      <button.icon className="w-4 h-4" />
                      {button.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">S</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-3xl ${message.type === "user" ? "order-1" : "order-2"}`}>
                    <Card className={`${message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-50"}`}>
                      <CardContent className="p-4">
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.type === "assistant" && message.topic && (
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {message.topic}
                              </Badge>
                              {message.difficulty && (
                                <Badge variant="outline" className="text-xs">
                                  {message.difficulty}
                                </Badge>
                              )}
                            </div>
                            {message.keyPoints && message.keyPoints.length > 0 && (
                              <div className="mt-3">
                                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  Key Points:
                                </div>
                                <ul className="space-y-1">
                                  {message.keyPoints.map((point, index) => (
                                    <li key={index} className="text-sm flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-green-100 text-green-700">U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">S</AvatarFallback>
                  </Avatar>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        <span className="text-sm text-gray-600">Thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="w-4 h-4" />
              </Button>
              <Button type="button" size="icon" variant="outline">
                <Mic className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
