"use client";

import * as React from "react";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  ChevronRight,
  Bookmark,
  Zap,
  Loader2,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { aiRecipeExtractor } from "@/ai/flows/ai-recipe-extractor";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Vegan"];
const collections = [
  { name: "High Protein", count: 12, color: "bg-orange-100 text-orange-700" },
  { name: "Under $10", count: 8, color: "bg-green-100 text-green-700" },
  { name: "No Cook", count: 5, color: "bg-blue-100 text-blue-700" },
];

export default function RecipesPage() {
  const { toast } = useToast();
  const [importUrl, setImportUrl] = React.useState("");
  const [isExtracting, setIsExtracting] = React.useState(false);
  
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

  const handleImportRecipe = async () => {
    if (!importUrl) return;
    
    setIsExtracting(true);
    try {
      const extractedRecipe = await aiRecipeExtractor({ url: importUrl });
      
      const savedRecipes = JSON.parse(localStorage.getItem('mealmate_imported_recipes') || '[]');
      const newId = `imported-${Date.now()}`;
      localStorage.setItem('mealmate_imported_recipes', JSON.stringify([...savedRecipes, { ...extractedRecipe, id: newId }]));

      toast({
        title: "Recipe Imported!",
        description: `Successfully extracted "${extractedRecipe.title}"`,
      });
      
      setImportUrl("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Extraction Failed",
        description: "Could not parse the recipe. Ensure the link is valid.",
      });
    } finally {
      setIsExtracting(false);
    }
  };

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

        {/* AI Magic Import Section */}
        <section>
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-secondary/5 border-l-4 border-l-primary overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Recipe Import
              </CardTitle>
              <CardDescription className="text-[11px]">
                Paste a social media video link to extract the recipe instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Paste YouTube, IG, or FB link..." 
                    className="pl-9 h-10 bg-white/80 border-primary/10 focus-visible:ring-primary/20"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    disabled={isExtracting}
                  />
                </div>
                <Button 
                  onClick={handleImportRecipe}
                  disabled={!importUrl || isExtracting}
                  className="h-10 px-4 font-bold shadow-sm"
                >
                  {isExtracting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Import"
                  )}
                </Button>
              </div>
              {isExtracting && (
                <p className="text-[10px] text-primary font-medium animate-pulse flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  AI is watching and extracting details...
                </p>
              )}
            </CardContent>
          </Card>
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
      </main>

      <BottomNav />
    </div>
  );
}
