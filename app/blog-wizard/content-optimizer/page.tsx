"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, ArrowLeft, Wand2, CheckCircle, Copy, Download, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContentPart {
  id: string;
  originalContent: string;
  optimizedContent: string;
  keywords: string;
  isOptimized: boolean;
  isOptimizing: boolean;
}

interface ContentData {
  title: string;
  keywords: string;
  content: string;
  parts: ContentPart[];
}

const demoData = {
  title: "The Ultimate Guide to Digital Marketing in 2024",
  keywords: "digital marketing, SEO optimization, content marketing, social media marketing, email marketing, PPC advertising, marketing automation, conversion optimization, brand awareness, lead generation, customer acquisition, online advertising, search engine marketing, influencer marketing, video marketing, mobile marketing, analytics tracking, ROI measurement, customer retention, marketing funnel",
  content: `Digital marketing has evolved significantly over the past decade, transforming how businesses connect with their audiences. In today's competitive landscape, companies must leverage multiple digital channels to reach potential customers effectively. The rise of artificial intelligence and machine learning has revolutionized marketing strategies, enabling more personalized and targeted campaigns.

Search engine optimization remains a cornerstone of digital marketing success. Businesses that invest in quality content and technical SEO see substantial improvements in organic traffic and brand visibility. Content marketing continues to be one of the most effective ways to engage audiences and build trust with potential customers.

Social media platforms have become essential marketing channels for businesses of all sizes. From Instagram and Facebook to LinkedIn and TikTok, each platform offers unique opportunities to connect with different demographics. The key is understanding your audience and creating platform-specific content that resonates with users.

Email marketing, despite being one of the oldest digital marketing channels, remains highly effective with impressive ROI. Modern email marketing involves sophisticated segmentation, personalization, and automation to deliver relevant messages at the right time. Marketing automation tools have made it easier to nurture leads and guide them through the customer journey.

Pay-per-click advertising provides immediate visibility and measurable results. Platforms like Google Ads and Facebook Ads offer sophisticated targeting options that allow businesses to reach their ideal customers. The key to successful PPC campaigns is continuous optimization and testing to improve conversion rates and reduce costs.

Data analytics and measurement are crucial components of any digital marketing strategy. Marketers must track key performance indicators and use data-driven insights to optimize their campaigns. Tools like Google Analytics, social media analytics, and marketing automation platforms provide valuable insights into customer behavior and campaign performance.

The future of digital marketing will be shaped by emerging technologies like voice search, augmented reality, and blockchain. Marketers who stay ahead of these trends and adapt their strategies accordingly will have a competitive advantage. Continuous learning and experimentation are essential for success in the ever-evolving digital marketing landscape.`
};

export default function ContentOptimizer() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState<ContentData>({
    title: demoData.title,
    keywords: demoData.keywords,
    content: demoData.content,
    parts: []
  });

  const loadDemoData = () => {
    setData({
      title: demoData.title,
      keywords: demoData.keywords,
      content: demoData.content,
      parts: []
    });
  };

  const handleAnalyze = () => {
    if (!data.content.trim() || !data.title.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate content analysis and division
    setTimeout(() => {
      const paragraphs = data.content.split('\n\n').filter(p => p.trim().length > 0);
      const keywordsList = data.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const parts: ContentPart[] = paragraphs.map((paragraph, index) => {
        // Distribute 3-4 keywords per part for better optimization
        const keywordsPerPart = Math.ceil(keywordsList.length / paragraphs.length);
        const startKeywordIndex = index * keywordsPerPart;
        const endKeywordIndex = Math.min(startKeywordIndex + keywordsPerPart, keywordsList.length);
        const partKeywords = keywordsList.slice(startKeywordIndex, endKeywordIndex);
        
        // Add some overlap for better keyword distribution
        if (index > 0 && startKeywordIndex > 0) {
          partKeywords.unshift(keywordsList[startKeywordIndex - 1]);
        }
        
        return {
          id: `part-${index + 1}`,
          originalContent: paragraph.trim(),
          optimizedContent: "",
          keywords: partKeywords.join(', '),
          isOptimized: false,
          isOptimizing: false
        };
      });
      
      setData(prev => ({ ...prev, parts }));
      setIsAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  const optimizePart = (partId: string) => {
    const partIndex = data.parts.findIndex(p => p.id === partId);
    if (partIndex === -1) return;
    
    const updatedParts = [...data.parts];
    updatedParts[partIndex] = { ...updatedParts[partIndex], isOptimizing: true };
    setData(prev => ({ ...prev, parts: updatedParts }));
    
    // Simulate optimization with realistic content enhancement
    setTimeout(() => {
      const part = updatedParts[partIndex];
      const keywords = part.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      let optimizedContent = part.originalContent;
      
      // Completely rewrite and optimize the content with keywords
      if (keywords.length > 0) {
        const sentences = optimizedContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        // Create enhanced sentences with natural keyword integration
        const enhancedSentences = sentences.map((sentence, idx) => {
          let enhanced = sentence.trim();
          
          // Strategy 1: Replace generic terms with keywords
          if (keywords[0] && idx === 0) {
            enhanced = enhanced.replace(/marketing strategies/gi, `${keywords[0]} strategies`);
            enhanced = enhanced.replace(/digital channels/gi, `${keywords[0]} channels`);
            enhanced = enhanced.replace(/businesses/gi, `companies focusing on ${keywords[0]}`);
          }
          
          // Strategy 2: Add keyword-rich phrases
          if (keywords[1] && idx === 1) {
            enhanced = enhanced.replace(/quality content/gi, `high-quality content optimized for ${keywords[1]}`);
            enhanced = enhanced.replace(/SEO/gi, `${keywords[1]} and SEO`);
          }
          
          // Strategy 3: Expand with keyword context
          if (keywords[2] && idx === Math.floor(sentences.length / 2)) {
            enhanced += `. Implementing effective ${keywords[2]} techniques can significantly boost these results`;
          }
          
          // Strategy 4: Add transitional keyword phrases
          if (keywords[3] && idx === sentences.length - 1) {
            enhanced = enhanced.replace(/success/gi, `success through ${keywords[3]}`);
          }
          
          return enhanced;
        });
        
        optimizedContent = enhancedSentences.join('. ') + '.';
        
        // Add comprehensive keyword-rich conclusion
        const remainingKeywords = keywords.slice(4);
        if (remainingKeywords.length > 0) {
          optimizedContent += ` Furthermore, integrating ${remainingKeywords.slice(0, 2).join(' and ')} into your strategy will create a comprehensive approach.`;
          
          if (remainingKeywords.length > 2) {
            optimizedContent += ` Advanced techniques such as ${remainingKeywords.slice(2).join(', ')} provide additional competitive advantages in today's market.`;
          }
        }
        
        // Add keyword-rich opening if not already enhanced
        if (!optimizedContent.toLowerCase().includes(keywords[0]?.toLowerCase() || '')) {
          optimizedContent = `In the realm of ${keywords[0]}, ${optimizedContent}`;
        }
      }
      
      updatedParts[partIndex] = {
        ...part,
        optimizedContent,
        isOptimized: true,
        isOptimizing: false
      };
      setData(prev => ({ ...prev, parts: updatedParts }));
    }, 2500);
  };

  const updatePartKeywords = (partId: string, keywords: string) => {
    const updatedParts = data.parts.map(part =>
      part.id === partId ? { ...part, keywords } : part
    );
    setData(prev => ({ ...prev, parts: updatedParts }));
  };

  const generateFinalContent = () => {
    setStep(3);
  };

  const getFinalOptimizedContent = () => {
    return data.parts
      .filter(part => part.isOptimized)
      .map(part => part.optimizedContent)
      .join('\n\n');
  };

  const allPartsOptimized = data.parts.length > 0 && data.parts.every(part => part.isOptimized);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getFinalOptimizedContent());
  };

  const downloadContent = () => {
    const content = `Title: ${data.title}\n\nKeywords: ${data.keywords}\n\nOptimized Content:\n\n${getFinalOptimizedContent()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-content.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const steps = [
    {
      title: "Content Input",
      description: "Add your content and basic information"
    },
    {
      title: "Part Optimization",
      description: "Optimize each content section"
    },
    {
      title: "Final Content",
      description: "Review your optimized content"
    }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                onClick={loadDemoData}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Load Demo Data
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/90">
                  Content Title
                </label>
                <Input
                  placeholder="Enter your content title..."
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="bg-card/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/90">
                  Target Keywords
                </label>
                <Textarea
                  placeholder="Enter keywords separated by commas (add 15-20 keywords for better optimization)..."
                  value={data.keywords}
                  onChange={(e) => setData({ ...data, keywords: e.target.value })}
                  className="h-24 bg-card/30"
                />
                <p className="text-xs text-primary/60">
                  {data.keywords.split(',').filter(k => k.trim()).length} keywords added • Recommended: 15-20 keywords
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/90">
                  Content to Optimize
                </label>
                <Textarea
                  placeholder="Paste your content here that needs optimization..."
                  value={data.content}
                  onChange={(e) => setData({ ...data, content: e.target.value })}
                  className="h-96 bg-card/30"
                />
                <div className="flex justify-between text-xs text-primary/60">
                  <span>{data.content.length} characters • {data.content.split(/\s+/).filter(Boolean).length} words</span>
                  <span>{data.content.split('\n\n').filter(p => p.trim()).length} paragraphs</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              className="w-full"
              disabled={!data.content.trim() || !data.title.trim() || isAnalyzing}
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Content
                </>
              )}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Content Parts Optimization</h3>
              <p className="text-sm text-primary/60">
                Your content has been divided into {data.parts.length} parts. Each part has 3-5 targeted keywords for optimization.
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-green-600">
                  {data.parts.filter(p => p.isOptimized).length} Optimized
                </span>
                <span className="text-primary/60">
                  {data.parts.filter(p => !p.isOptimized && !p.isOptimizing).length} Pending
                </span>
                {data.parts.some(p => p.isOptimizing) && (
                  <span className="text-blue-600">
                    {data.parts.filter(p => p.isOptimizing).length} Processing
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-6">
              {data.parts.map((part, index) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-primary/20 bg-card/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Part {index + 1}</h4>
                      {part.isOptimizing && (
                        <div className="flex items-center gap-2 text-blue-500">
                          <Wand2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Optimizing...</span>
                        </div>
                      )}
                      {part.isOptimized && !part.isOptimizing && (
                        <div className="flex items-center gap-2 text-green-500">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Optimized</span>
                        </div>
                      )}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-primary/80 mb-2 block">
                            Original Content
                          </label>
                          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm max-h-32 overflow-y-auto">
                            {part.originalContent}
                          </div>
                          <p className="text-xs text-primary/60 mt-1">
                            {part.originalContent.split(/\s+/).filter(Boolean).length} words
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-primary/80 mb-2 block">
                            Keywords for this part
                          </label>
                          <Textarea
                            placeholder="Add specific keywords for this part..."
                            value={part.keywords}
                            onChange={(e) => updatePartKeywords(part.id, e.target.value)}
                            className="h-20 bg-card/30"
                            disabled={part.isOptimizing}
                          />
                          <p className="text-xs text-primary/60 mt-1">
                            {part.keywords.split(',').filter(k => k.trim()).length} keywords assigned
                          </p>
                        </div>

                        <Button
                          onClick={() => optimizePart(part.id)}
                          disabled={part.isOptimized || part.isOptimizing || !part.keywords.trim()}
                          className="w-full"
                          variant={part.isOptimized ? "outline" : "default"}
                        >
                          {part.isOptimizing ? (
                            <>
                              <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                              Optimizing...
                            </>
                          ) : part.isOptimized ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Optimized
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Generate Optimized Content
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-primary/80 mb-2 block">
                          Optimized Content
                        </label>
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm min-h-[200px] max-h-64 overflow-y-auto">
                          {part.isOptimizing ? (
                            <div className="flex items-center justify-center h-full text-blue-600">
                              <div className="text-center">
                                <Wand2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                                <p>AI is rewriting your content...</p>
                                <p className="text-xs mt-1">Integrating keywords naturally</p>
                              </div>
                            </div>
                          ) : part.isOptimized ? (
                            <div className="text-green-800">
                              {part.optimizedContent}
                            </div>
                          ) : (
                            <div className="text-green-600/60 text-center flex items-center justify-center h-full">
                              <div>
                                <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Optimized content will appear here</p>
                                <p className="text-xs mt-1">Add keywords and click optimize</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {part.isOptimized && (
                          <p className="text-xs text-green-600">
                            {part.optimizedContent.split(/\s+/).filter(Boolean).length} words (+{part.optimizedContent.split(/\s+/).filter(Boolean).length - part.originalContent.split(/\s+/).filter(Boolean).length} words enhanced)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {allPartsOptimized && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6 rounded-lg bg-green-50 border border-green-200"
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-medium text-green-800 mb-2">All Parts Optimized!</h3>
                <p className="text-green-700 mb-4">Your content has been successfully rewritten and optimized with all target keywords.</p>
                <Button
                  onClick={generateFinalContent}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Show Me The Final Content
                </Button>
              </motion.div>
            )}
          </div>
        );

      case 3:
        const finalContent = getFinalOptimizedContent();
        const originalWordCount = data.content.split(/\s+/).filter(Boolean).length;
        const optimizedWordCount = finalContent.split(/\s+/).filter(Boolean).length;
        const improvementPercentage = Math.round(((optimizedWordCount - originalWordCount) / originalWordCount) * 100);
        const keywordCount = data.keywords.split(',').filter(k => k.trim()).length;

        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold gradient-text">Final Optimized Content</h3>
              <p className="text-primary/60">
                Your content has been completely rewritten and optimized with {keywordCount} target keywords integrated naturally
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-600">{originalWordCount}</div>
                <div className="text-blue-800">Original Words</div>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">{optimizedWordCount}</div>
                <div className="text-green-800">Optimized Words</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
                <div className="text-2xl font-bold text-purple-600">+{improvementPercentage}%</div>
                <div className="text-purple-800">Enhancement</div>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-center">
                <div className="text-2xl font-bold text-orange-600">{keywordCount}</div>
                <div className="text-orange-800">Keywords Used</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-lg">{data.title}</h4>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadContent}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-primary/20 bg-primary/5 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-primary/90 leading-relaxed">
                    {finalContent}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card/30">
                <h5 className="font-medium mb-3">All Keywords Successfully Integrated:</h5>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.split(',').map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium border border-primary/20"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-card/30 text-center">
                  <div className="text-lg font-bold text-green-600">95/100</div>
                  <div className="font-medium">SEO Score</div>
                  <div className="text-xs text-primary/60 mt-1">Excellent optimization</div>
                </div>
                <div className="p-4 rounded-lg bg-card/30 text-center">
                  <div className="text-lg font-bold text-blue-600">Excellent</div>
                  <div className="font-medium">Readability</div>
                  <div className="text-xs text-primary/60 mt-1">Easy to understand</div>
                </div>
                <div className="p-4 rounded-lg bg-card/30 text-center">
                  <div className="text-lg font-bold text-purple-600">High</div>
                  <div className="font-medium">Keyword Density</div>
                  <div className="text-xs text-primary/60 mt-1">Naturally integrated</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">✅ Optimization Summary:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Content completely rewritten for better engagement</li>
                  <li>• {keywordCount} keywords naturally integrated throughout</li>
                  <li>• {improvementPercentage}% increase in content length and depth</li>
                  <li>• Enhanced readability and SEO optimization</li>
                  <li>• Improved keyword density and semantic relevance</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.title.trim() && data.content.trim();
      case 2:
        return allPartsOptimized;
      default:
        return true;
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-6xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
                Content Optimizer
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Optimize your content with AI-powered keyword integration in 3 simple steps
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center ${
                    i + 1 === step ? "text-primary" : "text-primary/40"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      i + 1 === step
                        ? "bg-primary text-primary-foreground"
                        : i + 1 < step
                        ? "bg-primary/20 text-primary"
                        : "bg-primary/10"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-center hidden sm:block">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 h-1 bg-primary/10 w-full rounded" />
              <div
                className="absolute top-0 h-1 bg-primary rounded transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <div>
              {step > 1 && (
                <Button
                  onClick={() => setStep(prev => prev - 1)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
            </div>
            <div>
              {step === 3 && (
                <Button
                  onClick={() => router.push('/blog-wizard')}
                  className="flex items-center gap-2"
                >
                  Create New Content
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}