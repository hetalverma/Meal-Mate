"use client";

import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets, Zap, Activity, Dumbbell } from "lucide-react";

export default function HealthPage() {
  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Health" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline">Today's Nutrition</h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Protein</span>
                  <span className="text-muted-foreground">65g / 80g</span>
                </div>
                <Progress value={81} className="h-2 bg-primary/10" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Carbs</span>
                  <span className="text-muted-foreground">120g / 200g</span>
                </div>
                <Progress value={60} className="h-2 bg-secondary/10" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Fats</span>
                  <span className="text-muted-foreground">42g / 65g</span>
                </div>
                <Progress value={64} className="h-2 bg-accent/10" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Droplets className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Water</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">1.2L</p>
              <p className="text-[10px] text-muted-foreground mt-1">Goal: 2.5L</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2 text-secondary">
                <Zap className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Energy</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">High</p>
              <p className="text-[10px] text-muted-foreground mt-1">Based on macros</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline">Activity</h2>
          <Card className="border-none shadow-sm p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Activity className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Step Count</h4>
              <p className="text-lg font-bold">8,432</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-accent">84%</span>
            </div>
          </Card>
          <Card className="border-none shadow-sm p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Dumbbell className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Workout</h4>
              <p className="text-lg font-bold">45 min</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-primary">Done</span>
            </div>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}