"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, Book } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "How do I start a new conversation?",
      answer:
        "Click the 'New chat' button in the sidebar or simply start typing in the input field at the bottom of the screen.",
      category: "Getting Started",
    },
    {
      id: 2,
      question: "Can I save my conversations?",
      answer:
        "Yes! All your conversations are automatically saved and can be accessed from the History page in the sidebar.",
      category: "Features",
    },
    {
      id: 3,
      question: "What types of questions can I ask?",
      answer:
        "You can ask about any academic subject, request help with homework, seek explanations of complex concepts, or get study tips and strategies.",
      category: "Usage",
    },
    {
      id: 4,
      question: "Is my data secure and private?",
      answer:
        "Absolutely. We use industry-standard encryption and never share your personal information or conversation data with third parties.",
      category: "Privacy",
    },
    {
      id: 5,
      question: "How accurate are the AI responses?",
      answer:
        "Our AI is highly accurate for most topics, but we recommend verifying important information from authoritative sources, especially for critical academic work.",
      category: "AI",
    },
    {
      id: 6,
      question: "Can I use StudyGPT on mobile devices?",
      answer: "Yes! StudyGPT is fully responsive and works great on smartphones, tablets, and desktop computers.",
      category: "Technical",
    },
  ]

  const categories = ["All", "Getting Started", "Features", "Usage", "Privacy", "AI", "Technical"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout>
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-medium">Help & FAQ</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Book className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">User Guide</h3>
                <p className="text-sm text-gray-600">Learn how to get the most out of StudyGPT</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600">Get instant help from our support team</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-gray-600">Send us a detailed message about your issue</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <button
                    className="flex items-center justify-between w-full text-left py-2"
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{faq.question}</span>
                      <Badge variant="secondary" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && <div className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</div>}
                </div>
              ))}
            </CardContent>
          </Card>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse all categories</p>
            </div>
          )}

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
