"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle, AlertCircle, RefreshCw, Target, Eye, Link } from "lucide-react";
import { motion } from "framer-motion";

interface SEOAnalysis {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'success';
    category: string;
    message: string;
    suggestion: string;
  }>;
  keywords: Array<{
    keyword: string;
    density: number;
    recommended: number;
    status: 'good' | 'low' | 'high';
  }>;
  readability: {
    score: number;
    level: string;
    suggestions: string[];
  };
  meta: {
    title: string;
    description: string;
    titleScore: number;
    descriptionScore: number;
  };
}

export default function SEOOptimizer() {
  const [content, setContent] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  const handleAnalyze = () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    // Simulated analysis
    setTimeout(() => {
      setAnalysis({
        score: 78,
        issues: [
          {
            type: 'warning',
            category: 'Keywords',
            message: 'Primary keyword density is low',
            suggestion: 'Include your target keyword 2-3 more times naturally in the content'
          },
          {
            type: 'error',
            category: 'Meta Description',
            message: 'Meta description is too short',
            suggestion: 'Expand your meta description to 150-160 characters for better SERP visibility'
          },
          {
            type: 'success',
            category: 'Readability',
            message: 'Content readability is excellent',
            suggestion: 'Great job! Your content is easy to read and understand'
          },
          {
            type: 'warning',
            category: 'Internal Links',
            message: 'No internal links found',
            suggestion: 'Add 2-3 internal links to related content on your site'
          }
        ],
        keywords: [
          { keyword: 'content marketing', density: 1.2, recommended: 2.5, status: 'low' },
          { keyword: 'SEO optimization', density: 2.8, recommended: 2.5, status: 'good' },
          { keyword: 'digital marketing', density: 4.1, recommended: 2.5, status: 'high' }
        ],
        readability: {
          score: 85,
          level: 'Easy to read',
          suggestions: [
            'Use more transition words to improve flow',
            'Consider breaking up longer paragraphs'
          ]
        },
        meta: {
          title: metaTitle,
          description: metaDescription,
          titleScore: metaTitle.length >= 50 && metaTitle.length <= 60 ? 100 : 60,
          descriptionScore: metaDescription.length >= 150 && metaDescription.length <= 160 ? 100 : 40
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/10 text-green-500';
      case 'low': return 'bg-yellow-500/10 text-yellow-500';
      case 'high': return 'bg-red-500/10 text-red-500';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-6xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
                Content SEO Checker
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Analyze and optimize your content for better search engine rankings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Keywords</label>
                  <Input
                    placeholder="Enter target keywords separated by commas"
                    value={targetKeywords}
                    onChange={(e) => setTargetKeywords(e.target.value)}
                    className="bg-card/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Title</label>
                  <Input
                    placeholder="Enter your meta title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="bg-card/30"
                  />
                  <p className="text-xs text-primary/60">
                    {metaTitle.length}/60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Description</label>
                  <Textarea
                    placeholder="Enter your meta description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="h-20 bg-card/30"
                  />
                  <p className="text-xs text-primary/60">
                    {metaDescription.length}/160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Paste your content here for SEO analysis..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="h-64 bg-card/30"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  className="w-full"
                  disabled={!content.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Analyze SEO
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {analysis ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Overall Score */}
                  <div className="p-6 rounded-lg border bg-card/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">SEO Score</h3>
                      <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                        {analysis.score}/100
                      </span>
                    </div>
                    <Progress value={analysis.score} className="h-3" />
                  </div>

                  {/* Issues */}
                  <div className="p-6 rounded-lg border bg-card/30">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Issues & Suggestions
                    </h3>
                    <ScrollArea className="h-48">
                      <div className="space-y-3">
                        {analysis.issues.map((issue, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg border ${
                              issue.type === 'error' ? 'border-red-500/30 bg-red-500/5' :
                              issue.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/5' :
                              'border-green-500/30 bg-green-500/5'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {issue.type === 'error' ? (
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                              ) : issue.type === 'warning' ? (
                                <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {issue.category}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium mb-1">{issue.message}</p>
                                <p className="text-xs text-primary/60">{issue.suggestion}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Keyword Analysis */}
                  <div className="p-6 rounded-lg border bg-card/30">
                    <h3 className="text-lg font-medium mb-4">Keyword Density</h3>
                    <div className="space-y-3">
                      {analysis.keywords.map((keyword, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm">{keyword.keyword}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{keyword.density}%</span>
                            <Badge className={getStatusColor(keyword.status)}>
                              {keyword.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Readability */}
                  <div className="p-6 rounded-lg border bg-card/30">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Readability
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Score</span>
                        <span className={`font-medium ${getScoreColor(analysis.readability.score)}`}>
                          {analysis.readability.score}/100
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Level</span>
                        <Badge variant="outline">{analysis.readability.level}</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 text-primary/60">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your content and click "Analyze SEO"</p>
                  <p className="text-sm">Get detailed insights to improve your content's search ranking</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}