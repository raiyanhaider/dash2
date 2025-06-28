"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LifeBuoy, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function NewTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !category || !priority) return;
    
    setIsSubmitting(true);
    // Simulated API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('');
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <LifeBuoy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Submit New Ticket</CardTitle>
              <CardDescription>Create a new support ticket for assistance</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Brief description of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-card/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-card/30">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-card/30">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Detailed description of your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] bg-card/30"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!title.trim() || !description.trim() || !category || !priority || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Ticket'
            )}
          </Button>

          <div className="text-sm text-primary/60">
            <p className="font-medium mb-2">Before submitting:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Check our documentation for quick solutions</li>
              <li>Provide as much detail as possible</li>
              <li>Include any relevant screenshots or error messages</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}