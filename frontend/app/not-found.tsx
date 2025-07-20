"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>
              Need help?{" "}
              <Link href="/help" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Suggested Links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Popular Pages</h3>
          <div className="space-y-2">
            <Link href="/" className="block text-sm text-blue-600 hover:underline">
              Chat Interface
            </Link>
            <Link href="/history" className="block text-sm text-blue-600 hover:underline">
              Chat History
            </Link>
            <Link href="/settings" className="block text-sm text-blue-600 hover:underline">
              Settings
            </Link>
            <Link href="/help" className="block text-sm text-blue-600 hover:underline">
              Help & FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
