"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, ArrowLeft, Sparkles, User, RefreshCw, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotConfig {
  name: string;
  type: string;
  expertise: string;
  description: string;
}

export default function CustomChatbotChat() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [config, setConfig] = useState<ChatbotConfig>({
    name: '',
    type: '',
    expertise: '',
    description: ''
  });
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Get configuration from URL parameters
    const name = searchParams.get('name') || 'AI Assistant';
    const type = searchParams.get('type') || 'assistant';
    const expertise = searchParams.get('expertise') || 'General Knowledge';
    const description = searchParams.get('description') || '';

    setConfig({ name, type, expertise, description });

    // Add welcome message
    const welcomeMessage: Message = {
      role: 'assistant',
      content: getWelcomeMessage(name, type, expertise, description),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [searchParams]);

  const getWelcomeMessage = (name: string, type: string, expertise: string, description: string) => {
    const typeGreetings = {
      assistant: `Hi! I'm ${name}, your personal AI assistant.`,
      expert: `Hello! I'm ${name}, your specialized expert in ${expertise}.`,
      creative: `Hey there! I'm ${name}, your creative partner ready to brainstorm and create amazing content.`,
      analyst: `Greetings! I'm ${name}, your data analyst ready to help you understand and interpret information.`,
      coach: `Welcome! I'm ${name}, your personal coach here to motivate and guide you towards your goals.`,
      tutor: `Hello! I'm ${name}, your learning tutor ready to help you understand and master new concepts.`
    };

    const baseGreeting = typeGreetings[type as keyof typeof typeGreetings] || typeGreetings.assistant;
    
    let fullMessage = baseGreeting;
    fullMessage += ` I specialize in ${expertise} and I'm here to help you with any questions or tasks you might have.`;
    
    if (description) {
      fullMessage += ` ${description}`;
    }
    
    fullMessage += ` What would you like to work on today?`;
    
    return fullMessage;
  };

  const generateResponse = (userMessage: string, config: ChatbotConfig): string => {
    const responses = {
      assistant: [
        `I'd be happy to help you with that! Based on my expertise in ${config.expertise}, here's what I think...`,
        `That's a great question! Let me provide you with some insights about ${userMessage.toLowerCase()}...`,
        `I understand what you're looking for. In my experience with ${config.expertise}, I can suggest...`
      ],
      expert: [
        `As an expert in ${config.expertise}, I can tell you that ${userMessage.toLowerCase()} is quite important. Here's my professional perspective...`,
        `From my specialized knowledge in ${config.expertise}, I'd recommend considering these key factors...`,
        `That's an excellent question about ${config.expertise}. Based on industry best practices...`
      ],
      creative: [
        `What an exciting creative challenge! Let's brainstorm some innovative ideas for ${userMessage.toLowerCase()}...`,
        `I love your creative thinking! Here are some imaginative approaches we could explore...`,
        `That sparks so many creative possibilities! Let me share some unique perspectives...`
      ],
      analyst: [
        `Let me analyze this data point for you. Based on the patterns I see in ${userMessage.toLowerCase()}...`,
        `From an analytical perspective, here's what the data suggests about ${userMessage.toLowerCase()}...`,
        `I've processed your request and here are the key insights and trends I've identified...`
      ],
      coach: [
        `I believe in your potential! Regarding ${userMessage.toLowerCase()}, here's how we can approach this challenge...`,
        `You're asking the right questions! Let's break down ${userMessage.toLowerCase()} into actionable steps...`,
        `That's a powerful goal! Here's how we can work together to achieve success with ${userMessage.toLowerCase()}...`
      ],
      tutor: [
        `Great question! Let me explain ${userMessage.toLowerCase()} in a way that's easy to understand...`,
        `I'm excited to help you learn about this! Here's a step-by-step breakdown of ${userMessage.toLowerCase()}...`,
        `Learning about ${userMessage.toLowerCase()} is a wonderful choice! Let's start with the fundamentals...`
      ]
    };

    const typeResponses = responses[config.type as keyof typeof responses] || responses.assistant;
    const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)];
    
    // Add some domain-specific content based on expertise
    const expertiseContent = {
      'Marketing & Advertising': 'Consider your target audience, brand positioning, and conversion metrics.',
      'Software Development': 'Think about scalability, maintainability, and user experience.',
      'Content Writing': 'Focus on engaging storytelling, SEO optimization, and audience value.',
      'SEO & Digital Marketing': 'Prioritize keyword research, content quality, and technical optimization.',
      'Data Science': 'Analyze the data patterns, statistical significance, and predictive models.',
      'Business Strategy': 'Evaluate market opportunities, competitive advantages, and ROI potential.'
    };

    const additionalContent = expertiseContent[config.expertise as keyof typeof expertiseContent] || 
      'Consider the best practices and current trends in this field.';

    return `${randomResponse} ${additionalContent} Would you like me to elaborate on any specific aspect?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const response: Message = {
        role: 'assistant',
        content: generateResponse(input, config),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      role: 'assistant',
      content: getWelcomeMessage(config.name, config.type, config.expertise, config.description),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto glass-card min-h-[600px] flex flex-col">
        <CardHeader className="space-y-2 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/ai-chat/custom-chatbot')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {config.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <CardTitle className="text-xl gradient-text">{config.name}</CardTitle>
                <p className="text-sm text-primary/60">
                  {config.expertise} • {config.type.charAt(0).toUpperCase() + config.type.slice(1)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                title="Clear chat"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/ai-chat/custom-chatbot')}
                title="Reconfigure"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === 'user'
                          ? 'flex-row-reverse'
                          : 'flex-row'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <span className="font-bold text-sm">
                            {config.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card/50 border border-primary/10'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                      <span className="font-bold text-sm text-white">
                        {config.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="rounded-lg p-4 bg-card/50 border border-primary/10">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-xs text-primary/60">{config.name} is typing...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-6 border-t border-primary/10">
            <div className="flex gap-2">
              <Input
                placeholder={`Ask ${config.name} anything about ${config.expertise}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-card/30"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-primary/60">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by {config.name}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}