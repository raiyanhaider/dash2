'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, Search, ExternalLink, RefreshCw } from "lucide-react"

interface TrendingTopic {
  title: string
  category: string
  trend: 'up' | 'down'
  percentage: number
  relatedTopics: string[]
}

export default function TrendingTopics() {
  const [niche, setNiche] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [topics, setTopics] = useState<TrendingTopic[]>([])

  const handleSearch = () => {
    setIsSearching(true)
    // TODO: Implement actual trending topic search
    setTimeout(() => {
      setTopics([
        {
          title: "AI in Content Creation",
          category: "Technology",
          trend: "up",
          percentage: 85,
          relatedTopics: ["Machine Learning", "Content Automation", "GPT"]
        },
        {
          title: "Sustainable Living",
          category: "Lifestyle",
          trend: "up",
          percentage: 65,
          relatedTopics: ["Zero Waste", "Eco-friendly", "Green Living"]
        }
      ])
      setIsSearching(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Discover Hot Topics</CardTitle>
              <CardDescription>Find trending topics in your niche</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex gap-4">
            <Input
              placeholder="Enter your niche (e.g., technology, health, business)..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="bg-card/30"
            />
            <Button 
              onClick={handleSearch}
              className="min-w-[120px]"
              disabled={!niche.trim() || isSearching}
            >
              {isSearching ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {isSearching ? 'Searching...' : 'Find Topics'}
            </Button>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border bg-card/30 hover:bg-card/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{topic.title}</h3>
                      <p className="text-sm text-primary/60">{topic.category}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      topic.trend === 'up'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {topic.percentage}% {topic.trend === 'up' ? '↑' : '↓'}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Related Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedTopics.map((related, j) => (
                        <span
                          key={j}
                          className="px-2 py-1 rounded-full bg-primary/10 text-xs"
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Research Topic
                  </Button>
                </div>
              ))}
              
              {topics.length === 0 && (
                <div className="col-span-2 text-center py-12 text-primary/60">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No trending topics found</p>
                  <p className="text-sm">Enter your niche and click "Find Topics"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}