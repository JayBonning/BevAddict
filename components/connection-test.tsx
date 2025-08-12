"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function ConnectionTest() {
  const [status, setStatus] = useState<"checking" | "success" | "error">("checking")
  const [message, setMessage] = useState("Testing connection...")

  const testConnection = async () => {
    setStatus("checking")
    setMessage("Testing connection...")

    try {
      const supabase = createClient()

      // Simple connection test
      const { data, error } = await supabase.from("profiles").select("count").limit(1)

      if (error) {
        if (error.message.includes('relation "profiles" does not exist')) {
          setStatus("success")
          setMessage("✅ Connected! Database exists but tables need setup.")
        } else if (error.message.includes("Auth session missing")) {
          setStatus("success")
          setMessage("✅ Connected! Ready for authentication.")
        } else {
          setStatus("error")
          setMessage(`❌ Connection failed: ${error.message}`)
        }
      } else {
        setStatus("success")
        setMessage("✅ Connected! Everything looks good.")
      }
    } catch (error) {
      setStatus("error")
      setMessage(`❌ Connection error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status === "checking" && <RefreshCw className="w-5 h-5 animate-spin" />}
          {status === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
          {status === "error" && <XCircle className="w-5 h-5 text-red-600" />}
          Connection Test
        </CardTitle>
        <CardDescription>Testing Supabase connection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{message}</p>
        <Button onClick={testConnection} disabled={status === "checking"} className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Test Again
        </Button>
      </CardContent>
    </Card>
  )
}
