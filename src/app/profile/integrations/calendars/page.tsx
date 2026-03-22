"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/global-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Chrome, Apple, Sparkles } from "lucide-react";

export default function CalendarSyncPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pb-24 bg-background">
      <GlobalHeader title="Calendar Integrations" />
      
      <main className="p-4 space-y-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="p-0 h-auto flex gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Button>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Chrome className="h-5 w-5 text-blue-600" /> Google Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">Two-way Meal Sync</Label>
                <p className="text-xs text-muted-foreground">Meals appear as events on your calendar.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">Sync Ingredients</Label>
                <p className="text-xs text-muted-foreground">Include ingredients in event descriptions.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full font-bold">Configure Google Account</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Apple className="h-5 w-5" /> Apple Calendar + Siri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-bold">iCloud Sync</Label>
                <p className="text-xs text-muted-foreground">Sync plans with Apple Calendar.</p>
              </div>
              <Switch />
            </div>
            <div className="bg-muted/30 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase">Siri Shortcut</span>
              </div>
              <p className="text-xs italic text-muted-foreground leading-relaxed">
                "Hey Siri, what's for dinner tonight?"
              </p>
              <Button size="sm" className="w-full text-[10px] font-bold h-8 uppercase">Add to Siri</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}
