"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SubFeature {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface FeatureButtonProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  subFeatures?: SubFeature[];
}

export function FeatureButton({
  title,
  description,
  href,
  icon,
  subFeatures,
}: FeatureButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={href}>
        <div
          className={cn(
            "p-6 rounded-xl transition-all duration-300",
            "bg-gradient-to-br from-background to-accent/30",
            "border border-accent/20 hover:border-accent/40",
            "group-hover:shadow-[0_0_2rem_-0.5rem_theme(colors.primary.DEFAULT)]",
            "relative overflow-hidden"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              {icon}
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </Link>

      {subFeatures && isHovered && (
        <div className={cn(
          "absolute top-full left-0 mt-2 p-3 rounded-xl z-20",
          "bg-popover/95 backdrop-blur-sm border shadow-lg",
          "grid gap-2 w-full",
          "animate-in fade-in-0 slide-in-from-top-5 duration-200"
        )}>
          {subFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg",
                "hover:bg-accent/50 transition-colors",
                "text-sm font-medium"
              )}
            >
              {feature.icon}
              {feature.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}