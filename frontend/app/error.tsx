"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
          <p className="text-gray-600">
            We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="w-full sm:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            <p>Error ID: {error.digest}</p>
            <p>
              Need help?{" "}
              <Link href="/help" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="border-t border-gray-200 pt-8 text-left">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Error Details</h3>
            <pre className="text-xs text-gray-600 bg-gray-100 p-3 rounded overflow-auto">{error.message}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
