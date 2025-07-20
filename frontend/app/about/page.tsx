import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Zap, Shield } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Advanced language models help you understand complex topics and provide personalized explanations.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of learners and educators using StudyGPT to enhance their educational experience.",
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Get immediate answers to your questions with our fast and reliable AI assistant.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations are secure and private. We prioritize your data protection and privacy.",
    },
  ]

  return (
    <MainLayout>
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-medium">About StudyGPT</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">StudyGPT</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your AI-powered study companion designed to help you learn, understand, and excel in your educational
              journey.
            </p>
            <Badge variant="secondary" className="text-sm">
              Version 2.0
            </Badge>
          </div>

          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                At StudyGPT, we believe that everyone deserves access to personalized, intelligent tutoring. Our mission
                is to democratize education by providing an AI assistant that can help students of all levels understand
                complex concepts, solve problems, and achieve their academic goals. We're committed to making learning
                more accessible, engaging, and effective for everyone.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <feature.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>By the Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">1M+</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Availability</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                StudyGPT is built by a passionate team of educators, engineers, and AI researchers who are dedicated to
                transforming the way people learn. We combine cutting-edge artificial intelligence with deep educational
                expertise to create tools that truly make a difference in students' lives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
