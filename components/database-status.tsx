"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Database, Table, Shield, HardDrive } from "lucide-react"
import { toast } from "sonner"

interface DatabaseCheck {
  name: string
  status: "success" | "error" | "warning" | "checking"
  message: string
  details?: string
  icon: React.ReactNode
}

export default function DatabaseStatus() {
  const [checks, setChecks] = useState<DatabaseCheck[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const runDatabaseChecks = async () => {
    setIsChecking(true)
    const newChecks: DatabaseCheck[] = []

    try {
      const supabase = createClient()

      // Check connection
      newChecks.push({
        name: "Database Connection",
        status: "checking",
        message: "Testing connection...",
        icon: <Database className="w-5 h-5" />,
      })

      // Test basic connection
      const { error: connectionError } = await supabase.from("profiles").select("count").limit(1)

      if (connectionError) {
        if (connectionError.message.includes('relation "profiles" does not exist')) {
          newChecks[0] = {
            name: "Database Connection",
            status: "warning",
            message: "Connected, but tables missing",
            details: "Run database setup scripts",
            icon: <Database className="w-5 h-5" />,
          }
        } else {
          newChecks[0] = {
            name: "Database Connection",
            status: "error",
            message: "Connection failed",
            details: connectionError.message,
            icon: <Database className="w-5 h-5" />,
          }
        }
      } else {
        newChecks[0] = {
          name: "Database Connection",
          status: "success",
          message: "Connected successfully",
          details: "Database is accessible",
          icon: <Database className="w-5 h-5" />,
        }
      }

      // Check tables
      const tables = ["profiles", "reviews", "friendships", "comments"]
      let tablesExist = 0

      for (const table of tables) {
        try {
          const { error } = await supabase.from(table).select("count").limit(1)
          if (!error) tablesExist++
        } catch (e) {
          // Table doesn't exist
        }
      }

      newChecks.push({
        name: "Database Tables",
        status: tablesExist === tables.length ? "success" : tablesExist > 0 ? "warning" : "error",
        message: `${tablesExist}/${tables.length} tables found`,
        details: tablesExist === tables.length ? "All required tables exist" : "Some tables are missing",
        icon: <Table className="w-5 h-5" />,
      })

      // Check RLS policies
      try {
        const { data: policies } = await supabase.rpc("get_policies_count")
        newChecks.push({
          name: "Security Policies",
          status: policies && policies > 0 ? "success" : "warning",
          message: policies ? `${policies} policies active` : "No policies found",
          details: "Row Level Security configuration",
          icon: <Shield className="w-5 h-5" />,
        })
      } catch (e) {
        newChecks.push({
          name: "Security Policies",
          status: "warning",
          message: "Cannot verify policies",
          details: "RLS status unknown",
          icon: <Shield className="w-5 h-5" />,
        })
      }

      // Check storage
      try {
        const { data: buckets, error: storageError } = await supabase.storage.listBuckets()

        if (storageError) {
          newChecks.push({
            name: "File Storage",
            status: "error",
            message: "Storage not accessible",
            details: storageError.message,
            icon: <HardDrive className="w-5 h-5" />,
          })
        } else {
          const hasBeverageBucket = buckets.some((bucket) => bucket.name === "beverage-images")
          newChecks.push({
            name: "File Storage",
            status: hasBeverageBucket ? "success" : "warning",
            message: hasBeverageBucket ? "Storage configured" : "Bucket missing",
            details: hasBeverageBucket ? "beverage-images bucket ready" : "Run storage setup script",
            icon: <HardDrive className="w-5 h-5" />,
          })
        }
      } catch (e) {
        newChecks.push({
          name: "File Storage",
          status: "warning",
          message: "Storage check failed",
          details: "Unable to verify storage",
          icon: <HardDrive className="w-5 h-5" />,
        })
      }
    } catch (error) {
      toast.error("Database check failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      })
    }

    setChecks(newChecks)
    setIsChecking(false)
  }

  useEffect(() => {
    runDatabaseChecks()
  }, [])

  const getStatusIcon = (status: DatabaseCheck["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "checking":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
    }
  }

  const getStatusBadge = (status: DatabaseCheck["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Ready</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Warning</Badge>
      case "checking":
        return <Badge variant="secondary">Checking...</Badge>
    }
  }

  const overallStatus =
    checks.length > 0
      ? checks.every((check) => check.status === "success")
        ? "success"
        : checks.some((check) => check.status === "error")
          ? "error"
          : "warning"
      : "checking"

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Status
            </CardTitle>
            <CardDescription>Supabase: nmwjplpffvhoabwnyxmt.supabase.co</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={runDatabaseChecks} disabled={isChecking}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
            <div className="flex items-center gap-2">
              {check.icon}
              {getStatusIcon(check.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{check.name}</h4>
                {getStatusBadge(check.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{check.message}</p>
              {check.details && (
                <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{check.details}</p>
              )}
            </div>
          </div>
        ))}

        {checks.length === 0 && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Running database checks...</p>
          </div>
        )}

        {overallStatus === "success" && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold text-green-800 dark:text-green-200">Database Ready!</h3>
            <p className="text-sm text-green-700 dark:text-green-300">All systems are operational.</p>
          </div>
        )}

        {overallStatus === "error" && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-semibold text-red-800 dark:text-red-200">Database Issues</h3>
            <p className="text-sm text-red-700 dark:text-red-300">Please resolve the errors above.</p>
          </div>
        )}

        {overallStatus === "warning" && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Setup Incomplete</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Some features may not work until setup is complete.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
