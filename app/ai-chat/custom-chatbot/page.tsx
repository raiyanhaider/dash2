"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Bot, Sparkles, ArrowLeft, Zap, Star, Crown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatbotConfig {
  name: string;
  type: string;
  customType: string;
  expertise: string;
  customExpertise: string;
  description: string;
}

const chatbotTypes = [
  { value: "assistant", label: "Personal Assistant", icon: "🤖", description: "Helpful general-purpose assistant" },
  { value: "expert", label: "Domain Expert", icon: "🎓", description: "Specialized knowledge in specific field" },
  { value: "creative", label: "Creative Partner", icon: "🎨", description: "Creative writing and brainstorming" },
  { value: "analyst", label: "Data Analyst", icon: "📊", description: "Data analysis and insights" },
  { value: "coach", label: "Life Coach", icon: "💪", description: "Motivation and guidance" },
  { value: "tutor", label: "Learning Tutor", icon: "📚", description: "Educational support and teaching" },
  { value: "custom", label: "Custom Type", icon: "⚡", description: "Create your own chatbot type" }
];

const expertiseAreas = [
  "Marketing & Advertising", "Software Development", "Data Science", "Content Writing",
  "SEO & Digital Marketing", "Business Strategy", "Finance & Investment", "Health & Wellness",
  "Education & Training", "Creative Writing", "Psychology & Counseling", "Technology Consulting",
  "Project Management", "Sales & Customer Service", "Legal Advice", "Design & UX/UI",
  "Social Media Management", "E-commerce", "Real Estate", "Travel & Tourism",
  "Custom Expertise"
];

export default function CustomChatbot() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ChatbotConfig>({
    name: "",
    type: "",
    customType: "",
    expertise: "",
    customExpertise: "",
    description: ""
  });

  const handleNext = () => {
    if (step === 1 && canProceed()) {
      const finalType = config.type === "custom" ? config.customType : config.type;
      const finalExpertise = config.expertise === "Custom Expertise" ? config.customExpertise : config.expertise;
      
      router.push(`/ai-chat/custom-chatbot/chat?name=${encodeURIComponent(config.name)}&type=${finalType}&expertise=${encodeURIComponent(finalExpertise)}&description=${encodeURIComponent(config.description)}`);
    }
  };

  const canProceed = () => {
    const hasValidType = config.type && (config.type !== "custom" || config.customType.trim());
    const hasValidExpertise = config.expertise && (config.expertise !== "Custom Expertise" || config.customExpertise.trim());
    return config.name.trim() && hasValidType && hasValidExpertise;
  };

  const selectedType = chatbotTypes.find(type => type.value === config.type);
  const displayType = config.type === "custom" ? config.customType : selectedType?.label;
  const displayExpertise = config.expertise === "Custom Expertise" ? config.customExpertise : config.expertise;

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <Card className="max-w-6xl mx-auto glass-card">
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
                Custom AI Chatbot
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Create your personalized AI assistant in 2 simple steps
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Horizontal Gamified Progress */}
          <div className="mb-8 relative">
            <div className="flex items-center justify-center space-x-16">
              {/* Step 1 - Configuration */}
              <motion.div
                className={`relative flex flex-col items-center ${
                  step >= 1 ? "text-primary" : "text-primary/30"
                }`}
                animate={step >= 1 ? { scale: 1.1, x: -5 } : { scale: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 border-4 transition-all duration-300 ${
                  step >= 1
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-300 shadow-lg shadow-blue-500/30"
                    : "bg-primary/10 border-primary/20"
                }`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">Step 1</h3>
                  <p className="text-sm">Configuration</p>
                  <p className="text-xs opacity-70">Setup your chatbot</p>
                </div>
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                )}
              </motion.div>

              {/* Horizontal Connection */}
              <div className={`h-1 w-32 transition-all duration-500 ${
                step >= 2 ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-primary/20"
              }`} />

              {/* Step 2 - Chat Interface */}
              <motion.div
                className={`relative flex flex-col items-center ${
                  step >= 2 ? "text-primary" : "text-primary/30"
                }`}
                animate={step >= 2 ? { scale: 1.1, x: 5 } : { scale: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 border-4 transition-all duration-300 ${
                  step >= 2
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-300 shadow-lg shadow-purple-500/30"
                    : "bg-primary/10 border-primary/20"
                }`}>
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">Step 2</h3>
                  <p className="text-sm">Chat Interface</p>
                  <p className="text-xs opacity-70">Talk with your AI</p>
                </div>
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Floating particles for gamification */}
            {step >= 1 && (
              <>
                <motion.div
                  className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    x: [0, 20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-20 right-10 w-3 h-3 bg-purple-400 rounded-full"
                  animate={{
                    x: [0, -15, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-10 left-1/2 w-2 h-2 bg-pink-400 rounded-full"
                  animate={{
                    x: [0, 25, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </>
            )}
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
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2 mb-8">
                    <h3 className="text-xl font-bold gradient-text">Configure Your AI Chatbot</h3>
                    <p className="text-primary/60">
                      Customize your AI assistant's personality and expertise
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary/90">
                          Chatbot Name
                        </label>
                        <Input
                          placeholder="e.g., Alex, Marketing Guru, Code Helper..."
                          value={config.name}
                          onChange={(e) => setConfig({ ...config, name: e.target.value })}
                          className="bg-card/30"
                        />
                        <p className="text-xs text-primary/60">
                          Give your chatbot a memorable name
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary/90">
                          Chatbot Type
                        </label>
                        <Select value={config.type} onValueChange={(value) => setConfig({ ...config, type: value })}>
                          <SelectTrigger className="bg-card/30">
                            <SelectValue placeholder="Select chatbot type" />
                          </SelectTrigger>
                          <SelectContent>
                            {chatbotTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <span>{type.icon}</span>
                                  <div>
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-xs text-primary/60">{type.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {config.type === "custom" && (
                          <div className="mt-2">
                            <Input
                              placeholder="Enter your custom chatbot type..."
                              value={config.customType}
                              onChange={(e) => setConfig({ ...config, customType: e.target.value })}
                              className="bg-card/30"
                            />
                            <p className="text-xs text-primary/60 mt-1">
                              Define your own unique chatbot type
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary/90">
                          Area of Expertise
                        </label>
                        <Select value={config.expertise} onValueChange={(value) => setConfig({ ...config, expertise: value })}>
                          <SelectTrigger className="bg-card/30">
                            <SelectValue placeholder="Select expertise area" />
                          </SelectTrigger>
                          <SelectContent>
                            {expertiseAreas.map((area) => (
                              <SelectItem key={area} value={area}>
                                <div className="flex items-center gap-2">
                                  {area === "Custom Expertise" && <Plus className="w-4 h-4" />}
                                  {area}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {config.expertise === "Custom Expertise" && (
                          <div className="mt-2">
                            <Input
                              placeholder="Enter your custom expertise area..."
                              value={config.customExpertise}
                              onChange={(e) => setConfig({ ...config, customExpertise: e.target.value })}
                              className="bg-card/30"
                            />
                            <p className="text-xs text-primary/60 mt-1">
                              Define your own area of expertise
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary/90">
                          Additional Description (Optional)
                        </label>
                        <Textarea
                          placeholder="Describe any specific traits, communication style, or additional expertise..."
                          value={config.description}
                          onChange={(e) => setConfig({ ...config, description: e.target.value })}
                          className="h-24 bg-card/30"
                        />
                        <p className="text-xs text-primary/60">
                          Add personality traits or specific instructions
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Preview Card */}
                      <div className="p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                        <h4 className="font-medium mb-4 flex items-center gap-2">
                          <Bot className="w-5 h-5" />
                          Chatbot Preview
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {config.name ? config.name.charAt(0).toUpperCase() : "?"}
                              </span>
                            </div>
                            <div>
                              <h5 className="font-medium">
                                {config.name || "Your Chatbot"}
                              </h5>
                              <p className="text-sm text-primary/60">
                                {displayType || "Select a type"}
                              </p>
                            </div>
                          </div>

                          {displayExpertise && (
                            <div className="p-3 rounded-lg bg-primary/10">
                              <p className="text-sm">
                                <span className="font-medium">Expertise:</span> {displayExpertise}
                              </p>
                            </div>
                          )}

                          {config.description && (
                            <div className="p-3 rounded-lg bg-accent/10">
                              <p className="text-sm">
                                <span className="font-medium">Description:</span> {config.description}
                              </p>
                            </div>
                          )}

                          {selectedType && config.type !== "custom" && (
                            <div className="p-3 rounded-lg bg-card/30">
                              <p className="text-sm text-primary/70">
                                {selectedType.description}
                              </p>
                            </div>
                          )}

                          {config.type === "custom" && config.customType && (
                            <div className="p-3 rounded-lg bg-card/30">
                              <p className="text-sm text-primary/70">
                                Custom chatbot type: {config.customType}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Configuration Tips */}
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <h5 className="font-medium text-blue-800 mb-2">💡 Configuration Tips:</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Choose a descriptive name that reflects your chatbot's purpose</li>
                          <li>• Select or create a type that matches your intended use case</li>
                          <li>• Be specific about the expertise area for better responses</li>
                          <li>• Add personality traits in the description for unique interactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      size="lg"
                      className="min-w-[200px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create My Chatbot
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}