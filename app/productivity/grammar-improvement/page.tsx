"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, AlertCircle, RefreshCw, Copy, History, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Suggestion {
  type: 'error' | 'improvement' | 'style';
  text: string;
  suggestion: string;
  explanation: string;
  category: string;
}

interface TextStats {
  words: number;
  characters: number;
  sentences: number;
  readability: number;
}

export default function GrammarImprovement() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [stats, setStats] = useState<TextStats | null>(null);

  const handleCheck = () => {
    setIsChecking(true);
    // Simulated API call
    setTimeout(() => {
      setSuggestions([
        {
          type: 'error',
          text: 'their',
          suggestion: 'they\'re',
          explanation: 'Use "they\'re" (they are) instead of "their" (possessive) in this context.',
          category: 'Grammar'
        },
        {
          type: 'improvement',
          text: 'good',
          suggestion: 'excellent',
          explanation: 'Consider using a more impactful adjective to strengthen your message.',
          category: 'Vocabulary'
        },
        {
          type: 'style',
          text: 'very important',
          suggestion: 'crucial',
          explanation: 'Replace wordy phrases with concise alternatives.',
          category: 'Style'
        }
      ]);
      setStats({
        words: text.split(/\s+/).filter(Boolean).length,
        characters: text.length,
        sentences: text.split(/[.!?]+/).filter(Boolean).length,
        readability: 85
      });
      setIsChecking(false);
      if (text.trim()) {
        setHistory(prev => [text, ...prev].slice(0, 5));
      }
    }, 1500);
  };

  const applySuggestion = (suggestion: Suggestion) => {
    const newText = text.replace(suggestion.text, suggestion.suggestion);
    setText(newText);
  };

  const restoreVersion = (version: string) => {
    setText(version);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-5xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Grammar Improvement</CardTitle>
              <CardDescription>Advanced writing enhancement with AI-powered suggestions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] bg-card/30 pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-50 hover:opacity-100"
                  onClick={() => navigator.clipboard.writeText(text)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={handleCheck} 
                  className="flex-1"
                  disabled={!text.trim() || isChecking}
                >
                  {isChecking ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  {isChecking ? 'Analyzing...' : 'Improve Writing'}
                </Button>
                
                {history.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setHistory([])}
                    className="gap-2"
                  >
                    <History className="w-4 h-4" />
                    Clear History
                  </Button>
                )}
              </div>

              {stats && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { label: 'Words', value: stats.words },
                    { label: 'Characters', value: stats.characters },
                    { label: 'Sentences', value: stats.sentences },
                    { label: 'Readability', value: `${stats.readability}%` }
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <p className="text-sm text-primary/60">{stat.label}</p>
                      <p className="text-lg font-medium">{stat.value}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-4 bg-card/30">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Suggestions
                </h3>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {suggestions.map((suggestion, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          suggestion.type === 'error' 
                            ? 'border-destructive/30 bg-destructive/5'
                            : suggestion.type === 'style'
                            ? 'border-blue-500/30 bg-blue-500/5'
                            : 'border-primary/30 bg-primary/5'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {suggestion.type === 'error' ? (
                            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                          ) : suggestion.type === 'style' ? (
                            <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          )}
                          <div className="flex-1 space-y-2">
                            <div>
                              <p className="text-sm font-medium">
                                Replace "{suggestion.text}" with "{suggestion.suggestion}"
                              </p>
                              <p className="text-xs mt-1 text-primary/60">
                                {suggestion.category}
                              </p>
                            </div>
                            <p className="text-xs text-primary/80 bg-primary/5 p-2 rounded">
                              {suggestion.explanation}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => applySuggestion(suggestion)}
                            >
                              Apply Change
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {suggestions.length === 0 && (
                      <div className="text-center py-8 text-primary/60">
                        <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No suggestions yet</p>
                        <p className="text-sm">Enter some text and click "Improve Writing"</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {history.length > 0 && (
                <div className="border rounded-lg p-4 bg-card/30">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Recent Versions
                  </h3>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-3">
                      {history.map((version, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-primary/10 bg-primary/5"
                        >
                          <p className="text-sm truncate mb-2">{version}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => restoreVersion(version)}
                          >
                            Restore Version
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}