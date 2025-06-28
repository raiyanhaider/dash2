"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wand2,
  Bot,
  MessageSquare,
  Rocket,
  FileEdit,
  Mail,
  Sparkles,
  Zap,
  TrendingUp,
  Gift,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Counter } from "@/components/ui/counter-animation";
import { FeatureButton } from "@/components/ui/feature-button";

export default function Home() {
  const [userName, setUserName] = useState("User");

  // Simulated user data - replace with real data fetching
  useEffect(() => {
    setUserName("John");
  }, []);

  return (
    <div className="container mx-auto space-y-12 pb-8 relative">
      <div className="absolute inset-0 bg-grid-white/10 pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 blur-3xl" />

      {/* Header Section */}
      <div className="glass-card p-8 mt-8">
        <div className="absolute inset-0 bg-grid-white/10 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="relative">
          <h1 className="gradient-text text-4xl font-bold sm:text-6xl md:text-7xl tracking-tight animate-[float_6s_ease-in-out_infinite]">
            Welcome back, {userName}!
          </h1>
          
          {/* Stats Overview */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { label: "Content Generated", value: 50 },
              { label: "Words Written", value: 10000 },
              { label: "Monthly Words Remaining", value: "Unlimited", isInfinite: true },
            ].map((stat, i) => (
              <div
                key={i}
                className="group glass-card p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/40"
              >
                <div className="glass-effect" />
                <p className="text-sm font-medium text-primary/80">{stat.label}</p>
                <p className="mt-2 text-4xl font-bold gradient-text">
                  {stat.isInfinite ? stat.value : <Counter end={stat.value} />}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Buttons Grid */}
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-accent/5 to-primary/10 rounded-3xl blur-3xl" />
        <FeatureButton
          title="Guided Content Creation"
          description="Step-by-step wizard for creating high-quality content"
          href="/blog-wizard/guided"
          icon={<Wand2 className="h-5 w-5 text-primary" />}
        />
        <FeatureButton
          title="One Click Content"
          description="Instantly generate full blog posts with a single click"
          href="/blog-wizard/one-click"
          icon={<Zap className="h-5 w-5 text-primary" />}
        />
        <FeatureButton
          title="AI Assistant"
          description="Powerful AI tools for content creation"
          href="/ai-assistant"
          icon={<Bot className="h-5 w-5 text-primary" />}
        />
        <FeatureButton
          title="AI Chat"
          description="Chat with AI experts like Content Writers, SEO Specialists, and Coders"
          href="/ai-chat"
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
        />
        <FeatureButton
          title="Productivity Tools"
          description="Access tools like Content Calendar Maker and Grammar Improvement"
          href="/productivity"
          icon={<Rocket className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Trending Tools */}
      <div className="relative">
        <div className="glass-card p-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold gradient-text">Trending Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "AI Writer",
                description: "Create engaging content instantly",
                href: "/tools/ai-writer",
                icon: <FileEdit className="h-6 w-6" />,
                category: "Writing"
              },
              {
                title: "SEO Helper",
                description: "Optimize your content for search",
                href: "/tools/seo",
                icon: <TrendingUp className="h-6 w-6" />,
                category: "SEO"
              },
              {
                title: "Grammar Fix",
                description: "Perfect your writing style",
                href: "/tools/grammar",
                icon: <Sparkles className="h-6 w-6" />,
                category: "Writing"
              },
              {
                title: "Email Pro",
                description: "Craft compelling emails",
                href: "/tools/email",
                icon: <Mail className="h-6 w-6" />,
                category: "Email"
              }
            ].map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className="group tool-card"
              >
                <div className="glass-effect" />
                <div className="tool-icon">
                  {tool.icon}
                </div>
                <span className="tool-title">{tool.title}</span>
                <p className="tool-description">{tool.description}</p>
                <div className="mt-4 px-3 py-1 rounded-full bg-primary/5 text-xs font-medium text-primary/60">
                  {tool.category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="glass-card p-8">
        <div className="absolute inset-0 bg-grid-white/10 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold gradient-text">Special Offer!</h2>
            <p className="mt-1 text-primary/80">
              Get 50% off on all premium features
            </p>
          </div>
          <Link
            href="/redeem"
            className="relative overflow-hidden rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all duration-500 hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 animate-[shimmer_2s_infinite]" />
            Redeem Now
          </Link>
        </div>
      </div>
    </div>
  );
}