"use client";

import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Flame, DollarSign, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function HomePage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-home');
  const recipeImg = PlaceHolderImages.find(img => img.id === 'recipe-1');

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Home" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* Welcome Section */}
        <section className="space-y-1">
          <p className="text-muted-foreground font-medium">Good morning, Alex 👋</p>
          <h2 className="text-2xl font-bold font-headline">Ready for today's plan?</h2>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Spent</p>
                <p className="text-lg font-bold text-primary">$124.50</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/5 border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Flame className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Avg Cal</p>
                <p className="text-lg font-bold text-secondary">1,850</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Up Next / Current Meal */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg font-headline">Up Next: Lunch</h3>
            <Link href="/planner" className="text-primary text-sm font-semibold flex items-center">
              View Plan <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <Card className="overflow-hidden border-none shadow-md">
            <div className="relative h-48 w-full">
              <Image 
                src={heroImg?.imageUrl || ""} 
                alt={heroImg?.description || ""} 
                fill 
                className="object-cover"
                data-ai-hint={heroImg?.imageHint}
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-primary hover:bg-white">12:30 PM</Badge>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">Grilled Mediterranean Bowl</h4>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mt-1">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 20 mins</span>
                    <span className="flex items-center gap-1">Easy</span>
                  </div>
                </div>
                <Button size="icon" className="rounded-full h-10 w-10">
                  <Play className="h-5 w-5 fill-current" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommendations */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg font-headline">Discover Recipes</h3>
            <Link href="/recipes" className="text-primary text-sm font-semibold">View All</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="min-w-[200px] border-none shadow-sm flex-shrink-0">
                <div className="relative h-32 w-full">
                  <Image 
                    src={recipeImg?.imageUrl || ""} 
                    alt="Recipe" 
                    fill 
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-3">
                  <h5 className="font-semibold text-sm line-clamp-1">Avocado Salmon Toast</h5>
                  <p className="text-[10px] text-muted-foreground mt-1">Under $5.00 • 15m</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}