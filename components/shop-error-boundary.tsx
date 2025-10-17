"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Package, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ShopErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ShopErrorBoundary caught an error:', error, errorInfo)
    
    // Handle specific shop page errors
    if (error.message.includes('ChunkLoadError') || 
        error.message.includes('Loading chunk') ||
        error.message.includes('Hydration')) {
      console.log('Shop page error detected, attempting to reload...')
      // Force a hard reload to get fresh chunks
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Package className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Shop Loading Error</h2>
              <p className="text-gray-600 mb-4">
                There was an issue loading the shop page. This usually happens when:
              </p>
              <ul className="text-sm text-gray-500 mb-4 text-left">
                <li>• JavaScript chunks failed to load</li>
                <li>• Network connection issues</li>
                <li>• Browser cache problems</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleRetry}
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={this.handleReload}
                  className="flex-1"
                >
                  Reload Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={this.handleGoHome}
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
