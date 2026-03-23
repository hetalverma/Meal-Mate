"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Sun, Moon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSettingsPage() {
  const router = useRouter();
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("mealmate_theme") || "light";
    setTheme(savedTheme);
  }, []);

  const handleSave = () => {
    localStorage.setItem("mealmate_theme", theme);
    
    // Dispatch custom event to notify ThemeInitializer
    window.dispatchEvent(new Event("mealmate_theme_change"));
    
    // Apply class immediately for instant feedback
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    router.back();
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="App Theme" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="p-0 h-auto flex gap-2 text-muted-foreground hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md overflow-hidden bg-card/50">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-lg font-black">Appearance</CardTitle>
            <p className="text-xs text-muted-foreground">Customize your visual experience with our earthy palette.</p>
          </CardHeader>
          <CardContent className="p-4">
            <RadioGroup value={theme} onValueChange={setTheme} className="grid gap-4">
              {[
                { 
                  id: "light", 
                  label: "Light Mode", 
                  icon: Sun, 
                  desc: "Warm cream & terracotta",
                  previewClass: "bg-[#F5F2ED]" 
                },
                { 
                  id: "dark", 
                  label: "Dark Mode", 
                  icon: Moon, 
                  desc: "Deep espresso & gold",
                  previewClass: "bg-[#1A1510]" 
                },
              ].map((item) => (
                <Label 
                  key={item.id} 
                  htmlFor={item.id} 
                  className={cn(
                    "flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200",
                    theme === item.id 
                      ? "border-primary bg-primary/5 shadow-inner" 
                      : "border-muted/30 hover:border-muted"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center shadow-sm border border-muted/20",
                      item.previewClass
                    )}>
                      <item.icon className={cn(
                        "h-6 w-6",
                        item.id === "light" ? "text-orange-500" : "text-amber-200"
                      )} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value={item.id} id={item.id} className="sr-only" />
                    {theme === item.id && (
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Button 
          className="w-full h-14 rounded-2xl font-black flex gap-2 shadow-xl text-base" 
          onClick={handleSave}
        >
          <Save className="h-5 w-5" /> Apply Selection
        </Button>
      </main>
      <BottomNav />
    </div>
  );
}