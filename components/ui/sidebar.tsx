"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  Gift,
  LifeBuoy,
  Package,
  LogOut,
  Home,
  Sparkles,
  Bot,
  Rocket,
  BookOpen,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ReactNode;
  items?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: <Home /> },
  {
    name: "AI Assistant",
    icon: <Bot />,
    items: [
      { name: "Tools Overview", href: "/ai-assistant", icon: <Sparkles /> },
      { name: "Article Generator", href: "/ai-assistant/article-generator", icon: <FileText /> },
      { name: "Blog Intro", href: "/ai-assistant/blog-intro", icon: <FileText /> }
    ]
  },
  {
    name: "AI Chat",
    icon: <MessageSquare />,
    items: [
      { name: "Content Writer", href: "/ai-chat/content-writer", icon: <FileText /> },
      { name: "SEO Expert", href: "/ai-chat/seo-expert", icon: <Rocket /> },
      { name: "Coder", href: "/ai-chat/coder", icon: <Bot /> },
      { name: "Custom AI Chatbot", href: "/ai-chat/custom-chatbot", icon: <Sparkles /> }
    ]
  },
  {
    name: "Blog Wizard",
    icon: <Sparkles />,
    items: [
      { name: "Content Builder", href: "/blog-wizard/guided", icon: <Sparkles /> },
      { name: "One Click", href: "/blog-wizard/one-click", icon: <Rocket /> },
      { name: "Product Comparison", href: "/blog-wizard/product-comparison", icon: <FileText /> },
      { name: "Content Optimizer", href: "/blog-wizard/content-optimizer", icon: <TrendingUp /> }
    ]
  },
  {
    name: "Productivity",
    icon: <Rocket />,
    items: [
      { name: "Grammar Improvement", href: "/productivity/grammar-improvement", icon: <FileText /> },
      { name: "Keywords Finder", href: "/productivity/keywords-finder", icon: <FileText /> },
      { name: "AI Prompt Generator", href: "/productivity/ai-prompt-generator", icon: <FileText /> },
      { name: "Content Calendar", href: "/productivity/content-calendar", icon: <FileText /> },
      { name: "Grammar Checker", href: "/productivity/grammar-checker", icon: <FileText /> },
      { name: "Trending Topics", href: "/productivity/trending-topics", icon: <FileText /> },
      { name: "Content SEO Checker", href: "/productivity/seo-optimizer", icon: <FileText /> },
      { name: "Content Cluster", href: "/productivity/content-cluster", icon: <FileText /> },
    ]
  },
  { name: "Tutorials", href: "/tutorials", icon: <BookOpen /> },
  { name: "Output", href: "/output", icon: <FileText /> },
  { name: "Packages", href: "/packages", icon: <Package /> },
  { name: "Gifts & Offers", href: "/gifts-and-offers", icon: <Gift /> },
  { name: "Support", href: "/support", icon: <LifeBuoy /> },
  { name: "Contact", href: "/contact", icon: <MessageSquare /> }
];

export function Sidebar() {
  const pathname = usePathname();
  const userName = "John"; // This would come from your auth system
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (name: string) => {
    setOpenSections(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href?: string) => href && pathname === href;
  const isSectionActive = (item: NavigationItem) => {
    if (item.href && isActive(item.href)) return true;
    if (item.items?.some(subItem => isActive(subItem.href))) return true;
    return false;
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 transform -translate-x-full sm:translate-x-0 transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full bg-card/30 backdrop-blur-xl border-r border-primary/10">
        {/* Logo and User Section */}
        <div className="p-6 border-b border-primary/10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Logo */}
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Atom Writer
              </h1>
            </div>

            {/* Greeting */}
            <div className="text-center space-y-1">
              <p className="text-sm text-primary/60">Welcome back,</p>
              <p className="font-medium gradient-text">{userName}</p>
            </div>

            {/* Package Info */}
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <p className="text-sm text-primary/60">Current Package</p>
              <p className="font-medium text-primary">Pro Plan</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.items ? (
                  <Collapsible
                    open={openSections.includes(item.name)}
                    onOpenChange={() => toggleSection(item.name)}
                  >
                    <CollapsibleTrigger className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors",
                      isSectionActive(item) ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                    )}>
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      {openSections.includes(item.name) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href || "#"}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                            isActive(subItem.href)
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-primary/10"
                          )}
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-primary/10">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}