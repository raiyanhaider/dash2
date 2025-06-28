"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Star, Clock, Zap, Crown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const offers = [
  {
    title: "Early Bird Special",
    description: "Get 30% off on all premium features when you subscribe in the next 24 hours. Early adopters get lifetime access to upcoming features.",
    icon: <Clock className="w-6 h-6" />,
    highlight: false,
    tag: "Limited Time"
  },
  {
    title: "Premium Bundle",
    description: "Access all premium tools and features with unlimited usage. Includes priority support and custom AI model training.",
    icon: <Crown className="w-6 h-6" />,
    highlight: false,
    tag: "Most Popular"
  },
  {
    title: "Team Collaboration",
    description: "Special pricing for teams of 5 or more. Includes team workspace, shared templates, and analytics dashboard.",
    icon: <Star className="w-6 h-6" />,
    highlight: false,
    tag: "Teams"
  },
  {
    title: "Content Creator Pro",
    description: "Tailored package for content creators with advanced AI writing tools, SEO features, and content planning tools.",
    icon: <Zap className="w-6 h-6" />,
    highlight: false,
    tag: "Featured"
  },
  {
    title: "Student Discount",
    description: "50% off for students with valid .edu email addresses. Perfect for academic writing and research assistance.",
    icon: <Gift className="w-6 h-6" />,
    highlight: false,
    tag: "Students"
  },
  {
    title: "Enterprise Solutions",
    description: "Custom AI solutions for enterprises. Includes API access, custom training, and dedicated support team.",
    icon: <Sparkles className="w-6 h-6" />,
    highlight: false,
    tag: "Enterprise"
  }
];

export default function GiftsAndOffers() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
          Special Offers & Deals
        </h1>
        <p className="text-lg text-primary/60 max-w-2xl mx-auto">
          Exclusive deals and special offers to enhance your content creation journey
        </p>
      </div>

      {/* Offer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card h-full relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {offer.tag}
                </span>
              </div>
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {offer.icon}
                  </div>
                  <CardTitle className="text-xl">{offer.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-primary/70">
                  {offer.description}
                </p>
                <Button className="w-full">
                  Claim Offer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Highlight Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="relative mt-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-pulse" />
        <Card className="glass-card border-2 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  <h2 className="text-3xl font-bold gradient-text">
                    Mega Bundle Deal
                  </h2>
                </div>
                <p className="text-lg text-primary/70">
                  Get lifetime access to all premium features, tools, and future updates at an unbeatable price. Limited time offer!
                </p>
                <ul className="space-y-2">
                  {[
                    "All Premium Features",
                    "Lifetime Updates",
                    "Priority Support",
                    "Custom AI Training",
                    "API Access"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right space-y-6">
                <div>
                  <p className="text-sm text-primary/60">Regular Price</p>
                  <p className="text-2xl line-through text-primary/40">$999</p>
                  <p className="text-5xl font-bold gradient-text">$499</p>
                  <p className="text-sm text-primary/60 mt-2">One-time payment</p>
                </div>
                <Button size="lg" className="w-full md:w-auto">
                  Claim This Deal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}