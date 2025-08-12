"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    console.error("App error:", error)
  }, [error])

  // Handle redirect errors specifically
  if (error.message.includes("NEXT_REDIRECT") || error.message.includes("Redirect")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Navigation Issue</CardTitle>
            <CardDescription>
              There was a redirect loop. This usually happens during initial setup when the environment isn't fully
              configured.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Link href="/config-error" className="flex-1">
                <Button className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Fix Configuration
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Login
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Most likely causes:</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• Missing .env.local file</li>
                <li>• Server needs restart after config changes</li>
                <li>• Database tables not created yet</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>An unexpected error occurred while loading the page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/config-error">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Setup
              </Button>
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground">Error Details</summary>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">{error.message}</pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
