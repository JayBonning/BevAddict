import StartupChecker from "@/components/startup-checker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal, MessageSquare } from "lucide-react"

export default function StartupCheckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🚀 Startup Diagnostics</h1>
          <p className="text-muted-foreground text-lg">Let's check what's preventing your app from starting</p>
        </div>

        <Alert>
          <MessageSquare className="h-4 w-4" />
          <AlertDescription>
            <strong>Great!</strong> You have .env.local set up. Now let's check what else might be causing issues.
          </AlertDescription>
        </Alert>

        <StartupChecker />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              What Error Are You Seeing?
            </CardTitle>
            <CardDescription>Common error patterns and their solutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold">Server Won't Start:</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
                    <code className="text-red-700 dark:text-red-300">EADDRINUSE :::3000</code>
                    <p className="text-red-600 dark:text-red-400 mt-1">Port 3000 already in use</p>
                  </div>
                  <div className="p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
                    <code className="text-red-700 dark:text-red-300">Cannot find module</code>
                    <p className="text-red-600 dark:text-red-400 mt-1">Missing dependencies</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Runtime Errors:</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded">
                    <code className="text-yellow-700 dark:text-yellow-300">Configuration Error</code>
                    <p className="text-yellow-600 dark:text-yellow-400 mt-1">Environment variables not loaded</p>
                  </div>
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded">
                    <code className="text-yellow-700 dark:text-yellow-300">Build failed</code>
                    <p className="text-yellow-600 dark:text-yellow-400 mt-1">TypeScript or compilation errors</p>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertDescription>
                <strong>Share your error:</strong> Copy and paste the exact error message from your terminal for
                specific help!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
