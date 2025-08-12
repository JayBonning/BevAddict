import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ExternalLink, FileText, Settings } from "lucide-react"
import Link from "next/link"

export default function ConfigErrorPage() {
  return (
    <div className="min-h-screen bg-brewing flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="glass-card border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white text-shadow">Configuration Required</CardTitle>
            <CardDescription className="text-gray-200 text-shadow">
              Your Supabase configuration needs to be set up before you can use the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Quick Setup Steps
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
                <li>Create a Supabase project at supabase.com</li>
                <li>Copy your project URL and anon key</li>
                <li>Add them to your .env.local file</li>
                <li>Run the database setup scripts</li>
                <li>Restart your development server</li>
              </ol>
            </div>

            <div className="grid gap-3">
              <Button asChild className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Link href="/setup" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Setup Guide
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="/startup-check" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Run Startup Check
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="https://supabase.com" target="_blank" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Create Supabase Project
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-300">
                Need help? Check the{" "}
                <Link href="/error-help" className="text-blue-300 hover:text-blue-200 underline">
                  troubleshooting guide
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
