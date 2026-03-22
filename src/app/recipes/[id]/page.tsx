"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Flame, 
  ExternalLink, 
  CheckCircle2, 
  History,
  Sparkles,
  ChevronRight,
  Beef,
  Wheat,
  Droplets
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const MOCK_RECIPES: Record<string, any> = {
  "recipe-1": {
    title: "Avocado Salmon Toast",
    difficulty: "Easy",
    time: "15 min",
    calories: 320,
    protein: "18g",
    carbs: "22g",
    fats: "12g",
    servings: 1,
    source: "https://example.com/salmon-toast",
    ingredients: [
      { item: "Whole wheat bread", qty: "2 slices" },
      { item: "Smoked salmon", qty: "100g" },
      { item: "Ripe avocado", qty: "1/2" },
      { item: "Lemon juice", qty: "1 tsp" },
      { item: "Capers", qty: "1 tsp" },
    ],
    instructions: [
      "Toast the bread slices until golden brown.",
      "In a small bowl, mash the avocado with lemon juice and a pinch of salt.",
      "Spread avocado mash evenly over the toasted bread.",
      "Layer the smoked salmon on top of the avocado.",
      "Garnish with capers and fresh dill if desired."
    ],
    substitutions: [
      { original: "Smoked salmon", suggestion: "Tinned tuna or hard-boiled eggs" },
      { original: "Capers", suggestion: "Pickled onions" }
    ]
  },
  "recipe-2": {
    title: "Summer Quinoa Salad",
    difficulty: "Medium",
    time: "25 min",
    calories: 450,
    protein: "12g",
    carbs: "55g",
    fats: "15g",
    servings: 2,
    source: "https://example.com/quinoa-salad",
    ingredients: [
      { item: "Quinoa", qty: "1 cup" },
      { item: "Cucumber", qty: "1 large" },
      { item: "Cherry tomatoes", qty: "1 cup" },
      { item: "Feta cheese", qty: "50g" },
      { item: "Olive oil", qty: "2 tbsp" },
    ],
    instructions: [
      "Rinse and cook quinoa according to package instructions.",
      "Dice the cucumber and halve the cherry tomatoes.",
      "Once quinoa is cooled, mix with vegetables in a large bowl.",
      "Crumble feta cheese over the top.",
      "Drizzle with olive oil and toss gently."
    ],
    substitutions: [
      { original: "Feta cheese", suggestion: "Vegan almond feta or chickpeas" }
    ]
  }
};

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;
  const recipe = MOCK_RECIPES[recipeId] || MOCK_RECIPES["recipe-1"];
  const imgData = PlaceHolderImages.find(img => img.id === recipeId) || PlaceHolderImages.find(img => img.id === "recipe-1");

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Recipe Detail" />
      
      <main className="max-w-md mx-auto relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/90 shadow-md backdrop-blur-sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-72 w-full">
          <Image 
            src={imgData?.imageUrl || ""} 
            alt={recipe.title} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <Badge className="mb-2 bg-primary/80 border-none font-bold">
              {recipe.difficulty}
            </Badge>
            <h1 className="text-3xl font-black leading-tight font-headline">{recipe.title}</h1>
          </div>
        </div>

        <div className="p-4 -mt-6 bg-background rounded-t-3xl relative z-10 space-y-6">
          {/* Quick Stats */}
          <section className="grid grid-cols-3 gap-3">
            <div className="bg-muted/30 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Prep</span>
              <span className="text-sm font-bold">{recipe.time}</span>
            </div>
            <div className="bg-muted/30 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Kcal</span>
              <span className="text-sm font-bold">{recipe.calories}</span>
            </div>
            <div className="bg-muted/30 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Yield</span>
              <span className="text-sm font-bold">{recipe.servings} serving</span>
            </div>
          </section>

          {/* Nutrition Breakdown */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nutrition Per Serving</h3>
            <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border">
               <div className="text-center">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase">Protein</p>
                 <p className="font-bold flex items-center gap-1"><Beef className="h-3 w-3 text-red-400" /> {recipe.protein}</p>
               </div>
               <Separator orientation="vertical" className="h-8" />
               <div className="text-center">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase">Carbs</p>
                 <p className="font-bold flex items-center gap-1"><Wheat className="h-3 w-3 text-yellow-500" /> {recipe.carbs}</p>
               </div>
               <Separator orientation="vertical" className="h-8" />
               <div className="text-center">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase">Fats</p>
                 <p className="font-bold flex items-center gap-1"><Droplets className="h-3 w-3 text-blue-400" /> {recipe.fats}</p>
               </div>
            </div>
          </section>

          {/* Ingredients */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Ingredients</h3>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] font-bold text-primary uppercase">
                Add to List <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
            <Card className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {recipe.ingredients.map((ing: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-medium">{ing.item}</span>
                    <span className="text-sm font-bold text-primary">{ing.qty}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Substitution AI Insight */}
          <section className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Ingredient Substitutions
            </h4>
            <div className="space-y-2">
              {recipe.substitutions.map((sub: any, idx: number) => (
                <p key={idx} className="text-xs text-muted-foreground leading-relaxed">
                  No <strong>{sub.original}</strong>? Try <strong>{sub.suggestion}</strong> instead.
                </p>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Step-by-Step</h3>
            <div className="space-y-4">
              {recipe.instructions.map((step: string, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Source and Share */}
          <section className="pt-4 pb-8 space-y-4">
             <Button variant="outline" className="w-full h-12 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold" asChild>
               <a href={recipe.source} target="_blank" rel="noopener noreferrer">
                 <ExternalLink className="h-4 w-4" /> View Original Source
               </a>
             </Button>
             <div className="flex gap-4">
                <Button className="flex-1 rounded-2xl h-12 font-bold shadow-lg">Cook Now</Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-2">
                   <History className="h-4 w-4" />
                </Button>
             </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
