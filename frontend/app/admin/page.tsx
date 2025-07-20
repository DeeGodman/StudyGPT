"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, TrendingUp, AlertTriangle, Activity, Database, Settings, Shield } from "lucide-react"

export default function AdminPage() {
  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Conversations",
      value: "3,456",
      change: "+8%",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Messages Today",
      value: "45,678",
      change: "+23%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "System Alerts",
      value: "3",
      change: "-2",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", joined: "2024-01-14" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active", joined: "2024-01-13" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", status: "active", joined: "2024-01-12" },
  ]

  const systemHealth = [
    { service: "API Gateway", status: "healthy", uptime: "99.9%" },
    { service: "Database", status: "healthy", uptime: "99.8%" },
    { service: "AI Service", status: "warning", uptime: "98.5%" },
    { service: "File Storage", status: "healthy", uptime: "99.9%" },
  ]

  return (
    <MainLayout>
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-medium">Admin Dashboard</h1>
        <Badge variant="secondary">Admin Access</Badge>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Users</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>System Health</CardTitle>
                <Activity className="w-5 h-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                      </div>
                      <Badge
                        variant={
                          service.status === "healthy"
                            ? "default"
                            : service.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Users className="w-5 h-5" />
                  Manage Users
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Database className="w-5 h-5" />
                  Database Backup
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Settings className="w-5 h-5" />
                  System Settings
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Shield className="w-5 h-5" />
                  Security Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
