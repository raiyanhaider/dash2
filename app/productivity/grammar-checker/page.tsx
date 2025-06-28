"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface Suggestion {
  type: 'error' | 'improvement';
  text: string;
  suggestion: string;
}

export default function GrammarChecker() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = () => {
    setIsChecking(true);
    // Simulated API call
    setTimeout(() => {
      setSuggestions([
        {
          type: 'error',
          text: 'their',
          suggestion: 'they\'re'
        },
        {
          type: 'improvement',
          text: 'good',
          suggestion: 'excellent'
        }
      ]);
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Perfect My Writing</CardTitle>
              <CardDescription>Advanced grammar and style checker</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px] bg-card/30"
              />
              <Button 
                onClick={handleCheck} 
                className="w-full"
                disabled={!text.trim() || isChecking}
              >
                {isChecking ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                {isChecking ? 'Checking...' : 'Check Writing'}
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-card/30">
              <h3 className="font-medium mb-4">Suggestions</h3>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${
                        suggestion.type === 'error' 
                          ? 'border-destructive/30 bg-destructive/5'
                          : 'border-primary/30 bg-primary/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {suggestion.type === 'error' ? (
                          <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            Replace "{suggestion.text}" with "{suggestion.suggestion}"
                          </p>
                          <p className="text-xs mt-1 text-primary/60">
                            {suggestion.type === 'error' ? 'Grammar Error' : 'Style Improvement'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {suggestions.length === 0 && (
                    <div className="text-center py-8 text-primary/60">
                      <p>No suggestions yet</p>
                      <p className="text-sm">Enter some text and click "Check Writing"</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}