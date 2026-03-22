"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Plus, 
  MoreVertical, 
  Calendar as CalendarIcon, 
  Loader2, 
  Clock, 
  Flame, 
  Beef, 
  Wheat,
  Copy,
  LayoutTemplate
} from "lucide-react";
import { aiMealPlanSuggestions, type AiMealPlanSuggestionsOutput } from "@/ai/flows/ai-meal-plan-suggestions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const DAYS = [
  { full: "Monday", short: "Mon", date: 24 },
  { full: "Tuesday", short: "Tue", date: 25 },
  { full: "Wednesday", short: "Wed", date: 26 },
  { full: "Thursday", short: "Thu", date: 27 },
  { full: "Friday", short: "Fri", date: 28 },
  { full: "Saturday", short: "Sat", date: 29 },
  { full: "Sunday", short: "Sun", date: 30 },
];

const TEMPLATES = [
  { name: "Lazy Sunday", color: "bg-blue-100 text-blue-700" },
  { name: "Gym Day", color: "bg-orange-100 text-orange-700" },
  { name: "Clean Eating", color: "bg-green-100 text-green-700" },
];

export default function PlannerPage() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [activeDay, setActiveDay] = React.useState("Mon");
  const [aiPlan, setAiPlan] = React.useState<AiMealPlanSuggestionsOutput | null>(null);

  const generateAIPlan = async () => {
    setLoading(true);
    try {
      const budget = localStorage.getItem("mealmate_budget") || "200";
      const goal = localStorage.getItem("mealmate_goal") || "balanced";
      
      const result = await aiMealPlanSuggestions({
        groceryBudget: parseInt(budget),
        dietGoals: [goal],
        cuisinePreferences: ["Mediterranean", "Healthy", "Quick"]
      });
      
      setAiPlan(result);
      toast({
        title: "Weekly Shuffle Complete!",
        description: `New 7-day plan generated for $${result.totalEstimatedCost}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to generate plan",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentDayData = aiPlan?.weeklyPlan.find(d => d.day.startsWith(activeDay));
  const currentDayMeals = currentDayData?.meals || [];
  
  const totalPrepTime = currentDayMeals.reduce((acc, m) => acc + (m.prepTimeMinutes || 0), 0);
  const totalCalories = currentDayMeals.reduce((acc, m) => acc + (m.calories || 0), 0);

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Planner" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* WEEK VIEW HEADER */}
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold font-headline">Week View</h2>
          </div>
          <Button 
            onClick={generateAIPlan} 
            disabled={loading}
            size="sm" 
            variant="outline"
            className="rounded-full shadow-sm flex gap-2 border-primary/20 text-primary hover:bg-primary/5"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Weekly Shuffle
          </Button>
        </section>

        {/* 7 DAY GRID - DATES & DAYS TOGETHER */}
        <section>
          <div className="flex justify-between gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {DAYS.map((day) => {
              const dayPlan = aiPlan?.weeklyPlan.find(d => d.day.startsWith(day.short));
              const mealCount = dayPlan?.meals.length || 0;
              const isActive = activeDay === day.short;
              
              return (
                <div key={day.short} className="flex flex-col items-center gap-2 min-w-[3.5rem]">
                  <Button
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "w-12 h-20 rounded-3xl flex flex-col items-center justify-center p-0 transition-all border-2",
                      isActive 
                        ? "bg-primary border-primary shadow-lg scale-105" 
                        : "border-muted/50 bg-card hover:border-primary/30"
                    )}
                    onClick={() => setActiveDay(day.short)}
                  >
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-tighter mb-1",
                      isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {day.short}
                    </span>
                    <span className={cn(
                      "text-lg font-black leading-none",
                      isActive ? "text-primary-foreground" : "text-foreground"
                    )}>
                      {day.date}
                    </span>
                  </Button>
                  {/* Meal count dot indicators */}
                  <div className="flex gap-1 h-1">
                    {mealCount > 0 ? (
                      [...Array(Math.min(mealCount, 4))].map((_, i) => (
                        <div key={i} className={cn(
                          "w-1 h-1 rounded-full",
                          isActive ? "bg-primary" : "bg-muted-foreground/30"
                        )} />
                      ))
                    ) : (
                      <div className="w-1 h-1 rounded-full bg-transparent" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DAY DETAIL SUMMARY */}
        {currentDayMeals.length > 0 && !loading && (
          <section className="grid grid-cols-2 gap-3">
            <Card className="border-none bg-muted/30 shadow-none">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Prep Time</p>
                  <p className="text-sm font-bold">{totalPrepTime} min</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/30 shadow-none">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-orange-500 shadow-sm">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Kcal</p>
                  <p className="text-sm font-bold">{totalCalories}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* MEAL SLOTS MANAGEMENT */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Day Detail</h3>
            <div className="flex gap-2">
               <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold uppercase text-primary p-0">
                 <Copy className="h-3 w-3 mr-1" /> Copy Day
               </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium animate-pulse">Crafting your perfect meal plan...</p>
            </div>
          ) : currentDayMeals.length > 0 ? (
            <div className="space-y-4">
              {currentDayMeals.map((meal, idx) => (
                <Card key={idx} className="border-none shadow-md overflow-hidden group hover:ring-2 ring-primary/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center justify-center bg-primary/5 w-16 h-16 rounded-2xl shrink-0 border border-primary/10">
                        <span className="text-[9px] font-black uppercase text-primary/60">{meal.mealType}</span>
                        <ChefIcon type={meal.mealType} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm truncate">{meal.recipeName}</h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mb-2">1 portion • {meal.briefDescription}</p>
                        
                        {/* PER-MEAL NUTRITION PREVIEW */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                            <Flame className="h-3 w-3 text-orange-400" /> {meal.calories}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                            <Beef className="h-3 w-3 text-red-400" /> {meal.protein}g
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                            <Wheat className="h-3 w-3 text-yellow-500" /> {meal.carbs}g
                          </div>
                          <Badge variant="outline" className="ml-auto text-[8px] h-4 py-0 px-1 border-muted text-muted-foreground">
                            ${meal.estimatedCost.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="w-full border-2 border-dashed border-muted hover:border-primary/30 text-muted-foreground h-14 rounded-2xl flex gap-2">
                <Plus className="h-4 w-4" /> Add custom meal
              </Button>
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-3xl border-muted bg-muted/10">
              <Sparkles className="h-10 w-10 text-muted mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">No meals planned for {activeDay}</p>
              <Button 
                variant="link" 
                className="text-primary mt-2 font-bold"
                onClick={generateAIPlan}
              >
                Generate with AI
              </Button>
            </div>
          )}
        </section>

        {/* TEMPLATES SECTION */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Templates</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {TEMPLATES.map((t) => (
              <Button 
                key={t.name}
                variant="secondary" 
                size="sm" 
                className={cn("rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap", t.color)}
              >
                {t.name}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </section>

        {aiPlan?.planExplanation && (
          <section className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> AI Insight
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "{aiPlan.planExplanation}"
            </p>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function ChefIcon({ type }: { type: string }) {
  const t = type.toLowerCase();
  if (t.includes('breakfast')) return <span className="text-lg">🍳</span>;
  if (t.includes('lunch')) return <span className="text-lg">🥗</span>;
  if (t.includes('dinner')) return <span className="text-lg">🍖</span>;
  if (t.includes('snack')) return <span className="text-lg">🍎</span>;
  return <span className="text-lg">🍽️</span>;
}
