'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface HealthCheck {
  name: string
  status: 'success' | 'error' | 'warning' | 'checking'
  message: string
  details?: string
}

export default function SetupChecker() {
  const [checks, setChecks] = useState<HealthCheck[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const runHealthChecks = async () => {
    setIsChecking(true)
    const newChecks: HealthCheck[] = []

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      newChecks.push({
        name: 'Environment Variables',
        status: 'success',
        message: 'Supabase credentials configured',
        details: `URL: ${supabaseUrl.substring(0, 30)}...`
      })
    } else {
      newChecks.push({
        name: 'Environment Variables',
        status: 'error',
        message: 'Missing Supabase credentials',
        details: 'NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not found'
      })
    }

    // Check Supabase connection
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('profiles').select('count').limit(1)
      
      if (error) {
        if (error.message.includes('relation "profiles" does not exist')) {
          newChecks.push({
            name: 'Database Schema',
            status: 'warning',
            message: 'Tables not created yet',
            details: 'Run the database setup scripts to create tables'
          })
        } else {
          newChecks.push({
            name: 'Supabase Connection',
            status: 'error',
            message: 'Connection failed',
            details: error.message
          })
        }
      } else {
        newChecks.push({
          name: 'Supabase Connection',
          status: 'success',
          message: 'Connected successfully',
          details: 'Database is accessible'
        })
      }
    } catch (error) {
      newChecks.push({
        name: 'Supabase Connection',
        status: 'error',
        message: 'Connection error',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    }

    // Check authentication
    try {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error && !error.message.includes('Invalid JWT')) {
        newChecks.push({
          name: 'Authentication',
          status: 'error',
          message: 'Auth service error',
          details: error.message
        })
      } else {
        newChecks.push({
          name: 'Authentication',
          status: 'success',
          message: user ? 'User authenticated' : 'Auth service ready',
          details: user ? `Logged in as ${user.email}` : 'Ready for login/signup'
        })
      }
    } catch (error) {
      newChecks.push({
        name: 'Authentication',
        status: 'warning',
        message: 'Auth check skipped',
        details: 'Unable to verify auth service'
      })
    }

    // Check storage
    try {
      const supabase = createClient()
      const { data, error } = await supabase.storage.listBuckets()
      
      if (error) {
        newChecks.push({
          name: 'Storage Service',
          status: 'warning',
          message: 'Storage not accessible',
          details: 'Image uploads may not work'
        })
      } else {
        const hasBeverageBucket = data.some(bucket => bucket.name === 'beverage-images')
        newChecks.push({
          name: 'Storage Service',
          status: hasBeverageBucket ? 'success' : 'warning',
          message: hasBeverageBucket ? 'Storage configured' : 'Bucket not found',
          details: hasBeverageBucket ? 'beverage-images bucket exists' : 'Run storage setup script'
        })
      }
    } catch (error) {
      newChecks.push({
        name: 'Storage Service',
        status: 'warning',
        message: 'Storage check failed',
        details: 'Unable to verify storage service'
      })
    }

    setChecks(newChecks)
    setIsChecking(false)
  }

  useEffect(() => {
    runHealthChecks()
  }, [])

  const getStatusIcon = (status: HealthCheck['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'checking':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
    }
  }

  const getStatusBadge = (status: HealthCheck['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'checking':
        return <Badge variant="secondary">Checking...</Badge>
    }
  }

  const overallStatus = checks.length > 0 ? (
    checks.every(check => check.status === 'success') ? 'success' :
    checks.some(check => check.status === 'error') ? 'error' : 'warning'
  ) : 'checking'

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(overallStatus)}
              System Health Check
            </CardTitle>
            <CardDescription>
              Verifying Supabase configuration and services
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={runHealthChecks}
            disabled={isChecking}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
            {getStatusIcon(check.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{check.name}</h4>
                {getStatusBadge(check.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{check.message}</p>
              {check.details && (
                <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {check.details}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {checks.length === 0 && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Running health checks...</p>
          </div>
        )}
        
        {overallStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold text-green-800">All Systems Ready!</h3>
            <p className="text-sm text-green-700">Your beverage rating app is properly configured.</p>
          </div>
        )}
        
        {overallStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-semibold text-red-800">Configuration Issues</h3>
            <p className="text-sm text-red-700">Please resolve the errors above before proceeding.</p>
          </div>
        )}
        
        {overallStatus === 'warning' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Setup Incomplete</h3>
            <p className="text-sm text-yellow-700">Some features may not work until warnings are resolved.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
