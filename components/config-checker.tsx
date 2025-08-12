"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"

interface ConfigCheck {
  name: string
  status: "success" | "error" | "warning"
  message: string
  value?: string
}

export default function ConfigChecker() {
  const [checks, setChecks] = useState<ConfigCheck[]>([])
  const [isChecking, setIsChecking] = useState(true)

  const runConfigChecks = () => {
    setIsChecking(true)
    const newChecks: ConfigCheck[] = []

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // URL Check
    if (!supabaseUrl) {
      newChecks.push({
        name: "NEXT_PUBLIC_SUPABASE_URL",
        status: "error",
        message: "Missing environment variable",
      })
    } else if (!supabaseUrl.startsWith("https://")) {
      newChecks.push({
        name: "NEXT_PUBLIC_SUPABASE_URL",
        status: "error",
        message: "Invalid URL format",
        value: supabaseUrl,
      })
    } else {
      newChecks.push({
        name: "NEXT_PUBLIC_SUPABASE_URL",
        status: "success",
        message: "Valid Supabase URL",
        value: supabaseUrl,
      })
    }

    // API Key Check
    if (!supabaseKey) {
      newChecks.push({
        name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        status: "error",
        message: "Missing environment variable",
      })
    } else if (!supabaseKey.startsWith("eyJ")) {
      newChecks.push({
        name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        status: "error",
        message: "Invalid JWT format",
        value: `${supabaseKey.substring(0, 20)}...`,
      })
    } else {
      newChecks.push({
        name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        status: "success",
        message: "Valid API key format",
        value: `${supabaseKey.substring(0, 20)}...`,
      })
    }

    setChecks(newChecks)
    setIsChecking(false)
  }

  useEffect(() => {
    runConfigChecks()
  }, [])

  const getStatusIcon = (status: ConfigCheck["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: ConfigCheck["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Valid</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Warning</Badge>
    }
  }

  const copyEnvFile = () => {
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://nmwjplpffvhoabwnyxmt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5td2pwbHBmZnZob2Fid255eG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1OTA4NjUsImV4cCI6MjA3MDE2Njg2NX0.RywUl1ZvhO6FDbLrIhrnh0FAL-XF38hejL46N9oIufE`

    navigator.clipboard.writeText(envContent)
    toast.success("Environment variables copied to clipboard!")
  }

  const hasErrors = checks.some((check) => check.status === "error")

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className={`w-5 h-5 ${isChecking ? "animate-spin" : ""}`} />
          Configuration Check
        </CardTitle>
        <CardDescription>Verifying your Supabase environment variables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
            {getStatusIcon(check.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium font-mono text-sm">{check.name}</h4>
                {getStatusBadge(check.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{check.message}</p>
              {check.value && (
                <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{check.value}</p>
              )}
            </div>
          </div>
        ))}

        {hasErrors && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <div className="space-y-3">
                <p className="font-semibold text-red-800 dark:text-red-200">Configuration Error Detected</p>
                <p className="text-red-700 dark:text-red-300">
                  Your environment variables are not properly configured. Follow these steps to fix:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                  <li>
                    Create or update your <code className="bg-red-100 dark:bg-red-900 px-1 rounded">.env.local</code>{" "}
                    file
                  </li>
                  <li>Copy the correct environment variables (button below)</li>
                  <li>
                    Restart your development server:{" "}
                    <code className="bg-red-100 dark:bg-red-900 px-1 rounded">npm run dev</code>
                  </li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {!hasErrors && checks.length > 0 && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <p className="font-semibold text-green-800 dark:text-green-200">Configuration Valid!</p>
              <p className="text-green-700 dark:text-green-300">
                Your Supabase environment variables are properly configured.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button onClick={copyEnvFile} variant="outline" className="flex-1 bg-transparent">
            <Copy className="w-4 h-4 mr-2" />
            Copy Environment Variables
          </Button>
          <Button onClick={runConfigChecks} variant="outline">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Quick Fix Steps:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Copy Environment Variables" above</li>
            <li>
              Create/edit <code className="bg-background px-1 rounded">.env.local</code> in your project root
            </li>
            <li>Paste the copied content</li>
            <li>Save the file</li>
            <li>
              Restart your server: <code className="bg-background px-1 rounded">npm run dev</code>
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
