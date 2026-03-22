"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, BookOpen, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Planner", icon: Calendar, href: "/planner" },
  { label: "Recipes", icon: BookOpen, href: "/recipes" },
  { label: "Health", icon: Heart, href: "/health" },
  { label: "Profile", icon: User, href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-morphism border-t mobile-nav-shadow pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
              )}
            >
              <item.icon className={cn("h-6 w-6 mb-1", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium font-headline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}