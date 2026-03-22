"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, 
  Droplets, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ChefHat,
  ChevronRight,
  TrendingUp,
  History
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MEAL_SLOTS = [
  { id: "breakfast", label: "Breakfast", status: "done", time: "8:00 AM", meal: "Oatmeal with Berries" },
  { id: "snack1", label: "Snack", status: "done", time: "10:30 AM", meal: "Greek Yogurt" },
  { id: "lunch", label: "Lunch", status: "planned", time: "1:00 PM", meal: "Mediterranean Bowl" },
  { id: "dinner", label: "Dinner", status: "empty", time: "7:00 PM", meal: null },
  { id: "dessert", label: "Dessert", status: "empty", time: "9:00 PM", meal: null },
];

export default function HomePage() {
  const [waterCount, setWaterCount] = React.useState(4);
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-home');
  const avatarImg = PlaceHolderImages.find(img => img.id === 'avatar-user');

  const totalCalories = 1850;
  const calorieGoal = 2200;
  const calorieProgress = (totalCalories / calorieGoal) * 100;

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Home" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* Welcome Header */}
        <section className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-muted-foreground text-sm font-medium">Monday, Oct 24</p>
            <h2 className="text-2xl font-bold font-headline">Hi, Alex 👋</h2>
          </div>
          <Link href="/profile">
            <div className="relative h-12 w-12 rounded-full border-2 border-primary/20 overflow-hidden shadow-sm">
              <Image 
                src={avatarImg?.imageUrl || ""} 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
          </Link>
        </section>

        {/* TODAY'S OVERVIEW */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              Today's Overview <Badge variant="secondary" className="text-[10px] py-0">Core</Badge>
            </h3>
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              <Clock className="h-3 w-3" /> 45m total prep
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Nutrition & Calories Card */}
            <Card className="border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {/* Calorie Ring */}
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <svg className="h-full w-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted/20"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * calorieProgress) / 100}
                        strokeLinecap="round"
                        className="text-primary transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold">{totalCalories}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">kcal</span>
                    </div>
                  </div>

                  {/* Macros Bars */}
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span>Protein</span>
                        <span className="text-muted-foreground">85g / 120g</span>
                      </div>
                      <Progress value={70} className="h-1.5 bg-primary/10" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span>Carbs</span>
                        <span className="text-muted-foreground">150g / 250g</span>
                      </div>
                      <Progress value={60} className="h-1.5 bg-secondary/10" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span>Fats</span>
                        <span className="text-muted-foreground|">45g / 70g</span>
                      </div>
                      <Progress value={64} className="h-1.5 bg-accent/10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meal Summary List */}
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm font-bold">Meal Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <div className="divide-y">
                  {MEAL_SLOTS.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-3 group transition-colors hover:bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        {slot.status === 'done' ? (
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        ) : slot.status === 'planned' ? (
                          <div className="h-5 w-5 rounded-full border-2 border-primary/50 flex items-center justify-center shrink-0">
                            <Circle className="h-3 w-3 text-primary fill-primary" />
                          </div>
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/30 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{slot.label}</p>
                          <h4 className={cn(
                            "text-sm font-semibold truncate",
                            slot.status === 'empty' ? "text-muted-foreground/50 italic" : "text-foreground"
                          )}>
                            {slot.meal || "No meal added"}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground">{slot.time}</span>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI SUGGESTIONS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              Quick Suggestions <Badge variant="secondary" className="text-[10px] py-0 bg-green-100 text-green-700 hover:bg-green-100">Supporting</Badge>
            </h3>
            <Link href="/planner" className="text-primary text-[10px] font-bold uppercase flex items-center gap-1">
              Refresh <Sparkles className="h-3 w-3" />
            </Link>
          </div>
          
          <Card className="border-none shadow-sm bg-primary/5 border-l-4 border-l-primary">
            <CardContent className="p-4 flex gap-4">
              <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <ChefHat className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[8px] h-4 border-primary/20 text-primary">Bachelor Mode</Badge>
                  <span className="text-[10px] text-muted-foreground">3 ingredients • 15m</span>
                </div>
                <h4 className="text-sm font-bold">Honey Garlic Salmon Bites</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">Quick high-protein dinner based on your preferences.</p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary mt-1">
                  View Recipe <ChevronRight className="h-3 w-3 ml-0.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* WIDGETS & REMINDERS */}
        <section className="space-y-4 pb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            Widgets & Reminders <Badge variant="secondary" className="text-[10px] py-0 bg-blue-100 text-blue-700 hover:bg-blue-100">Supporting</Badge>
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Water Tracker */}
            <Card className="border-none shadow-sm overflow-hidden bg-blue-50/50">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2 text-blue-600">
                  <Droplets className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase">Water</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-blue-900">{waterCount * 0.25}L</p>
                <p className="text-[10px] text-blue-600/70 font-bold uppercase mt-1">{waterCount}/10 glasses</p>
                <div className="flex gap-1 mt-3">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i < waterCount ? "bg-blue-500" : "bg-blue-200"
                      )} 
                    />
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 h-8 bg-white/50 border-blue-200 text-blue-700"
                    onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
                  >
                    -
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 h-8 bg-white/50 border-blue-200 text-blue-700"
                    onClick={() => setWaterCount(Math.min(10, waterCount + 1))}
                  >
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leftover Logic / V2 Hint */}
            <Card className="border-none shadow-sm overflow-hidden bg-purple-50/50">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2 text-purple-600">
                  <History className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase">Leftovers</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm font-semibold text-purple-900">1 Prep Item</p>
                <p className="text-[10px] text-purple-600/70 mt-1">Chicken breast from Sunday available for Lunch.</p>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] font-bold text-purple-700 mt-4 uppercase">
                  Log use <ChevronRight className="h-3 w-3" />
                </Button>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="text-[8px] h-4 border-purple-200 text-purple-500">v2</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lock Screen Widget Hint */}
          <div className="bg-muted/50 rounded-xl p-3 flex items-center justify-between border-dashed border-2 border-muted">
             <div className="flex items-center gap-3">
               <div className="h-8 w-8 bg-background rounded-lg flex items-center justify-center text-muted-foreground shadow-inner">
                 <TrendingUp className="h-4 w-4" />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase">Integration</p>
                 <h5 className="text-xs font-semibold">Enable Lock Screen Widget</h5>
               </div>
             </div>
             <Switch className="scale-75" />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

// Simple Switch component implementation for the mock
function Switch({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
    </div>
  );
}
