"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  Plus, 
  Youtube, 
  Instagram, 
  Facebook,
  ChevronRight,
  Bookmark,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Vegan"];
const collections = [
  { name: "High Protein", count: 12, color: "bg-orange-100 text-orange-700" },
  { name: "Under $10", count: 8, color: "bg-green-100 text-green-700" },
  { name: "No Cook", count: 5, color: "bg-blue-100 text-blue-700" },
];

export default function RecipesPage() {
  const [importUrl, setImportUrl] = React.useState("");
  
  const recipes = [
    { 
      id: 'recipe-1', 
      title: "Avocado Salmon Toast", 
      calories: 320, 
      time: "15m", 
      servings: 1, 
      difficulty: "Easy",
      cuisine: "Modern"
    },
    { 
      id: 'recipe-2', 
      title: "Summer Quinoa Salad", 
      calories: 450, 
      time: "25m", 
      servings: 2, 
      difficulty: "Medium",
      cuisine: "Mediterranean"
    },
    { 
      id: 'recipe-3', 
      title: "Herb Roasted Chicken", 
      calories: 580, 
      time: "45m", 
      servings: 4, 
      difficulty: "Hard",
      cuisine: "French"
    },
  ];

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Recipes" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* Search and Filter */}
        <section className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search saved recipes..." className="pl-9 h-10 border-none shadow-sm bg-white" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 border-none shadow-sm bg-white">
            <Filter className="h-4 w-4" />
          </Button>
        </section>

        {/* Quick Collections */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">My Collections</h3>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] font-bold text-primary uppercase">
              See All <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {collections.map((col) => (
              <Card key={col.name} className="border-none shadow-sm shrink-0 min-w-[120px]">
                <CardContent className="p-3 space-y-2">
                  <div className={`w-8 h-8 rounded-lg ${col.color} flex items-center justify-center`}>
                    <Bookmark className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate">{col.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{col.count} recipes</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="border-dashed border-2 h-auto py-6 shrink-0 min-w-[100px] flex flex-col gap-1 rounded-xl">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">New</span>
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {categories.map((cat) => (
              <Badge 
                key={cat} 
                variant={cat === "All" ? "default" : "outline"} 
                className="cursor-pointer px-4 py-1.5 border-none shadow-sm whitespace-nowrap"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Recipes</h3>
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Offline Ready
            </span>
          </div>
          
          {recipes.map((recipe, idx) => {
            const imgData = PlaceHolderImages.find(img => img.id === recipe.id);
            return (
              <Link href={`/recipes/${recipe.id}`} key={idx}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer group">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={imgData?.imageUrl || ""} 
                      alt={recipe.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={imgData?.imageHint}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-foreground hover:bg-white/90 backdrop-blur-sm border-none font-bold text-[10px] uppercase">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-destructive shadow-sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                       <Badge variant="secondary" className="bg-black/40 text-white border-none backdrop-blur-md text-[10px]">
                         {recipe.cuisine}
                       </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{recipe.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                        <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-400" /> {recipe.calories} kcal</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-blue-400" /> {recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase">
                        <Users className="h-3 w-3" /> {recipe.servings} Servings
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </section>

        {/* Floating Action Button for Import */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-24 right-6 h-14 w-14 rounded-2xl shadow-2xl z-40 group">
              <Plus className="h-6 w-6 transition-transform group-hover:rotate-90" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save New Recipe</DialogTitle>
              <DialogDescription>
                Import from social media or add manually.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="social">Import Link</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              <TabsContent value="social" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Input 
                    placeholder="Paste YouTube, IG, or FB link..." 
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground">AI will extract ingredients and steps from descriptions.</p>
                </div>
                <div className="flex justify-center gap-4 py-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <Youtube className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold">YouTube</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold">Instagram</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Facebook className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold">Facebook</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manual" className="pt-4 text-center py-8">
                <Plus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Standardized form for manual recipes.</p>
                <Button variant="outline" size="sm" className="mt-4">Start Form</Button>
              </TabsContent>
            </Tabs>
            <DialogFooter className="sm:justify-start">
              <Button type="button" className="w-full" onClick={() => setImportUrl("")}>
                {importUrl ? "Import Recipe" : "Select Method"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <BottomNav />
    </div>
  );
}
