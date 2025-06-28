"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Book, Code, Palette, TrendingUp, Brain } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Book className="w-5 h-5" />,
    tutorials: [
      {
        title: "Introduction to AI Writing",
        videoId: "dQw4w9WgXcQ",
        duration: "5:30"
      },
      {
        title: "Setting Up Your First Project",
        videoId: "dQw4w9WgXcQ",
        duration: "8:45"
      }
    ]
  },
  {
    id: "content-creation",
    title: "Content Creation",
    icon: <Palette className="w-5 h-5" />,
    tutorials: [
      {
        title: "Writing Engaging Blog Posts",
        videoId: "dQw4w9WgXcQ",
        duration: "12:20"
      },
      {
        title: "SEO Optimization Tips",
        videoId: "dQw4w9WgXcQ",
        duration: "15:00"
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Techniques",
    icon: <Brain className="w-5 h-5" />,
    tutorials: [
      {
        title: "Custom AI Model Training",
        videoId: "dQw4w9WgXcQ",
        duration: "20:15"
      },
      {
        title: "Advanced Content Strategy",
        videoId: "dQw4w9WgXcQ",
        duration: "18:30"
      }
    ]
  }
];

export default function Tutorials() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
          Video Tutorials
        </h1>
        <p className="text-lg text-primary/60 max-w-2xl mx-auto">
          Learn how to master our AI tools with step-by-step video guides
        </p>
      </div>

      <Tabs defaultValue={categories[0].id} className="space-y-8">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-6 md:grid-cols-2">
              {category.tutorials.map((tutorial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-card overflow-hidden">
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                        title={tutorial.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-primary/60">
                          <Play className="w-4 h-4" />
                          {tutorial.duration}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}