"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Terminal, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"

interface DiagnosticCheck {
  name: string
  status: "success" | "error" | "warning" | "checking"
  message: string
  solution?: string
  command?: string
}

export default function ErrorDiagnostics() {
  const [checks, setChecks] = useState<DiagnosticCheck[]>([])
  const [isChecking, setIsChecking] = useState(true)

  const runDiagnostics = async () => {
    setIsChecking(true)
    const newChecks: DiagnosticCheck[] = []

    // Check Node.js version
    try {
      const nodeVersion = process.version
      const majorVersion = Number.parseInt(nodeVersion.slice(1).split(".")[0])

      if (majorVersion >= 18) {
        newChecks.push({
          name: "Node.js Version",
          status: "success",
          message: `Node.js ${nodeVersion} (Compatible)`,
        })
      } else {
        newChecks.push({
          name: "Node.js Version",
          status: "error",
          message: `Node.js ${nodeVersion} (Requires 18+)`,
          solution: "Update Node.js to version 18 or higher",
          command: "Visit nodejs.org to download latest version",
        })
      }
    } catch (error) {
      newChecks.push({
        name: "Node.js Version",
        status: "warning",
        message: "Unable to detect Node.js version",
      })
    }

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      newChecks.push({
        name: "Environment Variables",
        status: "error",
        message: "Missing Supabase credentials",
        solution: "Create .env.local file with Supabase credentials",
        command: "Copy the environment variables from the setup guide",
      })
    } else {
      newChecks.push({
        name: "Environment Variables",
        status: "success",
        message: "Supabase credentials found",
      })
    }

    // Check if we can connect to Supabase
    try {
      if (supabaseUrl && supabaseKey) {
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
            message: "Can connect to Supabase",
          })
        } else {
          newChecks.push({
            name: "Supabase Connection",
            status: "error",
            message: `Connection failed (${response.status})`,
            solution: "Check your Supabase URL and API key",
          })
        }
      }
    } catch (error) {
      newChecks.push({
        name: "Supabase Connection",
        status: "error",
        message: "Network error connecting to Supabase",
        solution: "Check your internet connection and Supabase credentials",
      })
    }

    // Check for common dependency issues
    try {
      // This will fail if React is not properly installed
      const reactVersion = require("react/package.json").version
      newChecks.push({
        name: "React Dependencies",
        status: "success",
        message: `React ${reactVersion} installed`,
      })
    } catch (error) {
      newChecks.push({
        name: "React Dependencies",
        status: "error",
        message: "React dependencies missing or corrupted",
        solution: "Reinstall dependencies",
        command: "rm -rf node_modules package-lock.json && npm install",
      })
    }

    setChecks(newChecks)
    setIsChecking(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: DiagnosticCheck["status"]) => {
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Error Diagnostics
        </CardTitle>
        <CardDescription>Let's identify and fix the issue you're experiencing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Diagnostic Results */}
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
              {getStatusIcon(check.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{check.name}</h4>
                  <Badge
                    variant={
                      check.status === "success" ? "default" : check.status === "error" ? "destructive" : "secondary"
                    }
                  >
                    {check.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{check.message}</p>

                {check.solution && (
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm font-medium mb-1">Solution:</p>
                    <p className="text-sm text-muted-foreground mb-2">{check.solution}</p>
                    {check.command && (
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-background px-2 py-1 rounded flex-1">{check.command}</code>
                        <Button size="sm" variant="outline" onClick={() => copyCommand(check.command!)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Common Error Solutions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Common Error Solutions</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Port Already in Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Error: EADDRINUSE :::3000</p>
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() => copyCommand("lsof -ti:3000 | xargs kill -9")}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Kill process on port 3000
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() => copyCommand("npm run dev -- -p 3001")}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Use different port
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Module Not Found</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Cannot resolve module</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs bg-transparent"
                  onClick={() => copyCommand("rm -rf node_modules package-lock.json && npm install")}
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Reinstall dependencies
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">TypeScript Errors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Type checking failed</p>
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() => copyCommand("npm run type-check")}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Check types
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() => copyCommand("npx tsc --noEmit --skipLibCheck")}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Skip lib check
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Build Errors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Build failed</p>
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() => copyCommand("rm -rf .next && npm run dev")}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Clear Next.js cache
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() => copyCommand("npm run build")}
                  >
                    <Copy className="w-3 h-3 mr-2" />
                    Test build
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Reset */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Nuclear Option - Complete Reset:</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyCommand("rm -rf node_modules package-lock.json .next && npm install && npm run dev")
                  }
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Complete Reset Command
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This will delete all cached files and reinstall everything from scratch.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button onClick={runDiagnostics} disabled={isChecking}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
            Run Diagnostics Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
