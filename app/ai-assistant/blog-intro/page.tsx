import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogIntroPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Blog Introduction Generator</CardTitle>
          <CardDescription>
            Generate engaging blog introductions powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Welcome to the Blog Introduction Generator. This tool helps you create
              compelling introductions for your blog posts using advanced AI.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}