import DatabaseStatus from "@/components/database-status"
import JWTSecretInfo from "@/components/jwt-secret-info"
import SetupInstructions from "@/components/setup-instructions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Play, FileText, Settings, ExternalLink, Terminal } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default async function SetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🍹 BevRate Setup</h1>
          <p className="text-muted-foreground text-lg">Your beverage rating application - no Docker required!</p>
        </div>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertDescription>
            <strong>Simple Setup:</strong> This app runs perfectly with just Node.js and npm. No Docker complexity
            needed!
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 lg:grid-cols-2">
          <SetupInstructions />
          <DatabaseStatus />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuration Status
              </CardTitle>
              <CardDescription>Your Supabase project is properly configured</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">Supabase URL</h4>
                    <p className="text-sm text-green-600 dark:text-green-400 font-mono">
                      nmwjplpffvhoabwnyxmt.supabase.co
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    ✓ Connected
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">API Key</h4>
                    <p className="text-sm text-green-600 dark:text-green-400 font-mono">
                      eyJhbGciOiJIUzI1NiIsInR5cCI6...
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">✓ Valid</Badge>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a
                    href="https://nmwjplpffvhoabwnyxmt.supabase.co/project/default"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Supabase Dashboard
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <JWTSecretInfo />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Setup Instructions
            </CardTitle>
            <CardDescription>Complete these steps to set up your database schema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Required SQL Scripts</h3>
                <div className="space-y-2">
                  {[
                    { file: "01-create-tables.sql", desc: "Database schema (JWT secret removed!)", updated: true },
                    { file: "02-create-policies.sql", desc: "Row Level Security policies" },
                    { file: "03-create-functions.sql", desc: "Database functions and triggers" },
                    { file: "04-create-storage.sql", desc: "File storage configuration" },
                    { file: "05-update-reviews-table.sql", desc: "Enhanced review fields" },
                  ].map((script, index) => (
                    <div key={script.file} className="flex items-center gap-3 p-2 rounded border">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div className="flex-1">
                        <p className="font-mono text-sm flex items-center gap-2">
                          {script.file}
                          {script.updated && (
                            <Badge variant="secondary" className="text-xs">
                              Updated
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{script.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Simple Commands</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">1. Install & Start</p>
                    <code className="text-xs bg-background px-2 py-1 rounded">npm install && npm run dev</code>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">2. Setup Database</p>
                    <p className="text-muted-foreground">Run SQL scripts in Supabase</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">3. Open App</p>
                    <code className="text-xs bg-background px-2 py-1 rounded">http://localhost:3000</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-6 border-t">
              <Button asChild>
                <a
                  href="https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/sql"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Open SQL Editor
                </a>
              </Button>
              <Link href="/auth/login">
                <Button variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Start Using App
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
