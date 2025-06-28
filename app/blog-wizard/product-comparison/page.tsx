"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ComparisonData {
  title: string;
  keywords: string;
  language: string;
  description: string;
  numberOfProducts: number;
  products: Array<{
    name: string;
    details: string;
    pros: string;
    cons: string;
  }>;
}

export default function ProductComparisonBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ComparisonData>({
    title: "Best Wireless Earbuds 2024: AirPods Pro vs Sony WF-1000XM4 vs Bose QuietComfort Earbuds",
    keywords: "wireless earbuds, noise cancelling, bluetooth headphones, AirPods Pro, Sony WF-1000XM4, Bose QuietComfort",
    language: "english",
    description: "In this comprehensive comparison, we'll analyze three of the most popular premium wireless earbuds available in 2024. We'll examine their sound quality, noise cancellation capabilities, battery life, comfort, and overall value to help you choose the perfect pair for your needs.",
    numberOfProducts: 3,
    products: [
      {
        name: "Apple AirPods Pro (2nd Generation)",
        details: "Apple AirPods Pro (2nd Generation) are Apple's flagship wireless earbuds featuring the powerful H2 chip for enhanced audio processing. They offer Adaptive Transparency mode, Personalized Spatial Audio with dynamic head tracking, and up to 6 hours of listening time (30 hours with the charging case). The earbuds are IPX4 water-resistant and come with a Lightning charging case. Priced at $249, they represent Apple's premium audio offering with seamless integration across the Apple ecosystem.",
        pros: "Seamless integration with Apple devices and ecosystem\nExcellent spatial audio experience with head tracking\nIntuitive touch controls and easy gesture navigation\nQuick and effortless pairing with Apple devices\nRegular software updates with new features\nCompact and highly portable design\nGood call quality with clear voice transmission",
        cons: "Limited compatibility with non-Apple devices\nShorter battery life compared to main competitors\nLightning charging instead of universal USB-C\nCan be expensive for the feature set offered\nMay not fit all ear shapes perfectly\nLimited customization options for Android users"
      },
      {
        name: "Sony WF-1000XM4",
        details: "Sony WF-1000XM4 earbuds are renowned for their industry-leading noise cancellation technology and superior audio quality. They support LDAC codec for high-resolution audio streaming and offer 8 hours of battery life (24 hours with the case). The earbuds feature IPX4 water resistance, USB-C charging, and extensive customization through the Sony Headphones app. Priced at $279, they're positioned as premium audiophile earbuds with professional-grade features.",
        pros: "Superior noise cancellation technology in the industry\nExceptional sound quality with LDAC codec support\nLonger battery life than most competitors\nHighly customizable EQ and sound settings through app\nComfortable foam ear tips included in the package\nUSB-C charging for universal compatibility\nExcellent build quality and premium materials",
        cons: "Larger case size makes them less portable\nTouch controls can be overly sensitive at times\nNo wireless charging capability\nSlightly bulkier earbuds compared to competitors\nSony app can be overwhelming for casual users\nMore expensive than AirPods Pro\nOccasional connectivity issues with some devices"
      },
      {
        name: "Bose QuietComfort Earbuds",
        details: "Bose QuietComfort Earbuds are engineered for ultimate comfort and world-class noise cancellation. They feature 11 levels of adjustable noise cancellation, allowing users to fine-tune their listening experience. With 6 hours of battery life (18 hours with the case), IPX4 water resistance, and USB-C charging, they're built for daily use. The StayHear Max tips ensure a secure and comfortable fit. Priced at $299, they're the premium option focused on comfort and noise cancellation excellence.",
        pros: "Best-in-class noise cancellation with 11 adjustable levels\nIncredibly comfortable fit for extended listening sessions\nExcellent call quality with superior microphone array\nIntuitive touch controls that respond accurately\nRobust build quality with premium materials\nGreat for long listening sessions without fatigue\nConsistent and reliable Bluetooth connection",
        cons: "Largest and heaviest option among the three\nShorter total battery life compared to competitors\nLimited customization options in the companion app\nMost expensive option in this comparison\nCase is quite bulky and less portable\nNo wireless charging capability\nBasic app functionality compared to Sony's offering\nLimited color options available"
      }
    ]
  });

  const steps = [
    {
      title: "Basic Information",
      description: "Set up your comparison details"
    },
    {
      title: "Product Details",
      description: "Add information for each product"
    },
    {
      title: "Generated Content",
      description: "Review your comparison content"
    }
  ];

  const handleNext = () => {
    if (step === 1) {
      // Initialize products array based on selected number
      const products = Array.from({ length: data.numberOfProducts }, (_, index) => {
        // Use demo data if available, otherwise empty
        if (index < data.products.length) {
          return data.products[index];
        }
        return {
          name: "",
          details: "",
          pros: "",
          cons: ""
        };
      });
      setData({ ...data, products });
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const updateProduct = (index: number, field: string, value: string) => {
    const updatedProducts = [...data.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setData({ ...data, products: updatedProducts });
  };

  const generateContent = () => {
    // Simulate content generation
    setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Content Title
              </label>
              <Input
                placeholder="Enter your comparison title..."
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="bg-card/30"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Keywords
              </label>
              <Input
                placeholder="Enter keywords separated by commas..."
                value={data.keywords}
                onChange={(e) => setData({ ...data, keywords: e.target.value })}
                className="bg-card/30"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Language
              </label>
              <Select value={data.language} onValueChange={(value) => setData({ ...data, language: value })}>
                <SelectTrigger className="bg-card/30">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Description
              </label>
              <Textarea
                placeholder="Describe your comparison overview..."
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="h-32 bg-card/30"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-primary/90">
                Number of Products to Compare
              </label>
              <Select 
                value={data.numberOfProducts.toString()} 
                onValueChange={(value) => setData({ ...data, numberOfProducts: parseInt(value) })}
              >
                <SelectTrigger className="bg-card/30">
                  <SelectValue placeholder="Select number of products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Products</SelectItem>
                  <SelectItem value="3">3 Products</SelectItem>
                  <SelectItem value="4">4 Products</SelectItem>
                  <SelectItem value="5">5 Products</SelectItem>
                  <SelectItem value="6">6 Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {data.products.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-lg font-medium">Product Information</h3>
                {data.products.map((product, index) => (
                  <div key={index} className="p-6 rounded-lg border border-primary/20 bg-card/20">
                    <h4 className="text-md font-medium mb-4">Product {index + 1}</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2">
                          Product Name and Details
                        </label>
                        <Textarea
                          placeholder="Enter product name and detailed information..."
                          value={product.details}
                          onChange={(e) => updateProduct(index, 'details', e.target.value)}
                          className="h-32 bg-card/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2">
                          Pros (one per line)
                        </label>
                        <Textarea
                          placeholder="List the advantages and positive features..."
                          value={product.pros}
                          onChange={(e) => updateProduct(index, 'pros', e.target.value)}
                          className="h-24 bg-card/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2">
                          Cons (one per line)
                        </label>
                        <Textarea
                          placeholder="List the disadvantages and limitations..."
                          value={product.cons}
                          onChange={(e) => updateProduct(index, 'cons', e.target.value)}
                          className="h-24 bg-card/30"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="p-8 rounded-lg border border-primary/20 bg-primary/5">
              <div className="prose prose-lg max-w-none">
                {/* Title */}
                <h1 className="text-3xl font-bold mb-6 text-primary">{data.title}</h1>
                
                {/* Introduction */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
                  <p className="text-primary/80 leading-relaxed text-lg mb-4">
                    {data.description}
                  </p>
                  <p className="text-primary/80 leading-relaxed">
                    In today's competitive market, choosing the right product can be overwhelming. This detailed comparison 
                    will break down the key features, advantages, and limitations of each option to help you make an informed 
                    decision based on your specific needs and preferences.
                  </p>
                </div>

                {/* Product Comparison Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-6 text-primary">Product Comparison</h2>
                  
                  {data.products.map((product, index) => {
                    const productName = product.details.split('.')[0] || product.details.split('\n')[0] || `Product ${index + 1}`;
                    
                    return (
                      <div key={index} className="mb-8 p-6 bg-white/50 rounded-lg border border-primary/10">
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                          {index + 1}. {productName}
                        </h3>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-medium mb-3 text-primary/90">Overview</h4>
                          <p className="text-primary/80 leading-relaxed">
                            {product.details}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-medium mb-3 text-green-600 flex items-center">
                              <span className="mr-2">✅</span> Pros
                            </h4>
                            <ul className="space-y-2">
                              {product.pros.split('\n').filter(pro => pro.trim()).map((pro, i) => (
                                <li key={i} className="text-primary/80 flex items-start">
                                  <span className="text-green-500 mr-2 mt-1">•</span>
                                  <span>{pro.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-medium mb-3 text-red-600 flex items-center">
                              <span className="mr-2">❌</span> Cons
                            </h4>
                            <ul className="space-y-2">
                              {product.cons.split('\n').filter(con => con.trim()).map((con, i) => (
                                <li key={i} className="text-primary/80 flex items-start">
                                  <span className="text-red-500 mr-2 mt-1">•</span>
                                  <span>{con.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Pros and Cons Analysis */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-6 text-primary">Detailed Pros and Cons Analysis</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
                        <span className="mr-2">✅</span> Key Advantages
                      </h3>
                      <div className="space-y-4">
                        {data.products.map((product, index) => {
                          const productName = product.details.split('.')[0] || product.details.split('\n')[0] || `Product ${index + 1}`;
                          const topPros = product.pros.split('\n').filter(pro => pro.trim()).slice(0, 2);
                          
                          return (
                            <div key={index}>
                              <h4 className="font-medium text-green-800 mb-2">{productName}:</h4>
                              <ul className="text-green-700 text-sm space-y-1">
                                {topPros.map((pro, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{pro.trim()}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                      <h3 className="text-xl font-semibold mb-4 text-red-700 flex items-center">
                        <span className="mr-2">❌</span> Key Limitations
                      </h3>
                      <div className="space-y-4">
                        {data.products.map((product, index) => {
                          const productName = product.details.split('.')[0] || product.details.split('\n')[0] || `Product ${index + 1}`;
                          const topCons = product.cons.split('\n').filter(con => con.trim()).slice(0, 2);
                          
                          return (
                            <div key={index}>
                              <h4 className="font-medium text-red-800 mb-2">{productName}:</h4>
                              <ul className="text-red-700 text-sm space-y-1">
                                {topCons.map((con, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{con.trim()}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Summary</h2>
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-primary/80 leading-relaxed mb-4">
                      After analyzing all {data.numberOfProducts} products in detail, each option brings unique strengths 
                      to the table. Here's a quick summary to help you decide:
                    </p>
                    
                    <div className="space-y-3">
                      {data.products.map((product, index) => {
                        const productName = product.details.split('.')[0] || product.details.split('\n')[0] || `Product ${index + 1}`;
                        const mainPro = product.pros.split('\n').filter(pro => pro.trim())[0];
                        
                        return (
                          <div key={index} className="flex items-start">
                            <span className="font-medium text-primary mr-2">•</span>
                            <span className="text-primary/80">
                              <strong>{productName}</strong> - {mainPro?.trim()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Conclusion</h2>
                  <p className="text-primary/80 leading-relaxed mb-4">
                    Choosing between these {data.numberOfProducts} excellent options ultimately depends on your specific 
                    needs, budget, and personal preferences. Each product excels in different areas, making them suitable 
                    for different types of users.
                  </p>
                  
                  <p className="text-primary/80 leading-relaxed mb-4">
                    Consider your primary use case, budget constraints, and the features that matter most to you. 
                    Whether you prioritize performance, value, design, or specific functionality, there's an option 
                    in this comparison that will meet your needs.
                  </p>
                  
                  <p className="text-primary/80 leading-relaxed">
                    We recommend taking advantage of return policies and trial periods when available to ensure 
                    your chosen product meets your expectations in real-world use. Remember that the "best" choice 
                    is the one that aligns most closely with your individual requirements and preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.title.trim() && data.description.trim();
      case 2:
        return data.products.every(product => 
          product.details.trim() && product.pros.trim() && product.cons.trim()
        );
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
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
              Product Comparison Builder
            </CardTitle>
          </div>
          <CardDescription className="text-base sm:text-lg">
            Create detailed product comparisons in 3 simple steps
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
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
            </div>
            <div>
              {step < 3 && (
                <Button
                  onClick={step === 2 ? generateContent : handleNext}
                  className="flex items-center gap-2"
                  size="lg"
                  disabled={!canProceed()}
                >
                  {step === 2 ? 'Generate Content' : 'Next Step'}
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