"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Send, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'team';
  timestamp: Date;
}

// Mock data - replace with actual data fetching
const mockTickets = {
  'tk-001': {
    id: "TK-001",
    title: "API Integration Issue",
    status: "Open",
    priority: "High",
    createdAt: "2024-03-15T10:00:00Z",
    description: "Having issues integrating the API with my application. The endpoints are not responding as expected.",
    messages: [
      {
        id: "1",
        content: "Hi, I'm experiencing issues with the API integration. The endpoints are not responding as expected.",
        sender: 'user',
        timestamp: new Date('2024-03-15T10:00:00Z')
      },
      {
        id: "2",
        content: "Hello! Thank you for reaching out. Could you please provide more specific details about the endpoints you're trying to access?",
        sender: 'team',
        timestamp: new Date('2024-03-15T10:30:00Z')
      }
    ]
  },
  'tk-002': {
    id: "TK-002",
    title: "Billing Question",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2024-03-14T15:00:00Z",
    description: "Need clarification about the billing cycle and payment methods.",
    messages: []
  }
};

export default function TicketDetail() {
  const params = useParams();
  const ticketId = params.ticketId as string;
  const ticket = mockTickets[ticketId.toLowerCase()];
  
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>(ticket?.messages || []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    // Simulated API call
    setTimeout(() => {
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      setIsSending(false);
    }, 1000);
  };

  if (!ticket) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-4xl mx-auto glass-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-primary/60">Ticket not found</h2>
            <p className="mt-2 text-primary/40">The ticket you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl gradient-text">{ticket.title}</CardTitle>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-primary/60">Ticket {ticket.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'Open' ? 'bg-green-500/10 text-green-500' :
                  ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-primary/10 text-primary'
                }`}>
                  {ticket.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                  ticket.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-green-500/10 text-green-500'
                }`}>
                  {ticket.priority} Priority
                </span>
                <span className="flex items-center gap-1 text-sm text-primary/60">
                  <Clock className="w-4 h-4" />
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-primary/80">{ticket.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Conversation
            </h3>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-card/30"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
              >
                {isSending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}