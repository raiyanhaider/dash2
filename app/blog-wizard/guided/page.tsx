"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface ContentState {
  description: string;
  keywords: string;
  selectedTitle: string;
  selectedOutline: string;
  content: string;
}

const mockTitles = [
  "The Ultimate Guide to Effective Content Creation",
  "10 Proven Strategies for Engaging Content",
  "How to Create Content That Converts",
  "Content Creation: A Step-by-Step Guide",
  "Mastering the Art of Content Writing"
];

const mockOutlines = [
  `1. Introduction
   2. Understanding Your Audience
   3. Creating Engaging Content
   4. Optimizing for SEO
   5. Measuring Success`,
  `1. Content Strategy Basics
   2. Research and Planning
   3. Writing Techniques
   4. Content Distribution
   5. Analytics and Improvement`,
  `1. Content Goals
   2. Target Audience Analysis
   3. Content Structure
   4. Writing Process
   5. Review and Optimize`
];

export default function GuidedContentCreation() {
  const [step, setStep] = useState(1);
  const [content, setContent] = useState<ContentState>({
    description: "",
    keywords: "",
    selectedTitle: "",
    selectedOutline: "",
    content: ""
  });

  const steps = [
    {
      title: "Basic Info",
      description: "Start with a description and keywords"
    },
    {
      title: "Title Selection",
      description: "Choose the perfect title"
    },
    {
      title: "Content Outline",
      description: "Select the best structure"
    },
    {
      title: "Content Writing",
      description: "Create your content"
    },
    {
      title: "Final Content",
      description: "Review and finish"
    }
  ];

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 5));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Content Description
              </label>
              <Textarea
                placeholder="Describe what you want to write about..."
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                className="h-32"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Keywords
              </label>
              <Input
                placeholder="Enter keywords separated by commas..."
                value={content.keywords}
                onChange={(e) => setContent({ ...content, keywords: e.target.value })}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {mockTitles.map((title, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  content.selectedTitle === title
                    ? "border-primary bg-primary/5"
                    : "border-primary/20 hover:border-primary/40"
                }`}
                onClick={() => setContent({ ...content, selectedTitle: title })}
              >
                <p className="text-primary/90">{title}</p>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {mockOutlines.map((outline, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  content.selectedOutline === outline
                    ? "border-primary bg-primary/5"
                    : "border-primary/20 hover:border-primary/40"
                }`}
                onClick={() => setContent({ ...content, selectedOutline: outline })}
              >
                <pre className="whitespace-pre-wrap text-sm text-primary/90 font-mono">
                  {outline}
                </pre>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <Textarea
              placeholder="Start writing your content..."
              value={content.content}
              onChange={(e) => setContent({ ...content, content: e.target.value })}
              className="h-96"
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
              <h3 className="text-xl font-semibold mb-4">{content.selectedTitle}</h3>
              <div className="prose prose-sm">
                <pre className="whitespace-pre-wrap text-primary/90">
                  {content.content}
                </pre>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
              Step by Step Content Builder
            </CardTitle>
          </div>
          <CardDescription className="text-base sm:text-lg">
            Create amazing content in 5 simple steps
          </CardDescription>
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
                style={{ width: `${((step - 1) / 4) * 100}%` }}
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
          <div className="mt-8 flex justify-end">
            {step < 5 && (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
                size="lg"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}