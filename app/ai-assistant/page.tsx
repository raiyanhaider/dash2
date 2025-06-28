"use client";

import { FileEdit, Mail, Bot, MessageSquare, Rocket, Brain, Code, Palette, Music, TrendingUp, Search, Sparkles, X, CheckCircle, Wand2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const tools = [
  {
    category: "Writing",
    tools: [
      { title: "article-generator", description: "Generate full-length articles", icon: <FileEdit />, path: "/ai-assistant/article-generator" },
      { title: "keywords-finder", description: "Find related keywords and phrases", icon: <Search />, path: "/productivity/keywords-finder" },
      { title: "grammar-improvement", description: "Check grammar and improve writing", icon: <CheckCircle />, path: "/productivity/grammar-improvement" },
      { title: "ai-prompt-generator", description: "Generate AI writing prompts", icon: <Wand2 />, path: "/productivity/ai-prompt-generator" },
      { title: "content-rewriter", description: "Rewrite content in different styles", icon: <FileEdit /> },
    ]
  },
  {
    category: "Content Optimization",
    tools: [
      { title: "content-optimizer", description: "Optimize content with keyword integration", icon: <FileEdit />, path: "/blog-wizard/content-optimizer" },
    ]
  },
  {
    category: "Business",
    tools: [
      { title: "business-proposal", description: "Generate business proposals", icon: <Rocket /> },
      { title: "marketing-copy", description: "Write persuasive marketing content", icon: <TrendingUp /> },
      { title: "sales-copy", description: "Create converting sales copy", icon: <TrendingUp /> },
      { title: "press-release", description: "Write newsworthy press releases", icon: <FileEdit /> },
    ]
  },
  {
    category: "Creative",
    tools: [
      { title: "story-writer", description: "Create engaging stories", icon: <Bot /> },
      { title: "poetry-generator", description: "Generate beautiful poems", icon: <Music /> },
      { title: "script-writer", description: "Write scripts for videos", icon: <FileEdit /> },
      { title: "creative-writing", description: "Generate creative content", icon: <Palette /> },
      { title: "song-lyrics", description: "Write catchy song lyrics", icon: <Music /> },
    ]
  },
  {
    category: "Professional",
    tools: [
      { title: "resume-writer", description: "Create professional resumes", icon: <FileEdit /> },
      { title: "bio-writer", description: "Write compelling bios", icon: <FileEdit /> },
      { title: "cover-letter", description: "Generate tailored cover letters", icon: <FileEdit /> },
      { title: "linkedin-posts", description: "Create engaging LinkedIn content", icon: <MessageSquare /> },
      { title: "professional-bio", description: "Write professional biographies", icon: <FileEdit /> },
    ]
  },
  {
    category: "Technical",
    tools: [
      { title: "technical-writer", description: "Write technical documentation", icon: <Code /> },
      { title: "api-documentation", description: "Generate API docs", icon: <Code /> },
      { title: "code-documentation", description: "Document your code", icon: <Code /> },
      { title: "user-guide", description: "Create user guides", icon: <FileEdit /> },
      { title: "technical-blog", description: "Write technical blog posts", icon: <FileEdit /> },
    ]
  },
  {
    category: "SEO & Marketing",
    tools: [
      { title: "seo-content", description: "Write SEO-optimized content", icon: <TrendingUp /> },
      { title: "meta-descriptions", description: "Generate meta descriptions", icon: <TrendingUp /> },
      { title: "keywords-research", description: "Find relevant keywords", icon: <TrendingUp /> },
      { title: "ad-copy", description: "Write converting ad copy", icon: <TrendingUp /> },
      { title: "landing-page", description: "Create landing page copy", icon: <Rocket /> },
    ]
  }
];

export default function AIAssistant() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchFocused, setSearchFocused] = useState(false);

  const totalTools = tools.reduce((acc, category) => acc + category.tools.length, 0);
  const filteredTools = tools.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === "all" || 
    category.category.toLowerCase() === selectedCategory.toLowerCase()
  );
  
  const filteredToolsCount = filteredTools.reduce((acc, category) => acc + category.tools.length, 0);

  return (
    <div className="container mx-auto space-y-12 pb-8 relative">
      <div className="absolute inset-0 bg-grid-white/10 pointer-events-none opacity-50" />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.6, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 space-y-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="gradient-text text-4xl font-bold">AI Assistant Tools</h1>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-primary/80 text-lg max-w-2xl">
              Access {totalTools}+ AI-powered tools to enhance your content creation
            </p>
            <div className="text-sm text-primary/60">
              Showing {filteredToolsCount} of {totalTools} tools
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 relative">
          <motion.div 
            className="relative flex-1"
            animate={searchFocused ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              searchFocused ? 'text-primary' : 'text-primary/40'
            }`} />
            <motion.div whileTap={{ scale: 0.99 }}>
              <Input
                placeholder="Search tools..."
                className="pl-10 pr-10 bg-card/30 border-primary/20 transition-all duration-300 focus:bg-card/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/40 hover:text-primary transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 p-2 bg-card/95 backdrop-blur-sm rounded-lg border border-primary/20 shadow-lg z-10"
              >
                <div className="text-sm text-primary/60">
                  Press <kbd className="px-2 py-1 bg-primary/10 rounded text-xs">Enter</kbd> to search
                </div>
              </motion.div>
            )}
          </motion.div>
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/30 hover:bg-card/50 text-primary/80"
              }`}
            >
              All
            </motion.button>
            {tools.map((category, i) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={i}
                onClick={() => setSelectedCategory(category.category.toLowerCase())}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.category.toLowerCase()
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/30 hover:bg-card/50 text-primary/80"
                }`}
              >
                {category.category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <div className="space-y-12">
        {filteredTools.map((category, i) => (
          category.tools.length > 0 && (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold gradient-text mb-8">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {category.tools.map((tool, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i * 0.1) + (j * 0.05) }}
                >
                  <Link
                    href={tool.path || `/ai-assistant/${tool.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group tool-card"
                  > 
                    <div className="glass-effect" />
                    <div className="tool-icon">
                      {tool.icon}
                    </div>
                    <span className="tool-title">{tool.title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    <p className="tool-description">{tool.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )
        ))}
        {filteredTools.every(category => category.tools.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <div className="space-y-4">
              <Search className="w-12 h-12 text-primary/40 mx-auto" />
              <p className="text-primary/60 text-lg">No tools found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-sm text-primary hover:text-primary/80 underline transition-colors duration-200"
              >
                Clear search and show all tools
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}