import ErrorDiagnostics from "@/components/error-diagnostics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal, MessageSquare } from "lucide-react"

export default function ErrorHelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🔧 Error Troubleshooting</h1>
          <p className="text-muted-foreground text-lg">Let's identify and fix the issue you're experiencing</p>
        </div>

        <Alert>
          <MessageSquare className="h-4 w-4" />
          <AlertDescription>
            <strong>Need specific help?</strong> Share the exact error message you're seeing for more targeted
            assistance.
          </AlertDescription>
        </Alert>

        <ErrorDiagnostics />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Step-by-Step Debugging
              </CardTitle>
              <CardDescription>Follow these steps in order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Check Node.js version</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">node --version</code>
                    <p className="text-xs text-muted-foreground mt-1">Should be 18.0.0 or higher</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Verify .env.local exists</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">ls -la | grep .env</code>
                    <p className="text-xs text-muted-foreground mt-1">Should show .env.local file</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Clean install dependencies</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">rm -rf node_modules && npm install</code>
                    <p className="text-xs text-muted-foreground mt-1">Fresh dependency installation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Clear Next.js cache</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">rm -rf .next</code>
                    <p className="text-xs text-muted-foreground mt-1">Remove build cache</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    5
                  </div>
                  <div>
                    <p className="font-medium">Start development server</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">npm run dev</code>
                    <p className="text-xs text-muted-foreground mt-1">Launch the application</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most Common Errors</CardTitle>
              <CardDescription>Quick fixes for frequent issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-red-600">EADDRINUSE :::3000</p>
                  <p className="text-muted-foreground">Port 3000 is already in use</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-1 block">npm run dev -- -p 3001</code>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-red-600">Module not found</p>
                  <p className="text-muted-foreground">Missing dependencies</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-1 block">npm install</code>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-red-600">Configuration Error</p>
                  <p className="text-muted-foreground">Missing environment variables</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-1 block">Check .env.local file</code>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-red-600">Build failed</p>
                  <p className="text-muted-foreground">TypeScript or build errors</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-1 block">rm -rf .next && npm run dev</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
