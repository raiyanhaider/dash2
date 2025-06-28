'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Wand2, Sparkles } from "lucide-react"
import { useState } from "react"

export default function OneClickBlogWizard() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")

  const handleGenerate = () => {
    // TODO: Implement content generation
    console.log({ title, description, keywords })
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <CardTitle className="text-3xl font-bold gradient-text">One-Click Blog Wizard</CardTitle>
          </div>
          <CardDescription>Generate a complete blog post with a single click</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-card/30 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to write about..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-32 bg-card/30 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Enter keywords separated by commas..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-card/30 border-primary/20"
                />
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full text-lg"
              onClick={handleGenerate}
              disabled={!title.trim() || !description.trim()}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Blog Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}