"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquarePlus, Settings, Library, Share, ChevronDown, Send, ImageIcon, FileText, Calendar, Code, MoreHorizontal, Menu, BookOpen, Target, Lightbulb, NotebookPen, Bookmark, HelpCircle, Clock, CheckCircle, Mic } from "lucide-react";

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
  const [showSettings, setShowSettings] = useState(false);

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

  /* ---------- new chat functionality ---------- */
  const handleNewChat = () => {
    setMessages([]);
    setCurrentTopic("");
    setInputValue("");
    setIsLoading(false);
  };

  /* ---------- settings functionality ---------- */
  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Settings</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Backend URL</h3>
                <Input 
                  placeholder="https://studygpt-7gg2.onrender.com" 
                  className="w-full"
                  defaultValue={process.env.NEXT_PUBLIC_BACKEND_URL || "https://studygpt-7gg2.onrender.com"}
                />
              </div>
              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Light</Button>
                  <Button variant="outline" size="sm" className="flex-1">Dark</Button>
                  <Button variant="outline" size="sm" className="flex-1">Auto</Button>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Chat History</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Save</Button>
                  <Button variant="outline" size="sm" className="flex-1">Clear</Button>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setShowSettings(false)}>
                  Close Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700" onClick={handleNewChat}>
            <MessageSquarePlus className="w-4 h-4" /> New chat
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700" onClick={handleSettings}>
            <Settings className="w-4 h-4" /> Settings
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
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="" className="w-full py-4 px-4 pr-24 text-lg rounded-3xl border-gray-300 shadow-sm" disabled={isLoading}/>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Button variant="ghost" size="sm" type="button" className="p-2"><Menu className="w-5 h-5 text-gray-500" /></Button>
                      <Button variant="ghost" size="sm" type="button" className="p-2"><Mic className="w-5 h-5 text-gray-500" /></Button>
                      <Button variant="ghost" size="sm" type="submit" disabled={isLoading} className="p-2"><Send className="w-5 h-5 text-gray-700" /></Button>
                    </div>
                  </form>
                </div>
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-wrap justify-center gap-3">
                    {actionButtons.map((action, index) => (
                      <Button key={index} variant="outline" className={`gap-3 px-4 py-3 rounded-2xl border-0 ${action.color} hover:opacity-80`}><action.icon className="w-4 h-4" />{action.label}</Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-6">
              <div className="max-w-4xl mx-auto space-y-6">
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
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"/>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay:"0.1s"}}/>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay:"0.2s"}}/>
                        </div>
                        <span className="text-gray-600">StudyGPT is thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask a follow-up question or explore a new topic..." className="w-full py-4 px-4 pr-24 text-lg rounded-3xl border-gray-300 shadow-sm bg-white" disabled={isLoading}/>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" type="button" className="p-2"><Menu className="w-5 h-5 text-gray-500" /></Button>
                  <Button variant="ghost" size="sm" type="button" className="p-2"><Mic className="w-5 h-5 text-gray-500" /></Button>
                  <Button variant="ghost" size="sm" type="submit" disabled={isLoading} className="p-2"><Send className="w-5 h-5 text-gray-700" /></Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
