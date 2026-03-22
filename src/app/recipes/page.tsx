"use client";

import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, Users, Flame, Heart } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Vegan"];

export default function RecipesPage() {
  const recipes = [
    { id: 'recipe-1', title: "Avocado Salmon Toast", calories: 320, time: "15m", servings: 1 },
    { id: 'recipe-2', title: "Summer Quinoa Salad", calories: 450, time: "25m", servings: 2 },
    { id: 'recipe-3', title: "Herb Roasted Chicken", calories: 580, time: "45m", servings: 4 },
  ];

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Recipes" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <section className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search recipes..." className="pl-9 h-10" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </section>

        <section>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {categories.map((cat) => (
              <Badge key={cat} variant={cat === "All" ? "default" : "outline"} className="cursor-pointer px-4 py-1">
                {cat}
              </Badge>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4">
          {recipes.map((recipe, idx) => {
            const imgData = PlaceHolderImages.find(img => img.id === recipe.id);
            return (
              <Card key={idx} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative h-44 w-full">
                  <Image 
                    src={imgData?.imageUrl || ""} 
                    alt={recipe.title} 
                    fill 
                    className="object-cover"
                    data-ai-hint={imgData?.imageHint}
                  />
                  <div className="absolute top-3 right-3">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-destructive">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-bold text-lg leading-tight">{recipe.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> {recipe.calories} kcal</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {recipe.servings} Servings</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}