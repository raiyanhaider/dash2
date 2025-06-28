"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, MessageSquare, Clock, Plus, ChevronRight, Facebook, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const tickets = [
  {
    id: "TK-001",
    title: "API Integration Issue",
    status: "Open",
    priority: "High",
    lastUpdate: "2 hours ago",
    category: "Technical",
    messages: 3
  },
  {
    id: "TK-002",
    title: "Billing Question",
    status: "In Progress",
    priority: "Medium",
    lastUpdate: "1 day ago",
    category: "Billing",
    messages: 5
  },
  {
    id: "TK-003",
    title: "Feature Request",
    status: "Closed",
    priority: "Low",
    lastUpdate: "3 days ago",
    category: "Feature",
    messages: 8
  }
];

export default function Support() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <LifeBuoy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Support Center</h1>
            <p className="text-primary/60">Track and manage your support tickets</p>
          </div>
        </div>
        <Link href="/support/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </Link>
      </div>

      {/* Tickets Grid */}
      <div className="grid gap-4">
        {tickets.map((ticket, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/support/${ticket.id.toLowerCase()}`}>
              <Card className="glass-card hover:bg-card/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-primary/60">{ticket.id}</span>
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
                          {ticket.priority}
                        </span>
                      </div>
                      <h2 className="text-lg font-medium">{ticket.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-primary/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {ticket.lastUpdate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {ticket.messages} messages
                        </span>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-xs">
                          {ticket.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary/40" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Help Section */}
      <Card className="glass-card mt-8">
        <CardHeader>
          <CardTitle>Need Quick Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Blog",
                description: "Read our latest articles and updates",
                icon: <BookOpen className="w-6 h-6" />,
                link: "/blog"
              },
              {
                title: "Facebook Group",
                description: "Join our community for discussions",
                icon: <Users className="w-6 h-6" />,
                link: "https://facebook.com/groups/atomwriter"
              },
              {
                title: "Live Chat",
                description: "Chat with us on Facebook Messenger",
                icon: <Facebook className="w-6 h-6" />,
                link: "https://m.me/atomwriter"
              }
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
                <div className="p-4 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {item.icon}
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-primary/60">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}