"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera } from "lucide-react"

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Dee")
  const [lastName, setLastName] = useState("990")
  const [email, setEmail] = useState("dee990@example.com")
  const [bio, setBio] = useState("AI enthusiast and lifelong learner")

  return (
    <MainLayout>
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-medium">Profile</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                      {firstName[0]}
                      {lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-600">{email}</p>
                  <Badge variant="secondary">Free Plan</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-gray-600">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">2,340</div>
                  <div className="text-sm text-gray-600">Messages Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">45h</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
