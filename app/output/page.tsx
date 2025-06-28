"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Content {
  id: string;
  title: string;
  content: string;
  type: string;
  date: string;
}

const mockContents: Content[] = [
  {
    id: "1",
    title: "The Future of AI in Content Creation",
    content: "Artificial Intelligence is revolutionizing the way we create and consume content...",
    type: "Blog Post",
    date: "2024-03-15"
  },
  {
    id: "2",
    title: "10 Tips for Effective SEO",
    content: "Search Engine Optimization remains a crucial aspect of digital marketing...",
    type: "Article",
    date: "2024-03-14"
  }
];

export default function Output() {
  const [contents] = useState<Content[]>(mockContents);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
          Generated Content
        </h1>
        <p className="text-lg text-primary/60 max-w-2xl mx-auto">
          View and manage your AI-generated content
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contents.map((content, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/output/${content.id}`}>
              <Card className="glass-card h-full hover:bg-card/40 transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    {content.title.length > 30 
                      ? content.title.substring(0, 30) + "..."
                      : content.title}
                  </CardTitle>
                  <ChevronRight className="w-4 h-4 text-primary/40" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-primary/60 mb-2">
                    <FileText className="w-4 h-4" />
                    {content.type}
                    <span className="text-primary/40">•</span>
                    {new Date(content.date).toLocaleDateString()}
                  </div>
                  <p className="text-primary/80">
                    {content.content.substring(0, 30)}...
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}