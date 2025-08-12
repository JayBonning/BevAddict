"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Copy, Play } from "lucide-react"
import { toast } from "sonner"

interface StartupCheck {
  name: string
  status: "success" | "error" | "warning" | "checking"
  message: string
  command?: string
  description?: string
}

export default function StartupChecker() {
  const [checks, setChecks] = useState<StartupCheck[]>([])
  const [isChecking, setIsChecking] = useState(true)

  const runStartupChecks = async () => {
    setIsChecking(true)
    const newChecks: StartupCheck[] = []

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      newChecks.push({
        name: "Environment Variables",
        status: "success",
        message: "✅ .env.local configured correctly",
        description: "Supabase credentials are loaded",
      })
    } else {
      newChecks.push({
        name: "Environment Variables",
        status: "error",
        message: "❌ Environment variables not loaded",
        description: "Server may need restart after .env.local changes",
        command: "npm run dev",
      })
    }

    // Check if we can create Supabase client
    try {
      if (typeof window !== "undefined") {
        const { createClient } = await import("@/lib/supabase/client")
        const supabase = createClient()

        newChecks.push({
          name: "Supabase Client",
          status: "success",
          message: "✅ Supabase client created successfully",
          description: "Client-side connection ready",
        })
      }
    } catch (error) {
      newChecks.push({
        name: "Supabase Client",
        status: "error",
        message: "❌ Failed to create Supabase client",
        description: error instanceof Error ? error.message : "Unknown error",
        command: "npm install @supabase/supabase-js @supabase/ssr",
      })
    }

    // Check if we can connect to Supabase
    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        })

        if (response.ok || response.status === 404) {
          newChecks.push({
            name: "Supabase Connection",
            status: "success",
            message: "✅ Can connect to Supabase",
            description: "Network connection to database is working",
          })
        } else {
          newChecks.push({
            name: "Supabase Connection",
            status: "error",
            message: `❌ Connection failed (${response.status})`,
            description: "Check your Supabase project status",
          })
        }
      } catch (error) {
        newChecks.push({
          name: "Supabase Connection",
          status: "warning",
          message: "⚠️ Network connection issue",
          description: "Check your internet connection",
        })
      }
    }

    // Check for common Next.js issues
    try {
      // Check if we're in development mode
      const isDev = process.env.NODE_ENV === "development"
      newChecks.push({
        name: "Development Mode",
        status: isDev ? "success" : "warning",
        message: isDev ? "✅ Running in development mode" : "⚠️ Not in development mode",
        description: isDev ? "Hot reload enabled" : "May need to restart server",
      })
    } catch (error) {
      newChecks.push({
        name: "Development Mode",
        status: "warning",
        message: "⚠️ Cannot detect environment",
        description: "Server configuration may need attention",
      })
    }

    setChecks(newChecks)
    setIsChecking(false)
  }

  useEffect(() => {
    runStartupChecks()
  }, [])

  const getStatusIcon = (status: StartupCheck["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "checking":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
    }
  }

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    toast.success("Command copied to clipboard!")
  }

  const hasErrors = checks.some((check) => check.status === "error")
  const hasWarnings = checks.some((check) => check.status === "warning")

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          Startup Status Check
        </CardTitle>
        <CardDescription>Since you have .env.local set up, let's check what else might be needed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            ✅ .env.local configured
          </Badge>
          {hasErrors && (
            <Badge variant="destructive">{checks.filter((c) => c.status === "error").length} errors found</Badge>
          )}
          {hasWarnings && (
            <Badge variant="secondary">{checks.filter((c) => c.status === "warning").length} warnings</Badge>
          )}
        </div>

        {/* Diagnostic Results */}
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
              {getStatusIcon(check.status)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium mb-1">{check.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">{check.message}</p>
                {check.description && <p className="text-xs text-muted-foreground mb-2">{check.description}</p>}
                {check.command && (
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1">{check.command}</code>
                    <Button size="sm" variant="outline" onClick={() => copyCommand(check.command!)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Next Steps</h3>

          {hasErrors ? (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold text-red-800 dark:text-red-200">Issues Found</p>
                  <p className="text-red-700 dark:text-red-300">
                    Please resolve the errors above before proceeding. Most likely solutions:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>Restart your development server after .env.local changes</li>
                    <li>Install missing dependencies</li>
                    <li>Check your internet connection</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <p className="font-semibold text-green-800 dark:text-green-200">Looking Good!</p>
                <p className="text-green-700 dark:text-green-300">
                  Your configuration appears to be working. If you're still seeing errors, they might be related to:
                </p>
                <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-300 space-y-1 mt-2">
                  <li>Database setup (run the SQL scripts)</li>
                  <li>Port conflicts</li>
                  <li>Build/compilation issues</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Common Commands */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">If Server Won't Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs bg-transparent"
                onClick={() => copyCommand("lsof -ti:3000 | xargs kill -9 && npm run dev")}
              >
                <Copy className="w-3 h-3 mr-2" />
                Kill port 3000 & restart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs bg-transparent"
                onClick={() => copyCommand("npm run dev -- -p 3001")}
              >
                <Copy className="w-3 h-3 mr-2" />
                Use port 3001 instead
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">If Dependencies Missing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs bg-transparent"
                onClick={() => copyCommand("npm install")}
              >
                <Copy className="w-3 h-3 mr-2" />
                Install dependencies
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs bg-transparent"
                onClick={() => copyCommand("rm -rf node_modules package-lock.json && npm install")}
              >
                <Copy className="w-3 h-3 mr-2" />
                Clean reinstall
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button onClick={runStartupChecks} disabled={isChecking}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
            Check Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
