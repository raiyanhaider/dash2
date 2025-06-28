"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Star, Zap, Crown, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    title: "Basic",
    price: "39",
    description: "Perfect for individuals and small projects",
    features: [
      "5 AI Tools",
      "100 Generations/month",
      "Basic Support",
      "Standard Templates",
      "Email Support",
      "Community Access"
    ],
    icon: <Star className="w-6 h-6" />,
    popular: false
  },
  {
    title: "Starter",
    price: "79",
    description: "Great for freelancers and content creators",
    features: [
      "10 AI Tools",
      "500 Generations/month",
      "Priority Email Support",
      "Premium Templates",
      "Basic Analytics",
      "Custom Exports",
      "24/7 Support"
    ],
    icon: <Sparkles className="w-6 h-6" />,
    popular: false
  },
  {
    title: "Pro",
    price: "99",
    description: "Ideal for professionals and growing businesses",
    features: [
      "All AI Tools",
      "Unlimited Generations",
      "Priority Support",
      "Advanced Templates",
      "Custom Branding",
      "API Access",
      "Analytics Dashboard"
    ],
    icon: <Crown className="w-6 h-6" />,
    popular: true
  },
  {
    title: "Business",
    price: "179",
    description: "Perfect for small to medium businesses",
    features: [
      "Everything in Pro",
      "Team Management",
      "Advanced Analytics",
      "Custom Workflows",
      "Priority Support",
      "Training Sessions",
      "Bulk Processing",
      "White Labeling"
    ],
    icon: <Building2 className="w-6 h-6" />,
    popular: false
  },
  {
    title: "Agency",
    price: "299",
    description: "For marketing agencies and large teams",
    features: [
      "Everything in Business",
      "Multiple Team Support",
      "Client Management",
      "Advanced Permissions",
      "Custom Branding",
      "API Integration",
      "Dedicated Manager",
      "Premium Analytics"
    ],
    icon: <Users className="w-6 h-6" />,
    popular: false
  },
  {
    title: "Enterprise",
    price: "249",
    description: "For large teams and organizations",
    features: [
      "Everything in Pro",
      "Custom AI Training",
      "Dedicated Support",
      "Team Collaboration",
      "Advanced Security",
      "Custom Integration",
      "SLA Guarantee",
      "Onboarding Support"
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: false
  }
];

export default function Packages() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
          Lifetime Packages
        </h1>
        <p className="text-lg text-primary/60 max-w-2xl mx-auto">
          One-time payment, lifetime access to powerful AI tools
        </p>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`glass-card h-full relative overflow-hidden ${
              pkg.popular ? 'border-2 border-primary' : ''
            }`}>
              {pkg.popular && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {pkg.icon}
                  </div>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold">
                    ${pkg.price}
                    <span className="text-lg font-normal text-primary/60">
                      /lifetime
                    </span>
                  </p>
                  <p className="text-primary/70">{pkg.description}</p>
                </div>

                <div className="space-y-3">
                  {pkg.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-20">
        <Card className="glass-card">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Lifetime Access",
                  description: "One-time payment for permanent access to all features",
                  icon: <Crown className="w-6 h-6" />
                },
                {
                  title: "Regular Updates",
                  description: "Get access to new features and improvements",
                  icon: <Sparkles className="w-6 h-6" />
                },
                {
                  title: "Premium Support",
                  description: "Priority support from our expert team",
                  icon: <Star className="w-6 h-6" />
                }
              ].map((feature, i) => (
                <div key={i} className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-primary/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}