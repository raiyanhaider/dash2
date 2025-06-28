"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileEdit, Wand2, RefreshCw } from "lucide-react";

interface ArticleSettings {
  topic: string;
  title: string;
  keywords: string;
  tone: string;
  length: 'very-short' | 'short' | 'medium' | 'long' | 'extra-long';
  creativity: 'conservative' | 'balanced' | 'neutral' | 'creative' | 'highly-creative';
  targetAudience: string;
}

export default function ArticleGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [settings, setSettings] = useState<ArticleSettings>({
    topic: '',
    title: '',
    keywords: '',
    tone: 'professional',
    length: 'medium',
    creativity: 'balanced',
    targetAudience: ''
  });

  const handleGenerate = () => {
    if (!settings.topic) return;
    
    setIsGenerating(true);
    // Simulated API call
    setTimeout(() => {
      setGeneratedContent('Your generated article will appear here...');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-5xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileEdit className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
                Article Generator
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Create high-quality articles powered by AI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Panel */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Textarea
                    placeholder="What would you like to write about?"
                    value={settings.topic}
                    onChange={(e) => setSettings({ ...settings, topic: e.target.value })}
                    className="h-32 bg-card/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter article title"
                    value={settings.title}
                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                    className="bg-card/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <Input
                    placeholder="Enter keywords separated by commas"
                    value={settings.keywords}
                    onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                    className="bg-card/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Writing Tone</Label>
                  <Select
                    value={settings.tone}
                    onValueChange={(value) => setSettings({ ...settings, tone: value })}
                  >
                    <SelectTrigger className="bg-card/30">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Input
                    placeholder="Who is this article for?"
                    value={settings.targetAudience}
                    onChange={(e) => setSettings({ ...settings, targetAudience: e.target.value })}
                    className="bg-card/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Article Length</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {['very-short', 'short', 'medium', 'long', 'extra-long'].map((size) => (
                      <Button
                        key={size}
                        variant={settings.length === size ? "default" : "outline"}
                        className="w-full capitalize"
                        onClick={() => setSettings({ ...settings, length: size as ArticleSettings['length'] })}
                      >
                        {size.replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Creativity Level</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {[
                      'conservative',
                      'balanced',
                      'neutral',
                      'creative',
                      'highly-creative'
                    ].map((level) => (
                      <Button
                        key={level}
                        variant={settings.creativity === level ? "default" : "outline"}
                        className="w-full capitalize"
                        onClick={() => setSettings({ ...settings, creativity: level as ArticleSettings['creativity'] })}
                      >
                        {level.replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full"
                disabled={!settings.topic || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Article
                  </>
                )}
              </Button>
            </div>

            {/* Generated Content */}
            <div className="space-y-4">
              <div className="p-6 rounded-lg border bg-card/30 min-h-[600px]">
                {generatedContent ? (
                  <div className="prose prose-sm">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-primary/60">
                    <p>Your generated article will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}