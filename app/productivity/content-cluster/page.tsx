"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Plus, RefreshCw, Link, Target, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ContentCluster {
  pillarTopic: string;
  pillarKeyword: string;
  supportingTopics: Array<{
    title: string;
    keywords: string[];
    contentType: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    searchVolume: string;
    intent: 'Informational' | 'Commercial' | 'Transactional';
  }>;
  internalLinking: Array<{
    from: string;
    to: string;
    anchorText: string;
  }>;
}

export default function ContentClusterBuilder() {
  const [pillarTopic, setPillarTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cluster, setCluster] = useState<ContentCluster | null>(null);

  const handleGenerate = () => {
    if (!pillarTopic.trim()) return;
    
    setIsGenerating(true);
    // Simulated cluster generation
    setTimeout(() => {
      setCluster({
        pillarTopic: pillarTopic,
        pillarKeyword: pillarTopic.toLowerCase(),
        supportingTopics: [
          {
            title: `What is ${pillarTopic}? A Complete Guide`,
            keywords: [`${pillarTopic} definition`, `${pillarTopic} basics`, `${pillarTopic} guide`],
            contentType: 'Blog Post',
            difficulty: 'Easy',
            searchVolume: '2.4K',
            intent: 'Informational'
          },
          {
            title: `${pillarTopic} Best Practices for 2024`,
            keywords: [`${pillarTopic} best practices`, `${pillarTopic} tips`, `${pillarTopic} strategies`],
            contentType: 'Blog Post',
            difficulty: 'Medium',
            searchVolume: '1.8K',
            intent: 'Informational'
          },
          {
            title: `Top ${pillarTopic} Tools and Software`,
            keywords: [`${pillarTopic} tools`, `${pillarTopic} software`, `best ${pillarTopic} tools`],
            contentType: 'Comparison',
            difficulty: 'Medium',
            searchVolume: '3.2K',
            intent: 'Commercial'
          },
          {
            title: `${pillarTopic} Case Studies and Examples`,
            keywords: [`${pillarTopic} examples`, `${pillarTopic} case studies`, `${pillarTopic} success stories`],
            contentType: 'Case Study',
            difficulty: 'Hard',
            searchVolume: '1.1K',
            intent: 'Informational'
          },
          {
            title: `How to Get Started with ${pillarTopic}`,
            keywords: [`${pillarTopic} tutorial`, `${pillarTopic} for beginners`, `learn ${pillarTopic}`],
            contentType: 'Tutorial',
            difficulty: 'Easy',
            searchVolume: '2.8K',
            intent: 'Informational'
          },
          {
            title: `${pillarTopic} vs Alternatives Comparison`,
            keywords: [`${pillarTopic} vs`, `${pillarTopic} alternatives`, `${pillarTopic} comparison`],
            contentType: 'Comparison',
            difficulty: 'Medium',
            searchVolume: '1.5K',
            intent: 'Commercial'
          }
        ],
        internalLinking: [
          {
            from: `What is ${pillarTopic}? A Complete Guide`,
            to: pillarTopic,
            anchorText: `comprehensive ${pillarTopic} guide`
          },
          {
            from: `${pillarTopic} Best Practices for 2024`,
            to: pillarTopic,
            anchorText: `${pillarTopic} strategies`
          },
          {
            from: `Top ${pillarTopic} Tools and Software`,
            to: pillarTopic,
            anchorText: `${pillarTopic} implementation`
          }
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-500';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'Hard': return 'bg-red-500/10 text-red-500';
      default: return 'bg-primary/10 text-primary';
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'Informational': return 'bg-blue-500/10 text-blue-500';
      case 'Commercial': return 'bg-purple-500/10 text-purple-500';
      case 'Transactional': return 'bg-green-500/10 text-green-500';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-6xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Network className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
                Content Cluster Builder
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Create comprehensive topic clusters for better SEO and content strategy
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pillar Topic</label>
                <Input
                  placeholder="e.g., Content Marketing"
                  value={pillarTopic}
                  onChange={(e) => setPillarTopic(e.target.value)}
                  className="bg-card/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="bg-card/30">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Input
                  placeholder="e.g., Small business owners"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="bg-card/30"
                />
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full"
                disabled={!pillarTopic.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Cluster
                  </>
                )}
              </Button>
            </div>

            <div className="lg:col-span-2">
              {cluster ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Pillar Content */}
                  <div className="p-6 rounded-lg border-2 border-primary/30 bg-primary/5">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold">Pillar Content</h3>
                    </div>
                    <h4 className="text-lg font-medium mb-2">{cluster.pillarTopic}</h4>
                    <p className="text-sm text-primary/60">
                      Main keyword: <span className="font-medium">{cluster.pillarKeyword}</span>
                    </p>
                  </div>

                  {/* Supporting Content */}
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Supporting Content ({cluster.supportingTopics.length})
                    </h3>
                    <ScrollArea className="h-96">
                      <div className="grid gap-4">
                        {cluster.supportingTopics.map((topic, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-lg border bg-card/30 hover:bg-card/40 transition-all"
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-sm">{topic.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {topic.contentType}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {topic.keywords.slice(0, 3).map((keyword, j) => (
                                  <Badge key={j} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <Badge className={getDifficultyColor(topic.difficulty)}>
                                    {topic.difficulty}
                                  </Badge>
                                  <Badge className={getIntentColor(topic.intent)}>
                                    {topic.intent}
                                  </Badge>
                                </div>
                                <span className="text-primary/60">
                                  {topic.searchVolume} searches/month
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Internal Linking Strategy */}
                  <div className="p-6 rounded-lg border bg-card/30">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Link className="w-5 h-5" />
                      Internal Linking Strategy
                    </h3>
                    <div className="space-y-3">
                      {cluster.internalLinking.map((link, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <span className="flex-1 truncate">{link.from}</span>
                          <ArrowRight className="w-4 h-4 text-primary/60" />
                          <span className="flex-1 truncate font-medium">{link.to}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 text-primary/60">
                  <Network className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a pillar topic to generate your content cluster</p>
                  <p className="text-sm">Build a comprehensive content strategy around your main topic</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}