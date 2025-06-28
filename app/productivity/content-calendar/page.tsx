'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Sparkles, Settings2, RefreshCw, Plus, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContentItem {
  title: string
  category: string
  week: number
  day: string
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

export default function ContentCalendar() {
  const [niche, setNiche] = useState('')
  const [contentsPerWeek, setContentsPerWeek] = useState('3')
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [keywords, setKeywords] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [calendar, setCalendar] = useState<ContentItem[]>([])

  const handleAddCategory = () => {
    if (!newCategory.trim() || categories.includes(newCategory.trim())) return
    setCategories(prev => [...prev, newCategory.trim()])
    setNewCategory('')
  }

  const handleRemoveCategory = (category: string) => {
    setCategories(prev => prev.filter(c => c !== category))
  }

  const generateTitleForCategory = (category: string, niche: string) => {
    return `${category} about ${niche}`
  }

  const generateCalendar = () => {
    if (!niche || categories.length === 0) return
    
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      const numWeeks = 4
      const newCalendar: ContentItem[] = []
      
      for (let week = 1; week <= numWeeks; week++) {
        const numContents = parseInt(contentsPerWeek)
        const shuffledDays = [...weekDays].sort(() => Math.random() - 0.5).slice(0, numContents)
        
        shuffledDays.forEach((day, index) => {
          const category = categories[index % categories.length]
          newCalendar.push({
            title: generateTitleForCategory(category, niche),
            category,
            week,
            day
          })
        })
      }
      
      setCalendar(newCalendar)
      setIsGenerating(false)
    }, 2000)
  }

  const getWeekDateRange = (weekNum: number) => {
    const today = new Date()
    const startDate = new Date(today.setDate(today.getDate() + (weekNum - 1) * 7))
    const endDate = new Date(today.setDate(today.getDate() + 6))
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Content Calendar Generator</CardTitle>
              <CardDescription>Create your monthly content plan in seconds</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                placeholder="Enter your niche or topic (e.g., Digital Marketing)..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="bg-card/30"
              />
              <Select value={contentsPerWeek} onValueChange={setContentsPerWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="Contents per week" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'content' : 'contents'} per week
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card/30">
                <h3 className="text-sm font-medium mb-3">Add Your Content Categories</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a category..."
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                      className="bg-card/20"
                    />
                    <Button
                      onClick={handleAddCategory}
                      disabled={!newCategory.trim()}
                      size="icon"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {categories.map(category => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-2 rounded-lg bg-primary/10"
                    >
                      <span className="text-sm">{category}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCategory(category)}
                        className="h-6 w-6"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Keywords (one per line)</h3>
            <Textarea
              placeholder="Enter your target keywords..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="h-32 bg-card/30"
            />
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={generateCalendar}
              disabled={!niche || categories.length === 0 || isGenerating}
              className="min-w-[200px]"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Create My Calendar'}
            </Button>
          </div>

          {calendar.length > 0 && (
            <div className="space-y-6">
              {[1, 2, 3, 4].map(week => (
                <div key={week} className="space-y-3">
                  <h3 className="font-medium">
                    Week {week}
                    <span className="text-sm text-primary/60 ml-2">
                      {getWeekDateRange(week)}
                    </span>
                  </h3>
                  <div className="grid gap-3">
                    {calendar
                      .filter(item => item.week === week)
                      .sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day))
                      .map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border bg-card/30 hover:bg-card/40 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{item.day}</span>
                                <span className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-base">{item.title}</p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!calendar.length && !isGenerating && (
            <div className="text-center py-12 text-primary/60">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No calendar generated yet</p>
              <p className="text-sm">Fill in the details above and click "Create My Calendar"</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}