"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, MoreVertical, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { aiMealPlanSuggestions, type AiMealPlanSuggestionsOutput } from "@/ai/flows/ai-meal-plan-suggestions";
import { useToast } from "@/hooks/use-toast";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        title: "Meal Plan Generated!",
        description: `Total estimated cost: $${result.totalEstimatedCost}`,
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

  const currentDayMeals = aiPlan?.weeklyPlan.find(d => d.day.startsWith(activeDay))?.meals || [];

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Planner" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">This Week</h2>
          </div>
          <Button 
            onClick={generateAIPlan} 
            disabled={loading}
            size="sm" 
            className="rounded-full bg-secondary hover:bg-secondary/90 shadow-md flex gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            AI Suggest
          </Button>
        </section>

        <section>
          <div className="flex justify-between gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {DAYS.map((day) => (
              <Button
                key={day}
                variant={activeDay === day ? "default" : "outline"}
                className={activeDay === day ? "bg-primary" : ""}
                size="sm"
                onClick={() => setActiveDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Crafting your perfect meal plan...</p>
            </div>
          ) : currentDayMeals.length > 0 ? (
            <div className="space-y-4">
              {currentDayMeals.map((meal, idx) => (
                <Card key={idx} className="border-none shadow-sm overflow-hidden group">
                  <CardContent className="p-4 flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-muted w-16 h-16 rounded-lg text-[10px] font-bold uppercase text-muted-foreground shrink-0">
                      {meal.mealType}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm truncate">{meal.recipeName}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{meal.briefDescription}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[10px] py-0 px-1 bg-secondary/10 text-secondary border-none">
                          ${meal.estimatedCost.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="w-full border-2 border-dashed border-muted hover:border-primary/30 text-muted-foreground h-16 flex gap-2">
                <Plus className="h-4 w-4" /> Add custom meal
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-xl border-muted bg-muted/10">
              <Sparkles className="h-10 w-10 text-muted mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">No meals planned for {activeDay}</p>
              <Button 
                variant="link" 
                className="text-primary mt-2"
                onClick={generateAIPlan}
              >
                Let AI help you
              </Button>
            </div>
          )}
        </section>

        {aiPlan?.planExplanation && (
          <section className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Plan Summary
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{aiPlan.planExplanation}"
            </p>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}