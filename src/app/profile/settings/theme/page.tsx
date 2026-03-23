"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Sun, Moon } from "lucide-react";

export default function ThemeSettingsPage() {
  const router = useRouter();
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("mealmate_theme") || "light";
    setTheme(savedTheme);
  }, []);

  const handleSave = () => {
    localStorage.setItem("mealmate_theme", theme);
    // In a real app, this would trigger a theme provider update
    router.back();
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="App Theme" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground hover:bg-transparent">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
            <p className="text-xs text-muted-foreground">Choose how Meal Mate looks on your device.</p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme} className="grid gap-4">
              {[
                { id: "light", label: "Light Mode", icon: Sun, desc: "Classic bright appearance" },
                { id: "dark", label: "Dark Mode", icon: Moon, desc: "Easier on the eyes in the dark" },
              ].map((item) => (
                <Label 
                  key={item.id} 
                  htmlFor={item.id} 
                  className="flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <RadioGroupItem value={item.id} id={item.id} />
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Button className="w-full h-12 rounded-2xl font-bold flex gap-2 shadow-lg" onClick={handleSave}>
          <Save className="h-4 w-4" /> Save Theme
        </Button>
      </main>
      <BottomNav />
    </div>
  );
}
