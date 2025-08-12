"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Key, ExternalLink } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function JWTSecretInfo() {
  const [showSecret, setShowSecret] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          JWT Secret Information
        </CardTitle>
        <CardDescription>Understanding Supabase JWT secrets and when you need them</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Good news!</strong> You don't need to manually set the JWT secret for basic Supabase usage. It's
            automatically handled by Supabase's authentication system.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">When JWT Secret is NOT Needed:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Standard Supabase authentication (what we're using)</li>
              <li>• Row Level Security policies</li>
              <li>• Client-side applications</li>
              <li>• Most common use cases</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">When JWT Secret IS Needed:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Custom server-side JWT verification</li>
              <li>• Advanced security implementations</li>
              <li>• Custom authentication flows</li>
              <li>• Third-party integrations requiring JWT validation</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              Where to Find JWT Secret (if needed):
              <Badge variant="secondary">Advanced</Badge>
            </h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  1
                </Badge>
                <div>
                  <p>Go to your Supabase Dashboard</p>
                  <Button variant="link" className="p-0 h-auto text-xs" asChild>
                    <a
                      href="https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/settings/api"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open API Settings
                    </a>
                  </Button>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  2
                </Badge>
                <p>Navigate to Settings → API</p>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  3
                </Badge>
                <p>Look for "JWT Secret" in the Project API keys section</p>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  4
                </Badge>
                <p>Click the eye icon to reveal the secret</p>
              </li>
            </ol>
          </div>

          {showSecret && (
            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                <strong>For your project:</strong> The JWT secret is available in your Supabase dashboard under Settings
                → API → Project API keys → JWT Secret. However, you don't need it for this application!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSecret(!showSecret)}>
              {showSecret ? "Hide" : "Show"} JWT Secret Location
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/settings/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open API Settings
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
