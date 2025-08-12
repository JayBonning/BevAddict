import ConnectionTest from "@/components/connection-test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Settings } from "lucide-react"

export default function TestConnectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🔌 Connection Test</h1>
          <p className="text-muted-foreground">Let's test your Supabase connection without any redirects</p>
        </div>

        <ConnectionTest />

        <Card>
          <CardHeader>
            <CardTitle>What This Test Does</CardTitle>
            <CardDescription>Understanding the connection test results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <p>
                <strong>✅ Connected! Ready for authentication:</strong> Perfect! Your setup is working.
              </p>
              <p>
                <strong>✅ Connected! Database exists but tables need setup:</strong> Connection works, run SQL scripts.
              </p>
              <p>
                <strong>❌ Connection failed:</strong> Check your .env.local file and restart the server.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Link href="/config-error">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Fix Configuration
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Try Login Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
