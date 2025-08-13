import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Database, Key, Server } from "lucide-react"
import Link from "next/link"

export default function ConfigErrorPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/brewing-background.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl text-white drop-shadow">Configuration Error</CardTitle>
            <CardDescription className="text-gray-200 drop-shadow">
              There's an issue with your Supabase configuration. Let's fix it step by step.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <Key className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Check Environment Variables</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Make sure your <code className="bg-black/20 px-1 rounded">.env.local</code> file contains:
                  </p>
                  <pre className="text-xs bg-black/30 p-2 rounded mt-2 text-gray-200">
                    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url{"\n"}
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                  </pre>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <Database className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Database Setup</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Run the SQL scripts in your Supabase dashboard to create the necessary tables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <Server className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Restart Development Server</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    After updating your environment variables, restart your development server.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/setup" className="flex-1">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm">
                  Setup Guide
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Try Again
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
