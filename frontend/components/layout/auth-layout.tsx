import type React from "react"
interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">StudyGPT</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
