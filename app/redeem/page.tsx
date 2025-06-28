"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function RedeemCodes() {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''));
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const handleRedeem = () => {
    if (!codes.some(code => code.trim())) return;
    
    setIsRedeeming(true);
    // Simulated API call
    setTimeout(() => {
      setIsRedeeming(false);
      setCodes(Array(6).fill(''));
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto glass-card">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">Redeem Codes</CardTitle>
              <CardDescription>Enter your promotional codes to unlock rewards</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {codes.map((code, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Input
                  placeholder={`Code ${i + 1}`}
                  value={code}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  className="bg-card/30 text-center uppercase"
                  maxLength={12}
                />
              </motion.div>
            ))}
          </div>

          <Button
            onClick={handleRedeem}
            className="w-full"
            disabled={!codes.some(code => code.trim()) || isRedeeming}
          >
            {isRedeeming ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Redeeming...
              </>
            ) : (
              'Redeem Codes'
            )}
          </Button>

          <div className="text-sm text-primary/60">
            <p className="font-medium mb-2">How to redeem:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Enter your promotional codes in the fields above</li>
              <li>Each code can unlock different rewards</li>
              <li>You can enter multiple codes at once</li>
              <li>Codes are case-insensitive</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}