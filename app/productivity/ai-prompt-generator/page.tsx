"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Copy, ThumbsUp, ThumbsDown, RefreshCw, Sparkles, Brain } from "lucide-react";
import { motion } from "framer-motion";

interface Prompt {
  text: string;
  category: string;
  likes: number;
  copied: boolean;
  tone?: string;
  complexity?: 'basic' | 'intermediate' | 'advanced';
}

export default function AIPromptGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [complexity, setComplexity] = useState<'basic' | 'intermediate' | 'advanced'>('intermediate');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulated API call
    setTimeout(() => {
      const newPrompts: Prompt[] = [
        {
          text: `Create a comprehensive ${complexity} guide about ${topic} using a ${tone} tone. Include practical examples and actionable insights.`,
          category: 'Educational',
          likes: 0,
          copied: false,
          tone,
          complexity
        },
        {
          text: `Develop a detailed ${complexity} analysis of ${topic} that explores key concepts and current trends, maintaining a ${tone} voice throughout.`,
          category: 'Analytical',
          likes: 0,
          copied: false,
          tone,
          complexity
        },
        {
          text: `Write an engaging ${complexity} piece about ${topic} that combines ${tone} expertise with clear explanations suitable for the target audience.`,
          category: 'Engaging',
          likes: 0,
          copied: false,
          tone,
          complexity
        }
      ];
      
      setPrompts(prev => [...newPrompts, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = (index: number) => {
    const prompt = prompts[index];
    navigator.clipboard.writeText(prompt.text);
    setPrompts(prev => prev.map((p, i) => 
      i === index ? { ...p, copied: true } : p
    ));
    setTimeout(() => {
      setPrompts(prev => prev.map((p, i) =>
        i === index ? { ...p, copied: false } : p
      ));
    }, 2000);
  };

  const handleLike = (index: number, increment: boolean) => {
    setPrompts(prev => prev.map((p, i) =>
      i === index ? { ...p, likes: p.likes + (increment ? 1 : -1) } : p
    ));
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
                AI Prompt Generator
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Create powerful AI prompts tailored to your needs
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                placeholder="Enter your topic or subject..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-card/30"
              />
              
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-card/30">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                </SelectContent>
              </Select>

              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger className="bg-card/30">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Add any additional context or requirements..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="h-[144px] bg-card/30"
              />
              
              <Button
                onClick={handleGenerate}
                className="w-full"
                disabled={!topic.trim() || isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Prompts'}
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {prompts.map((prompt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-lg border bg-card/30 hover:bg-card/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                          {prompt.category}
                        </span>
                        {prompt.tone && (
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                            {prompt.tone}
                          </span>
                        )}
                        {prompt.complexity && (
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                            {prompt.complexity}
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-xs text-primary/60">
                          <span>{prompt.likes} likes</span>
                        </div>
                      </div>
                      <p className="text-sm">{prompt.text}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopy(i)}
                      >
                        <Copy className={`w-4 h-4 ${prompt.copied ? 'text-green-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleLike(i, true)}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleLike(i, false)}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {prompts.length === 0 && (
                <div className="text-center py-12 text-primary/60">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No prompts generated yet</p>
                  <p className="text-sm">Enter a topic and click "Generate Prompts"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}