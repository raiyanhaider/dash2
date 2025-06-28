'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, RefreshCw, Download, Star, ArrowRight, Filter, SortAsc, SortDesc } from "lucide-react"

interface KeywordGroup {
  type: string
  keywords: Array<{
    word: string
    score: number
    volume?: string
    difficulty?: number
    trend?: 'up' | 'down' | 'stable'
  }>
}

export default function KeywordsFinder() {
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'score' | 'volume' | 'difficulty'>('score')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isSearching, setIsSearching] = useState(false)
  const [keywordGroups, setKeywordGroups] = useState<KeywordGroup[]>([])
  const [savedKeywords, setSavedKeywords] = useState<Set<string>>(new Set())

  const handleSaveKeyword = (word: string) => {
    setSavedKeywords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(word)) {
        newSet.delete(word)
      } else {
        newSet.add(word)
      }
      return newSet
    })
  }

  const handleExport = () => {
    const exportData = keywordGroups
      .flatMap(group => group.keywords)
      .filter(kw => savedKeywords.has(kw.word))
      .map(kw => ({
        keyword: kw.word,
        score: kw.score,
        volume: kw.volume,
        difficulty: kw.difficulty,
        trend: kw.trend
      }))

    const csv = [
      ['Keyword', 'Score', 'Volume', 'Difficulty', 'Trend'].join(','),
      ...exportData.map(row => 
        [row.keyword, row.score, row.volume, row.difficulty, row.trend].join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'keywords.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSearch = () => {
    setIsSearching(true)
    // Simulated API call
    setTimeout(() => {
      setKeywordGroups([
        {
          type: "Related Terms",
          keywords: [
            { word: "content marketing", score: 95, volume: "110K", difficulty: 65, trend: 'up' },
            { word: "digital marketing", score: 88, volume: "90K", difficulty: 72, trend: 'stable' },
            { word: "marketing strategy", score: 82, volume: "75K", difficulty: 58, trend: 'up' }
          ]
        },
        {
          type: "Questions",
          keywords: [
            { word: "what is content marketing", score: 78, volume: "40K", difficulty: 45, trend: 'up' },
            { word: "how to create content", score: 75, volume: "35K", difficulty: 42, trend: 'stable' },
            { word: "content marketing tips", score: 72, volume: "30K", difficulty: 51, trend: 'down' }
          ]
        },
        {
          type: "Long-tail Keywords",
          keywords: [
            { word: "content marketing for small business", score: 68, volume: "15K", difficulty: 35, trend: 'up' },
            { word: "b2b content marketing strategy", score: 65, volume: "12K", difficulty: 48, trend: 'up' },
            { word: "content marketing examples 2024", score: 62, volume: "10K", difficulty: 40, trend: 'stable' }
          ]
        }
      ])
      setIsSearching(false)
    }, 2000)
  }

  const sortKeywords = (keywords: KeywordGroup['keywords']) => {
    return [...keywords].sort((a, b) => {
      let aValue = sortBy === 'volume' ? parseInt(a.volume?.replace('K', '000') || '0') : 
                   sortBy === 'difficulty' ? a.difficulty || 0 : 
                   a.score
      let bValue = sortBy === 'volume' ? parseInt(b.volume?.replace('K', '000') || '0') : 
                   sortBy === 'difficulty' ? b.difficulty || 0 : 
                   b.score
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Keyword Explorer</CardTitle>
              <CardDescription>Discover related keywords and search terms</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Enter a keyword to explore..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-card/30"
              />
              <Button 
                onClick={handleSearch}
                className="min-w-[120px]"
                disabled={!keyword.trim() || isSearching}
              >
                {isSearching ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {isSearching ? 'Searching...' : 'Explore'}
              </Button>
            </div>
            
            {keywordGroups.length > 0 && (
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary/60" />
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {keywordGroups.map(group => (
                        <SelectItem key={group.type} value={group.type.toLowerCase()}>
                          {group.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  {sortOrder === 'asc' ? (
                    <SortAsc className="w-4 h-4 text-primary/60" />
                  ) : (
                    <SortDesc className="w-4 h-4 text-primary/60" />
                  )}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="score">Relevance Score</SelectItem>
                      <SelectItem value="volume">Search Volume</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? (
                      <SortAsc className="w-4 h-4" />
                    ) : (
                      <SortDesc className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ScrollArea className="h-[500px]">
            <div className="space-y-8">
              {keywordGroups
                .filter(group => filter === 'all' || group.type.toLowerCase() === filter)
                .map((group, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="font-medium text-lg">{group.type}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {sortKeywords(group.keywords).map((kw, j) => (
                      <div
                        key={j}
                        className="p-4 rounded-lg border bg-card/30 hover:bg-card/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{kw.word}</h4>
                              <div className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                                Score: {kw.score}
                              </div>
                              {kw.difficulty && (
                                <div className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                                  Difficulty: {kw.difficulty}
                                </div>
                              )}
                              {kw.trend && (
                                <div className={`px-2 py-1 rounded-full text-xs ${
                                  kw.trend === 'up' ? 'bg-green-500/10 text-green-500' :
                                  kw.trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                  'bg-primary/10'
                                }`}>
                                  {kw.trend === 'up' ? '↑' : kw.trend === 'down' ? '↓' : '→'}
                                </div>
                              )}
                            </div>
                            {kw.volume && (
                              <p className="text-sm text-primary/60 mt-1">
                                Monthly Volume: {kw.volume}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleSaveKeyword(kw.word)}
                          >
                            <Star className={`w-4 h-4 ${
                              savedKeywords.has(kw.word) ? 'fill-primary' : ''
                            }`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {keywordGroups.length === 0 && (
                <div className="text-center py-12 text-primary/60">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a keyword to start exploring</p>
                  <p className="text-sm">Discover related terms, questions, and long-tail keywords</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {keywordGroups.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleExport}
                disabled={savedKeywords.size === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export {savedKeywords.size} Keywords
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}