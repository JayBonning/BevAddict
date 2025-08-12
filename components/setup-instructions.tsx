"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Terminal, Zap, Globe, Code, Rocket } from "lucide-react"
import { useState } from "react"

export default function SetupInstructions() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => (prev.includes(stepIndex) ? prev.filter((i) => i !== stepIndex) : [...prev, stepIndex]))
  }

  const steps = [
    {
      title: "Install Node.js",
      description: "Download and install Node.js 18+ from nodejs.org",
      command: "node --version",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: "Install Dependencies",
      description: "Install all required packages",
      command: "npm install",
      icon: <Terminal className="w-5 h-5" />,
    },
    {
      title: "Setup Database",
      description: "Run SQL scripts in Supabase SQL Editor",
      command: "# Run scripts 01-05 in order",
      icon: <Code className="w-5 h-5" />,
    },
    {
      title: "Start Development",
      description: "Launch the development server",
      command: "npm run dev",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Open Application",
      description: "Visit your app in the browser",
      command: "http://localhost:3000",
      icon: <Rocket className="w-5 h-5" />,
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Simple Setup (No Docker!)
        </CardTitle>
        <CardDescription>Get your beverage rating app running in minutes with just Node.js</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Good news!</strong> This app runs perfectly without Docker. You only need Node.js and npm!
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="font-semibold">Prerequisites</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Badge variant="outline">✓</Badge>
              <div>
                <p className="font-medium">Node.js 18+</p>
                <p className="text-sm text-muted-foreground">JavaScript runtime</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Badge variant="outline">✓</Badge>
              <div>
                <p className="font-medium">npm/yarn</p>
                <p className="text-sm text-muted-foreground">Package manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Setup Steps</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 border rounded-lg transition-colors ${
                  completedSteps.includes(index)
                    ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={completedSteps.includes(index) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleStep(index)}
                  >
                    {completedSteps.includes(index) ? <CheckCircle className="w-3 h-3" /> : index + 1}
                  </Badge>
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{step.command}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Available Commands</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { cmd: "npm run dev", desc: "Start development server" },
              { cmd: "npm run build", desc: "Build for production" },
              { cmd: "npm run start", desc: "Start production server" },
              { cmd: "npm run lint", desc: "Check code quality" },
            ].map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <code className="text-sm font-mono text-primary">{item.cmd}</code>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className={`flex-1 ${completedSteps.length === steps.length ? "bg-green-600 hover:bg-green-700" : ""}`}
            disabled={completedSteps.length < 2}
          >
            {completedSteps.length === steps.length ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Setup Complete!
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4 mr-2" />
                {completedSteps.length < 2 ? "Complete Prerequisites" : "Ready to Start"}
              </>
            )}
          </Button>
        </div>

        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>
            <strong>Pro tip:</strong> The app includes hot reload, so your changes will appear instantly during
            development!
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
