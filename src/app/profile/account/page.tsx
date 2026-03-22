"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "Alex Miller",
    dob: "1992-05-15",
    gender: "male",
    dietGoal: "balanced",
    calorieTarget: "2200",
  });

  const handleSave = () => {
    localStorage.setItem("mealmate_profile", JSON.stringify(formData));
    localStorage.setItem("mealmate_goal", formData.dietGoal);
    router.back();
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Profile Management" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(val) => setFormData({...formData, gender: val})}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Goals & Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Dietary Goal</Label>
              <Select value={formData.dietGoal} onValueChange={(val) => setFormData({...formData, dietGoal: val})}>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced Diet</SelectItem>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="vegan">Plant-Based</SelectItem>
                  <SelectItem value="low-carb">Low Carb / Keto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Daily Calorie Target (kcal)</Label>
              <Input id="calories" type="number" value={formData.calorieTarget} onChange={(e) => setFormData({...formData, calorieTarget: e.target.value})} />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full h-12 rounded-2xl flex gap-2 font-bold" onClick={handleSave}>
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </main>
      <BottomNav />
    </div>
  );
}
