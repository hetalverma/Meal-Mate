"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, ChevronLeft, Target, Wallet } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [goal, setGoal] = React.useState("balanced");
  const [budget, setBudget] = React.useState("200");

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
    else {
      // Save preferences (mock) and redirect
      localStorage.setItem("mealmate_onboarded", "true");
      localStorage.setItem("mealmate_goal", goal);
      localStorage.setItem("mealmate_budget", budget);
      router.push("/home");
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold font-headline text-primary">Welcome to Meal Mate</h1>
          <Progress value={step === 1 ? 50 : 100} className="h-1" />
        </div>

        {step === 1 ? (
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>What's your diet goal?</CardTitle>
              <CardDescription>We'll personalize your recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={goal} onValueChange={setGoal} className="grid gap-4">
                {[
                  { id: "balanced", label: "Balanced Diet", desc: "A bit of everything in moderation" },
                  { id: "weight-loss", label: "Weight Loss", desc: "Lower calorie, high protein options" },
                  { id: "vegan", label: "Plant-Based", desc: "100% vegan recipes and snacks" },
                  { id: "low-carb", label: "Low Carb / Keto", desc: "Focus on fats and proteins" }
                ].map((item) => (
                  <Label
                    key={item.id}
                    htmlFor={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <RadioGroupItem value={item.id} id={item.id} />
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={nextStep}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <Wallet className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Set your weekly budget</CardTitle>
              <CardDescription>Tell us your grocery spending limit in USD.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Weekly Budget ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="pl-7"
                    placeholder="200"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                This helps us suggest affordable recipes that stay within your means.
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button className="flex-1" onClick={nextStep}>
                Finish Setup
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}