"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";

export default function DietPreferencesPage() {
  const router = useRouter();
  const [dietType, setDietType] = React.useState("veg");
  const [allergies, setAllergies] = React.useState<string[]>([]);

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Diet Preferences" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Dietary Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={dietType} onValueChange={setDietType} className="grid gap-4">
              {[
                { id: "veg", label: "Vegetarian", desc: "No meat, fish or poultry" },
                { id: "non-veg", label: "Non-Vegetarian", desc: "Includes all food types" },
                { id: "vegan", label: "Vegan", desc: "Strictly plant-based" },
              ].map((item) => (
                <Label key={item.id} htmlFor={item.id} className="flex items-center justify-between p-4 border rounded-xl cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <div className="space-y-1">
                    <p className="font-bold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <RadioGroupItem value={item.id} id={item.id} />
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Allergies & Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {["Dairy", "Gluten", "Nuts", "Soy", "Shellfish", "Eggs"].map((item) => (
              <div key={item} className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                <Checkbox id={item} checked={allergies.includes(item)} onCheckedChange={() => toggleAllergy(item)} />
                <Label htmlFor={item} className="text-sm font-medium">{item}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full h-12 rounded-2xl font-bold flex gap-2" onClick={() => router.back()}>
          <Save className="h-4 w-4" /> Save Preferences
        </Button>
      </main>
      <BottomNav />
    </div>
  );
}
